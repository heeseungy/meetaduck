import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
from fng.score import scoreStock, FearGreed
import numpy as np
import matplotlib.pyplot as plt
import datetime as dt
import re 

## sentiment analysis
koelectra_finetuned_model_dir = os.path.join('koelectra-base-finetuned-sentiment-analysis.bin')
tokenizer = AutoTokenizer.from_pretrained("monologg/koelectra-base-v3-discriminator")
model = AutoModelForSequenceClassification.from_pretrained("monologg/koelectra-base-v3-discriminator", num_labels=3)
model.load_state_dict(torch.load(koelectra_finetuned_model_dir, map_location=torch.device('cpu')))
sentiment_classifier = pipeline('sentiment-analysis', tokenizer=tokenizer, model=model)

#상수
STANDARD_POINT = 50
STANDARD_PERIOD =120

#점수 계산 함수
def predict_sentiment(content, point, isMe): 
    pred = sentiment_classifier(content)
    positive = neutral = 0
    label = pred[0]["label"]
    # 긍정이면 +1, 부정이면 -1
    if label == 'LABEL_1':
        point -= 100
    elif label == 'LABEL_2':
        point += 100
        if(isMe) : positive =1
    else :
        point += 100
        if(isMe) : neutral =1
    
    if(isMe) : total_count+=1
    if (point < 0) : point = 50
    return point, positive, neutral


def make_dt(time_str):
    # 정규 표현식을 사용하여 마이크로초를 추출
    microseconds_match = re.search(r'\.\d+', time_str)
    microseconds_str = microseconds_match.group()[1:]  # '.'을 제외한 숫자 부분만 가져옴

    # 마이크로초의 길이가 6자리 이상이면 초당 증가하는 마이크로초가 아니므로 뒤에 0을 추가하여 6자리로 만듭니다.
    if len(microseconds_str) > 6:
        microseconds_str = microseconds_str[:6]

    # 마이크로초를 int 형으로 변환
    microseconds = int(microseconds_str)

    # 마이크로초를 제외한 시간 문자열 생성
    time_str_without_microseconds = re.sub(r'\.\d+', '', time_str)

    # 시간 문자열을 datetime 객체로 변환
    time = dt.datetime.strptime(time_str_without_microseconds, "%Y-%m-%dT%H:%M:%SZ")

    # datetime 객체에 마이크로초 추가 (범위 내로 조정)
    time = time.replace(microsecond=min(microseconds, 999999))
    return time


#시간과 점수를 함께 다루기 위한 객체
class TimeAndPoint:
    def __init__(self, time, point):
        self.time = time
        self.point = point
      
####나중에 index 2차원배열 만들어서 관리####


def calc_favorability(guest_id, chat_list): 
    #print("chat_list ", chat_list)
    if chat_list == [] :
        return [0, -1]
    
    #시작포인트, 시간 초기화
    positive_total = 0
    neutral_total = 0                
    point = STANDARD_POINT

    #객체를 삽입할 배열
    time_block=[]
  
    for chat_message in chat_list: 
        # 시간 범위
        compare_time = make_dt(chat_message['created_time'])
        point, positive, neutral = predict_sentiment(chat_message['content'], point, chat_message['sender_id'] ==guest_id)        
        positive_total += positive
        neutral_total += neutral

        # 한시간이상 차이 나면 다른 뭉치로 분류
        one_time = TimeAndPoint(compare_time, point)

        if (compare_time - time).total_seconds() > 3600:
            time_block.append([one_time])
        else:
            time_block[len(time_block)-1].append(one_time)
        time=compare_time

    for block in time_block:
        if len(block) == 1 : 
            time_block.remove(block)

    ratio = positive_total/(len(chat_list) - neutral_total) *100 
    print("ratio ", ratio , " point ", point )
    

    if len(time_block[len(time_block)-1]) == 1:
        time_block.pop()    

    #총시간, 회화당 시간 계산
    total_time = 0 

    for oneblock in time_block:
        time_delta =(oneblock[len(oneblock)-1].time- oneblock[0].time).total_seconds()
        total_time += time_delta

    #기준시간 간격
    period = total_time/STANDARD_PERIOD
    #처리가 끝난 2차 행렬
    preprocessed_data = [[]] 

    for oneblock in time_block:
        number_of_period = 0

        for chat  in oneblock:

            while(True):
                startTime = oneblock[0].time + dt.timedelta(seconds=(period * number_of_period))
                endTime = startTime + dt.timedelta(0,period)

                if chat.time >= startTime and  chat.time < endTime:
                    preprocessed_data[-1].append(chat.point)
                    break

                else:
                    preprocessed_data.append([])
                    number_of_period += 1

        preprocessed_data.append([]) 
    
    if(len(preprocessed_data[-1]) == 0):
        preprocessed_data.pop()


    #함수에 넣을 p(기간 내 마지막 point), h(기간 내 가장 높은 point), l(기간 내 가장 적은 point), v(기간 내 회화 빈도)
    p = []
    h = []
    l = []
    v = []

    #종가를 정하기 위한 변수       
    last = preprocessed_data[0][0]

    for interval in preprocessed_data:
        if len(interval)==0 : 
            p.append(last)
        else :  
            p.append(interval[-1])
        h.append(min(interval or last))
        l.append(max(interval or last))
        v.append(len(interval))
        last = p[-1]

    dur= len(p)

    p=np.array([p])
    h=np.array([h])
    l=np.array([l])
    v=np.array([v]) 
    # print(p)
    # print(h)
    # print(l)
    # print(v)
    score = scoreStock(p,h,l,v)
    score_fng = FearGreed(score).compute_stock(duration=(dur-2)) 

    if(p[0][-1] > STANDARD_POINT*2 and score_fng < 50) : score_fng = 100 - score_fng
    elif(p[0][-1] < STANDARD_POINT*2 and score_fng > 50) : score_fng = 100 - score_fng
    print("score_fng ", score_fng[0][0])

    return [score_fng[0][0]*0.3, ratio]
