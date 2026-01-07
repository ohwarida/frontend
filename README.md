# 코드 컨벤션

## 1) 폴더 역할

### app/
- 라우팅/레이아웃/에러/로딩/메타데이터만 둔다.
- page.tsx는 “조립”만 한다. (로직/상태/쿼리 훅은 features로)

### features/
- 기능(도메인) 코드 본체.
- 기능별로 필요에 따라 `components / apis / queries / actions / stores / types / constants / utils`

### components/
- 도메인 모르는 공용 UI만 둔다.
- 파일/컴포넌트명에 Post/Admin/Track 같은 도메인 단어가 들어가면 features로 이동한다.

---

## 2) 네이밍

### 폴더명
- 기본: kebab-case
- Next 라우트 세그먼트는 Next 규칙 그대로 사용: (group), @slot, [id]

### 파일명
- 컴포넌트: PascalCase.tsx
- 훅: useXxx.ts(x)
- 유틸: camelCase.ts
- 스토어: xxx.store.ts
- API: xxx.api.ts
- 서버 액션: xxx.action.ts

### 타입 파일명(통일)
- *.types.ts 로 통일한다.
- 타입 이름은 단수로 export 한다.
    - export type User = ...
    - export type Pagination = ...

---

## 3) export 규칙
- page/layout/error/loading/not-found/route 만 default export 허용
- 그 외는 전부 named export

---

## 4) store 위치
- 전역에서 공유되는 상태만 /store
- 기능 전용이면 features/**/stores

---

## 5) 서버/클라이언트 컴포넌트
- 기본은 Server Component
- 필요할 때만 'use client'
- 'use client'는 인터랙션 컴포넌트에만 붙이고 페이지에 크게 붙이지 않는다.

---

## 6) import 규칙
- @/ 절대경로 우선, 깊은 상대경로 지양
- import 순서:
    1) react, next/*
    2) 외부 라이브러리
    3) @/
    4) 상대경로
- 타입은 import type 사용

---

## 7) 액션 규칙
- 기본: 1 파일 = 1 액션 → xxx.action.ts
- 예외: 여러 액션이면 xxx.actions.ts 허용

---

## 8) 지금 프로젝트에서 바로 통일할 것
- *.type.ts → *.types.ts
- TrackFiled.tsx → TrackField.tsx
- lib/o-auth → lib/oauth
