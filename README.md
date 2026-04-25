# PharmSafe

약사를 위한 의약품 안전성 정보 랜딩페이지입니다. 임부(Pregnancy)와 수유부(Lactation) 대상으로 의약품 복용 시 안전성 가이드를 제공합니다.

**배포 주소**: https://pharmsafe.vercel.app

---

## 📋 주요 기능

- **임부 & 수유부 맞춤 가이드**: 태아 및 영아 안전을 고려한 의약품 안전성 정보 제공
- **카테고리별 검색**: 근골격계, 내분비, 비뇨·생식기계, 피부·안과, 중추·말초신경계 등
- **안전성 등급 분류**: Safe / Caution / Avoid 3단계로 명확한 판단 기준 제시
- **MFDS 2025 기준**: 식약처 최신 지침 반영
- **실시간 사용자 추적**: Vercel Analytics를 통한 방문자 및 페이지뷰 모니터링

---

## 🛠 기술 스택

- **프레임워크**: React 19 + TypeScript
- **빌드 도구**: Vite 6
- **스타일링**: Tailwind CSS 4
- **UI 컴포넌트**: Lucide React (아이콘)
- **애니메이션**: Motion (Framer Motion)
- **분석**: Vercel Analytics
- **배포**: Vercel

---

## 🚀 로컬 실행

### 설치

```bash
# 저장소 클론
git clone https://github.com/goneyak/pharmsafe.git
cd pharmsafe

# 의존성 설치
npm install

# API 키 설정
echo "VITE_GEMINI_API_KEY=your_gemini_api_key" > .env.local
```

### 개발 서버 실행

```bash
npm run dev
```

`http://localhost:3000`에서 앱이 실행됩니다.

### 프로덕션 빌드

```bash
npm run build
```

### 타입 검사

```bash
npm run lint
```

---

## 📁 폴더 구조

```
pharmsafe/
├── src/
│   ├── App.tsx           # 메인 앱 컴포넌트
│   ├── main.tsx          # 엔트리 포인트 (Vercel Analytics 포함)
│   ├── index.css         # 글로벌 스타일
│   └── App.tsx           # 약품 데이터 및 UI 로직
├── index.html            # HTML 진입점
├── package.json          # 프로젝트 의존성
├── tsconfig.json         # TypeScript 설정
├── vite.config.ts        # Vite 설정
├── tailwind.config.js    # Tailwind CSS 설정
└── README.md             # 이 파일
```

---

## 📊 Analytics 추적

Vercel Analytics가 활성화되어 다음 지표를 자동으로 수집합니다:

- **방문자 수**: 고유 방문자 수
- **페이지뷰**: 페이지 조회 횟수
- **사용자 행동**: 임부/수유부 가이드 조회 비율
- **국가/지역**: 유입 지역 분석

Vercel Dashboard에서 실시간 데이터를 확인할 수 있습니다.

---

## 📝 라이선스

이 프로젝트는 Apache License 2.0 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참고하세요.

---

## 👨‍💻 기여

버그 리포트나 기능 제안은 GitHub Issues를 통해 제출해주세요.
