# PharmSafe

PharmSafe는 약국 현장에서 임부 의약품 상담 시 빠르게 참고할 수 있도록 만든 약물 안전성 lookup MVP입니다.

현재 공개 버전은 2025년 식품의약품안전처(MFDS) 전문가용 참고자료를 바탕으로, 임부 약물 정보를 검색 가능한 카드와 증상/질환 중심 탐색 UI로 재구성합니다. 이 도구는 약사의 전문적 판단을 보조하기 위한 참고 자료이며, 진단, 처방, 공식 의약품 정보 데이터베이스를 대체하지 않습니다.

Live app: https://pharmsafe.vercel.app

## Demo

![PharmSafe main screen](docs/screenshot-main.png)

![PharmSafe pregnancy map view](docs/screenshot-map.png)

## Product Positioning

- Pharmacist-facing medication safety lookup MVP
- Optimized for quick counselling in community pharmacy workflows
- Focused on pregnancy counselling in the current public release
- Lactation-specific content is being reviewed before full release

## Current Scope

Implemented:
- Pregnancy medication safety lookup
- Category and keyword-based search
- Searchable drug cards with short counselling notes
- Pregnancy symptom/category map view
- MFDS 2025-based summary guidance

In progress:
- Lactation-specific public release
- Source-level citation fields by record
- More explicit update/version tracking for clinical content

## Clinical Positioning

PharmSafe는 임부 의약품 안전성 정보를 `우선 고려 / 신중 사용 / 회피 권고` 형태로 빠르게 탐색할 수 있게 정리한 참고 도구입니다. 실제 상담에서는 임신 주수, 수유 여부, 용량, 투여 기간, 투여 경로, 기저질환, 병용약물을 함께 고려해야 하므로 본 앱의 라벨만으로 최종 의사결정을 내려서는 안 됩니다.

## Source Method

- Primary reference: MFDS, `임부에 대한 의약품 적정사용 정보집 (전문가용)`, 2025
- Drug cards were manually reorganized into structured counselling summaries
- The repository does not claim to reproduce the full source document as an official database

원문 파일과 작업 메모는 [`references/`](references) 및 [`scripts/`](scripts) 아래로 정리했습니다.

## Privacy and Analytics

- This app does not collect personal health information
- Vercel Analytics is used only for aggregate traffic monitoring such as page views and general usage trends

## Tech Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide React
- Motion
- Vercel Analytics

## Local Development

```bash
git clone https://github.com/goneyak/pharmsafe.git
cd pharmsafe
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```text
pharmsafe/
├── docs/              # screenshots and visual assets
├── references/        # source-reference notes
├── scripts/           # data-cleaning and transformation scripts
├── src/               # app source
├── LICENSE
├── package.json
└── README.md
```

## Known Limitations

- The current UI is still driven from a single large app file and should be modularized further
- Record-level citations, page markers, and update timestamps are not yet attached to each medication card
- Lactation content is not yet released as a validated public lookup flow

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
