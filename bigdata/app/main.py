from typing import Optional, List
import re
import json
import pandas as pd

from fastapi import FastAPI, HTTPException 

# mysql
import pymysql 

# Py Spark
from pyspark.sql import SparkSession
from pyspark.sql.functions import *  

# kiwi
from kiwipiepy import Kiwi, Match, Token 

# okt from konlpy
from konlpy.tag import Okt 

# model
import test

app = FastAPI()
kiwi = Kiwi(num_workers=0, model_path=None, load_default_dict=True, integrate_allomorph=True, model_type='sbg', typos=None, typo_cost_threshold=2.5)
okt=Okt() 

# Spark Session
spark = SparkSession.builder \
        .appName("WordCount") \
        .config("spark.mongodb.input.uri", "mongodb+srv://S10P22C108:1znS65MER5@ssafy.ngivl.mongodb.net/S10P22C108.messages") \
        .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1") \
        .getOrCreate()

# 데이터베이스 연결 설정
def get_db_connection():
    # return pymysql.connect(
    #     host="stg-yswa-kr-practice-db-master.mariadb.database.azure.com",
    #     port=3306,
    #     user="S10P21C108@stg-yswa-kr-practice-db-master.mariadb.database.azure.com",
    #     password="XGzFAZq8e7",
    #     db="s10p21c108",
    #     cursorclass=pymysql.cursors.DictCursor
    # ) 
    return pymysql.connect(
        host="stg-yswa-kr-practice-db-master.mariadb.database.azure.com",
        port=3306,
        user="S10P22C108@stg-yswa-kr-practice-db-master.mariadb.database.azure.com",
        password="iF6wrgXGd6",
        db="s10p22c108",
        cursorclass=pymysql.cursors.DictCursor
    ) 

def get_guest_info(guest_id : int, isMe : bool) :
    connection = get_db_connection()
    try: 
        with connection.cursor() as cursor: 
            if isMe:
                sql = "select * from guests where guest_id = %s "
            else :
                sql = "select * from guests where maniti_id = %s "
            cursor.execute(sql, (int(guest_id)))
            info = cursor.fetchall() # 조회 결과 가져오기 
    finally:
        if connection:
            connection.close()
    return info[0]


def update_result_wordcount(json_data, favorability, ratio, guest_id : int, isManito:bool) :
    connection = get_db_connection()
    try: 
        with connection.cursor() as cursor:
            if isManito: # 내가 마니또일 때
                sql = "INSERT INTO results (guest_id, maniti_wordcount, maniti_favorability, maniti_ratio) VALUES (%s, %s, %s, %s)"
                cursor.execute(sql, (int(guest_id), json_data, favorability, ratio) )
            else : # 내가 마니띠일 때
                sql = "UPDATE results SET manito_wordcount = %s, manito_favorability = %s, manito_ratio = %s WHERE guest_id = %s"
                cursor.execute(sql, (json_data, favorability, ratio, int(guest_id)) )
            connection.commit()
    finally:
        if connection:
            connection.close()


def word_count(sender_id, chat_id) :
    df = spark.read.format("mongo").load()
    message = (
        df.filter((col("sender_id") == sender_id) & (col("chat_id") == chat_id) & (col("message_type") == False)) 
          .select(col("content"))  
          .rdd.map(lambda row: row["content"])
          .collect() 
    )   

    token_words = []
    for content in message :
      # 메세지 내 문장 나누기
      split_content = kiwi.split_into_sents(content)
      for sc in split_content:  
          new_text = re.sub(r'[^\w\s]', '', sc.text)  # 특수문자 처리
          new_text = okt.morphs(new_text) # okt 분석

          # 불용어 처리
          with open("stopwords.txt", "r", encoding="utf-8") as f:
              stop_words = [word.strip() for word in f.readlines()]
          
          token_words.extend([word for word in new_text if word not in stop_words]) 
        
    # word count
    word_counts = spark.sparkContext.parallelize(token_words) \
                      .map(lambda word: (word, 1))  \
                      .reduceByKey(lambda a, b: a + b) \
                      .map(lambda x: {"word": x[0], "count": x[1]}) \
                      .sortBy(lambda x: (-x["count"], x["word"])) \
                      .collect()
    # JSON 형태로 변환
    json_data = json.dumps(word_counts[:15], ensure_ascii=False)
    return json_data


def get_message( chat_id):    
    df = spark.read.format("mongo").load()
    print("get message ",  chat_id)

    # 채팅 메세지 가져오기
    origincontent = (df.filter((col("chat_id") == chat_id) & (col("message_type") == False))
                    .select("message_type", "content", "created_time", "sender_id", "chat_id")
                    .collect() )
    if not origincontent:
        return 0
  
    # JSON 리스트로 변환
    message_list = []
    for message in origincontent:
        message_dict = {
            "message_type": message["message_type"],
            "content": message["content"],
            "created_time": message["created_time"],
            "sender_id": message["sender_id"],
            "chat_id": message["chat_id"]
        }
        message_list.append(message_dict)  
    # print("message list ", message_list)
  
    return message_list


@app.post("/spark/{guest_id}")
async def word_count_spark(guest_id: int):   
    df = spark.read.format("mongo").load()
    print("guest id " , guest_id)
    # 내가 마니또일 때 저장 
    try:
        my_info = get_guest_info(guest_id, True)    # 내 정보 가져오기
    except Exception as e:
        print("Error occurred while getting guest info:", e)
        raise HTTPException(status_code=404, detail="참가자의 정보가 없습니다.")
    print("1차 정보가져오기")

    time_block, me_manito_ratio = test.calc_favorability(guest_id, get_message(my_info["chat_id"]))
    if me_manito_ratio == -1 :
        me_manito_favorability = 0
    else :
        me_manito_favorability = test.make_preprocessed_data(time_block) 
    if pd.isna(me_manito_favorability):
        me_manito_favorability = 0
    print("1차 모델")

    me_manito_wordcount = word_count(guest_id,my_info["chat_id"] )
    print("1차 word count")
    update_result_wordcount(me_manito_wordcount, me_manito_favorability, me_manito_ratio, guest_id, True)
    print("1차 마니또 끝")



    # 내가 마니띠일 때 저장 
    try:
        manito_info = get_guest_info(guest_id, False)    # 마니또 정보 가져오기
    except Exception as e:
        print("Error occurred while getting manito info:", e)
        raise HTTPException(status_code=404, detail="참가자의 마니또 정보가 없습니다.")
    
    print("2차 정보가져오기")
    time_block, me_maniti_ratio = test.calc_favorability(guest_id, get_message(manito_info["chat_id"]))
    if me_maniti_ratio == -1 :
        me_maniti_favorability = 0      
    else :
        me_maniti_favorability = test.make_preprocessed_data(time_block) 
 
    if pd.isna(me_maniti_favorability):
        me_maniti_favorability = 0
    print("2차 모델")
 

    me_maniti_wordcount = word_count(guest_id,manito_info["chat_id"] )
    print("2차 word count")
    update_result_wordcount(me_maniti_wordcount, me_maniti_favorability, me_maniti_ratio, guest_id, False)

    return {"success wordcount"}