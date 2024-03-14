FROM openjdk:17.0.2-oracle
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} ./app.jar
EXPOSE 8080
ENV TZ=Asia/Seoul
ENTRYPOINT ["java","-jar","./app.jar"]

FROM jenkins/jenkins:lts-jdk17
USER root
# 사용자 추가 및 그룹 생성
RUN groupadd -r myuser && useradd -r -g myuser myuser
# 복사할 디렉토리 권한 설정
RUN mkdir -p /var/jenkins_home/workspace/back/src/main/resources && \
    chown -R myuser:myuser /var/jenkins_home/workspace/back/src/main/resources
USER jenkins