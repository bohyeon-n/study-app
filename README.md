# 🐢 거북이 스터디 앱 

[1.프로젝트 소개](#프로젝트-소개)

[2.사용 방법](#사용-방법)

[3.기능](#기능)

[4.사용 기술](#사용-기술)

[5. 데이터 구조](#데이터-구조)

## 프로젝트 소개

스터디 모집 서비스입니다.

## 사용 방법

### 서버

- 자바 버전
  11

- 빌드

```
./gradlew build
```

- 로컬 서버 띄우기

```
javar -jar build/libs/study-app-0.0.1-SNAPSHOT.jar
```

8080번 포트로 접속할 수 있습니다. 

### 클라이언트

- 패키지 설치

```
npm install
```

- 로컬 서버 띄우기

```
npm start
```
3000번 포트로 접속할 수 있습니다. 

## 기능

- 게시글 CRUD
- 댓글 CRUD
- 마이페이지
- 검색 기능
- github oAuth 로그인 기능

<details>
<summary>**이미지로 페이지 둘러보기**</summary>

<div markdown="1">

- 메인 페이지

![메인페이지](https://user-images.githubusercontent.com/36990926/91065732-d05f0a00-e66b-11ea-815a-46d04064d33e.png)

- 글 상세 페이지

![글 상세 페이지 ](https://user-images.githubusercontent.com/36990926/91065740-d228cd80-e66b-11ea-885e-805015b25e8c.png)

![수정하기 ](https://user-images.githubusercontent.com/36990926/91065745-d228cd80-e66b-11ea-9f48-e30fb1a15bd6.png)

- 글 생성 페이지

![](https://user-images.githubusercontent.com/36990926/91065716-cb01bf80-e66b-11ea-9542-9879e64658ee.png)

- 로그인

![로그인1](https://user-images.githubusercontent.com/36990926/91065725-ce954680-e66b-11ea-962b-8656f8e201ae.png)

![로그인2](https://user-images.githubusercontent.com/36990926/91065729-cf2ddd00-e66b-11ea-88af-3f89ed9927fa.png)

- 마이 페이지

![마이페이지](https://user-images.githubusercontent.com/36990926/91065731-cfc67380-e66b-11ea-94c8-aeb55129f4dd.png)

- 모바일

![모바일1](https://user-images.githubusercontent.com/36990926/91065736-d0f7a080-e66b-11ea-9f19-6d760485edc7.png)

![모바일2](https://user-images.githubusercontent.com/36990926/91065739-d1903700-e66b-11ea-9e03-12ab27bff6d4.png)

</div>
</details>

## 사용 기술

- 서버

  - java 11
  - spring
  - spring data jdbc

- 클라이언트

  - react
  - typescript

- 데이터 베이스

  - product: mysql
  - dev: h2

- 배포
  - apache
  - aws ec2
  - github action 
  - aws codedeploy 
  
## 데이터 구조

- erd

![erd](https://user-images.githubusercontent.com/36990926/90489616-74324c80-e178-11ea-9b88-35652459de5d.png)
