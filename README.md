# PharmSafe

임신/수유 중 의약품 안전 정보를 빠르게 조회할 수 있도록 만든 React + Vite 기반 웹 앱입니다.

## 주요 기능

- 의약품명/카테고리 검색
- 임신 중 안전도 분류 (`safe`, `caution`, `avoid`)
- 수유 중 안전도 분류 (`safe`, `caution`, `avoid`)
- 약물별 상세 설명 및 대표 제품명(브랜드) 확인

## 기술 스택

- React 19
- TypeScript
- Vite
- lucide-react
- motion

## 시작하기

### 요구 사항

- Node.js 18 이상
- npm

### 설치 및 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속합니다.

### 빌드

```bash
npm run build
```

### 타입 체크

```bash
npm run lint
```

## 프로젝트 구조

```text
pharmsafe/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 데이터 안내

- 앱에 포함된 약물 정보는 코드 내 정적 데이터로 관리됩니다.
- 데이터는 최신 임상 가이드/식약처 고시 개정에 따라 주기적 업데이트가 필요합니다.

## 의료 정보 관련 고지

이 프로젝트는 정보 제공 목적이며, 의료진의 진료 및 처방을 대체하지 않습니다.
임신/수유 중 약물 복용 여부는 반드시 의사 또는 약사와 상담 후 결정하세요.

## GitHub 업로드

아래 명령으로 로컬 프로젝트를 원격 저장소에 업로드할 수 있습니다.

```bash
git init
git add .
git commit -m "Initial commit: PharmSafe"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

`<YOUR_GITHUB_REPO_URL>` 예시:

- `https://github.com/<username>/pharmsafe.git`
- `git@github.com:<username>/pharmsafe.git`
