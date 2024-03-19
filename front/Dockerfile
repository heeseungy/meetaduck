# 기존 멀티 스테이지 빌드의 builder 단계 제거 (필요에 따라)
FROM node:lts-alpine

WORKDIR /front

# package.json과 package-lock.json을 먼저 복사
COPY package.json .
COPY package-lock.json .


# 프로젝트 의존성 설치
RUN rm -rf node_modules
RUN npm install

# 프로젝트 소스 복사
COPY . .

EXPOSE 3000/tcp

# 애플리케이션 실행
CMD ["npm", "run", "dev"]