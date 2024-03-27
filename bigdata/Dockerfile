FROM python:latest

# apt init
ENV LANG=C.UTF-8
ENV TZ=Asia/Seoul
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && \
    apt-get upgrade && \
    apt-get install -y --no-install-recommends tzdata g++ git curl

RUN apt install sudo
RUN wget http://www.mirbsd.org/~tg/Debs/sources.txt/wtf-bookworm.sources && \
    sudo mkdir -p /etc/apt/sources.list.d && \
    sudo mv wtf-bookworm.sources /etc/apt/sources.list.d/ && \
    sudo apt update
RUN sudo apt remove --purge openjdk-8-jdk
RUN sudo apt autoremove
RUN sudo apt install --reinstall openjdk-8-jdk

# workspace
WORKDIR /app/
COPY ./app /app 

SHELL ["/bin/bash", "-c"]

RUN pip install -r requirements.txt
 

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
ENV SPARK_HOME=/opt/spark
ENV PATH=$PATH:$SPARK_HOME/bin:$SPARK_HOME/sbin