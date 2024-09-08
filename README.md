# <img src="https://github.com/user-attachments/assets/0cf960c8-329c-420d-adf1-2c9eb8d5c08a" width="45" height="35" align='center' /> 나만의 취향을 담은 플레이리스트 영상 공유 웹앱 서비스

## <image alt="bomvi" width="800" src="https://github.com/user-attachments/assets/4f34da2b-99d0-4dd0-b9e3-e8750256c44f" style="border-radius: 20px" />

봄비(Bomvi)는 나만의 플레이리스트를 꾸미고 공유하는 모바일 SNS 웹앱 서비스를 제공합니다.

이 서비스는, 플레이리스트 추천 및 탐색, 구독 플레이리스트 타임라인, 나만의 마이페이지, 미니 영상 플레이어를 경험할 수 있습니다.

<br/>

## 팀명: 2번 🍕는 제꺼조

### 프로젝트 팀 소개 및 역할분담

| [<img src="https://avatars.githubusercontent.com/u/93127663?v=4" width="150" height="150"/>](https://github.com/red-dev-Mark) | [<img src="https://avatars.githubusercontent.com/u/170381378?v=4" width="150" height="150"/>](https://github.com/miniseung) | [<img src="https://avatars.githubusercontent.com/u/86473590?v=4" width="150" height="150"/>](https://github.com/unanbb) | [<img src="https://avatars.githubusercontent.com/u/170402797?v=4" width="150" height="150"/>](https://github.com/dyeongg) | [<img src="https://avatars.githubusercontent.com/u/27764950?s=400&u=07e0fe49d204a77b0814e7f126cda53b6fc97fd1&v=4" width="150" height="150"/>](https://github.com/clara-shin) |
| :---------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                            권혁준                                                             |                                                           김승민                                                            |                                                         이윤환                                                          |                                                          임효정                                                           |                                                                                    신혜진                                                                                    |
|                                       [@red-dev-Mark](https://github.com/red-dev-Mark)                                        |                                         [@miniseung](https://github.com/miniseung)                                          |                                          [@unanbb](https://github.com/unanbb)                                           |                                          [@dyeongg](https://github.com/dyeongg)                                           |                                                                 [@clara-shin](https://github.com/clara-shin)                                                                 |
|                         홈페이지<br/>검색페이지<br/>구독페이지<br/>동영상 업로드<br/>좋아요/구독 기능                         |                                    공통컴포넌트<br/>로그인페이지<br/>플리메인페이지 구현                                    |                     댓글 목록 페이지<br/>댓글 삭제<br/>구독목록 페이지 퍼블리싱<br/>데이터 불러오기                     |                 홈페이지 퍼블리싱<br/>댓글 작성<br/>무한스크롤<br/>playwright 테스트코드<br/>공통컴포넌트                 |                                    미니영상플레이어<br/>플리메인페이지<br/>마이페이지<br/>플리생성, 라우터<br/>레이아웃<br/>공통컴포넌트                                     |

<br/><br/>

## 프로젝트 목표

- 겁먹지 않고 새로운 기술을 도입해보기
- 토이2에서 사용했던 상태관리 툴과 비교해서 Zustand와 TanStack Query를 경험해보기
- 조금 더 타입스크립트에 익숙해지기
- 사용자들이 서로 인터랙션하는 데이터 흐름을 구현해보기
  <br/>

## 프로젝트 소개

프로젝트 주제:

- 나만의 플레이리스트를 꾸미고 공유하는, 영상공유 SNS 모바일 웹 서비스 개발
  <br/>
  서비스가 추구하는 핵심가치:

- 영상/음악 시청과 탐색을 동시에 할 수 있는 멀티 서비스 제공
- 나만의 개성이 드러나는 개인 공간을 꾸미기 기능
- 익숙하고 눈이 편안한 디자인 및 이해하기 쉬운 UI/UX
  <br/>
  서비스의 이용 대상:

- 타겟: 영상공유 플랫폼에 익숙한 2-30대
- 사용 규모: 50명
- 서비스 필요한 이유:
  - 항상 모바일을 손에서 놓지 않는 2-30대는 창의적이고 트렌드에 민감하며 새로운 콘텐츠를 발굴하고 공유하는 것을 즐긴다
  - 나와 취향이 비슷한 플레이리스트만 탐색하고 구독하고 싶다
- 페르소나<br/>
  ![DALL·E 2024-09-09 01 22 02 - A creative young woman in her 20s, who is a graduate student studying video content in Seoul  She is trendy, always holding her phone in hand, and enj](https://github.com/user-attachments/assets/aa5b10bb-a2df-4d27-b65c-33cabe19060c)

  - 김지우 / 20대 / 여성 / 영상콘텐츠학과 대학원생 / 서울 / 창의적 / 트렌드에 민감함
  - 취미: 새로운 콘텐츠 공유하기 / 항상 어딜가나 휴대폰을 손에 들고 있다

<br/>

### 기획 및 디자인 설계

- 기획(피그잼): 예시 디자인 시안 확인하며 기능명세서, 데이터베이스 설계 및 컴포넌트 정의서 설계
- 디자인, 와이어프레임 (피그마)
- 재능기부: 봄비 로고제작 @서윤님

<br/>

### 프로젝트 기간

- 8월 19일(월) ~ 9월 9일(월) (약 3주)

- 1주차: 기획 및 설계/디자인(7일 소요), 개발환경 세팅

- 2주차: 개발 집중기간, 컴포넌트 및 페이지 개발, 서버 연동

- 3주차: 개발 집중기간, 테스트 및 수정

<br/>

---

### 개발환경

<div align=center>
  
#### 🧑‍💻 Frontend 🧑‍💻
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)<br/>
React, TypeScript, Emotion을 사용하여 컴포넌트 기반의 UI를 효율적으로 개발하고,<br/> 정적 타입 체크로 코드 안정성을 높이며, CSS-in-JS로 동적 스타일링을 손쉽게 관리합니다.

<br/>

#### 📡State Management📡

  <img src="https://img.shields.io/badge/Zustand-7952B3?style=for-the-badge&logo=&logoColor=white">
  <img src="https://img.shields.io/badge/TanStack Query-F05032?style=for-the-badge&logo=&logoColor=white"><br/>
클라이언트 상태 관리와 서버 상태 관리의 필요성을 효율적으로 해결해 주며,<br/> 복잡도를 줄이면서도 확장 가능한 애플리케이션 구조를 지원하기 때문에 선택했습니다.

<br/>

#### 💻 Database 💻

![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) <br/>
firestore, 인증, 호스팅 등을 사용하여 빠르고 효율적인 개발을 위해 Firebase를 사용했습니다.

<br/>

#### ⚙️번들링 및 개발도구⚙️

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white) <br/>
Vite는 빠른 개발 환경과 최적화된 빌드 성능을 제공하기 때문에 선택했습니다.

<br/>

#### 🔎테스트🔎

<img src="https://img.shields.io/badge/playwright-47A248?style=for-the-badge&logo=&logoColor=white"> <br/>
E2E 테스트 기능, 그리고 자동화된 디버깅 도구를 제공하여, 신뢰성 있는 웹 애플리케이션 테스트를 위해 선택했습니다.

</div>
<br/>

---

## 파일구조

<div style="text-align:center;">
<img width="202" alt="스크린샷 2024-09-09 오전 4 20 11" src="https://github.com/user-attachments/assets/9118c75c-c3dd-4e49-b405-d7ef47817606" >
<img width="232" alt="스크린샷 2024-09-09 오전 4 20 32" src="https://github.com/user-attachments/assets/a78803c0-c01d-440f-b480-c88be74db2ad" >
</div>

### 사용자 화면

<image alt="studio-t" width="800" src="https://github.com/user-attachments/assets/64a97593-e5df-4284-ada1-128f4e4010e6" style="border-radius: 20px" />
