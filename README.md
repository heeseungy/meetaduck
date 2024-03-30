![header](https://capsule-render.vercel.app/api?type=waving&color=gradient&height=180&section=header&text=MeetADuck!&fontSize=32&animation=fadeIn&fontAlignY=36&fontColor=000000)

<h2 align="center">
새로운 사람들과 친해지는 가장 좋은 방법
</h2>
<br>
<p align="center">
<!-- <a href="https://ssafy.coffee">Visit Our Site</a> -->
</p>

### 개발 기간

| 2024.02.19 ~ 2024.04.05 (7주) |
| ----------------------- |

### 개요

Meet A Duck ! 은 새로운 만남 속에서 새로운 사람들과 친밀감을 형성하는 단계에서 활용도가 높으며,
편안한 분위기 속에서 **AI**를 통해 **언어의 온도**를 측정하고, 나의 채팅 내역을 **Hadoop** 으로 처리하여 **나의 언어 습관** 을 측정 할 수 있는 프로젝트입니다.

### 팀 소개

**"😇 새로운 만남이 어색한 당신을 위한 마니또 서비스"**

| 팀원    | 역할      |
| ------- | --------- |
| 👼전원빈 | 팀장, BE  |
| 👶강지수 | FE        |
| 😁김현영 | BE        |
| 👩안준선 | FE        |
| 😄양희승 | BE        |
| 👦최지웅 | BE        |

## 🔨 기술 스택 🔨

**Backend**

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring](https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring%20boot&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

**Frontend**

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![UnoCSS](https://img.shields.io/badge/unocss-333333.svg?style=for-the-badge&logo=unocss&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

**Database**

![MySQL](https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![PlanetScale](https://img.shields.io/badge/planetscale-%23000000.svg?style=for-the-badge&logo=planetscale&logoColor=white)


**Deploy**

![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white)


**Collaboration**

![GitLab](https://img.shields.io/badge/gitlab-%23181717.svg?style=for-the-badge&logo=gitlab&logoColor=white)
![Jira](https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)

---

## 파일 구조

<details>
<summary>
<b>Frontend</b>
</summary>

```log
frontend 패키지 구조 (향후 추가)
```
</details>

<br>

<details>
<summary>
<b>Backend</b>
</summary>
```ini
back
 ┣ gradle
 ┃ ┗ wrapper
 ┃ ┃ ┣ gradle-wrapper.jar
 ┃ ┃ ┗ gradle-wrapper.properties
 ┣ src
 ┃ ┗ main
 ┃ ┃ ┣ java
 ┃ ┃ ┃ ┗ com
 ┃ ┃ ┃ ┃ ┗ ssafy
 ┃ ┃ ┃ ┃ ┃ ┗ duck
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ common
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ BaseTimeEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ TimeUtil.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ CorsMvcConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ RabbitConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ RabbitProperties.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ SchedulerConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ SecurityConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ StompConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ domain
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ chat
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ChatController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ RabbitStompController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ MessageReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ChatRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ MessageRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ Chat.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ Message.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Topic.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ChatErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ChatException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ChatRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MessageRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ TopicRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ChatService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ guest
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ GuestController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ GuestReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ VoteReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ GuestRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ PairRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ VoteRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Guest.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ GuestErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ GuestException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ GuestRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ GuestService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ hint
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ HintController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ HintReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ HintStatusReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ HintRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ HintStatusRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ Hint.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ HintStatus.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ HintErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ HintException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ HintRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ HintStatusRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ HintService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ mission
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ MissionController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MissionImageUpdateReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MissionPassReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ MissionSuccessReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MissionRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ MyManitoMissionRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ Mission.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ MissionStatus.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MissionErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ MissionException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MissionRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ MissionStatusRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ MissionService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ party
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ PartyController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ CreateReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ DeleteReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ StartReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ CreateRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ PartyRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Party.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ PartyErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ PartyException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ PartyRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ PartyService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ result
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ResultController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ model
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ Favorability.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ FavorabilityProjection.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ResultReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ MissionResultRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ResultRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ResultWithManitiRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ResultWithManitoRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ Result.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ ResultErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ResultException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ResultRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ ResultService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ model
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ KakaoUserInfo.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ OAuthToken.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ request
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserSignUpReq.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ response
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserRes.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ User.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ UserErrorCode.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ UserService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ GlobalExceptionHandler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ CustomJwtAuthenticationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ JwtProperties.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ scheduler
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ TaskSchedulerService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ DuckApplication.java
 ┃ ┃ ┗ resources
 ┣ .gitignore
 ┣ build.gradle
 ┣ Dockerfile
 ┣ gradlew
 ┣ gradlew.bat
 ┣ Jenkinsfile
 ┣ keystore.p12
 ┣ localhost.p12
 ┗ settings.gradle
```
</details>

## 시스템 아키텍처

![시스템아키텍처](/uploads/cc1443628232deb6f709993f73930e49/System_Architecture.png)

## 화면 정의서

### 1. WireFrame

![화면정의서 와이어프레임]()

### 2. Prototype

![화면정의서 프로토타입]()

### 3.1. Deploy User

![화면정의서 정식 사용자]()

### 3.2. Deploy Cafe

![화면정의서 정식 카페]()

## ERD

![ERD](/uploads/9a2ecd9e6644bdb2e818e294020073a9/ERD.png)

## 서비스 소개 (주요 기능)

### 1. 사용자

- 파티 생성
  - 소셜 로그인(Kakao)
  - 파티 생성
  - 생성을 위한 정보 입력
- 미션
   - 미션 수행
   - 미션 인증
- 채팅
    - 실시간 그룹채팅
    - 실시간 익명 마니또와 채팅
    - 실시간 마니띠와 채팅
- 힌트
    - 힌트 작성
    - 힌트 조회
- 분석결과

---

- 메인 화면
  ![메인화면]()

- 파티

  ![파티 생성]()

- 파티
  ![]()

### 2. 화면 사진 넣을 곳

- 2-1. 

  ![]()