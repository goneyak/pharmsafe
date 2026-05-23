import * as fs from 'fs';

let fileContent = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Regex to find Section 8 block and replace it
const oldDermRegex = /\/\/\s*---\s*8\.\s*피부계 약물[\s\S]*?(?=\/\/\s*---\s*9\.\s*항병원성 미생물)/;
const newDermData = `// --- 8. 피부 질환 약물 (MFDS 2025) ---
  // [여드름 (Acne) 치료제]
  {
    id: '8-acne-1',
    category: '여드름',
    name: '벤조일 퍼옥사이드 / 아젤라산 (Benzoyl peroxide / Azelaic acid)',
    pregnancySafety: 'caution',
    pregnancyNote: '벤조일 퍼옥사이드는 국소 도포 시 태아 독성 보고가 없어 비교적 안전하나, 아젤라산은 동물실험에서 발달 영향 가능성이 있어 주의해야 합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중하게 투여합니다.',
    brands: '벤작지, 아젤리아 크림',
  },
  {
    id: '8-acne-2',
    category: '여드름',
    name: '아다팔렌 (Adapalene 국소 레티노이드)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 금지. 피부 흡수 가능성이 있어 임신 중 바르는 레티노이드의 사용은 금지됩니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 권장되지 않습니다.',
    brands: '디페린 겔, 에피듀오 겔',
  },
  {
    id: '8-acne-3',
    category: '여드름',
    name: '이소트레티노인 (Isotretinoin 경구용 레티노이드)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 기형아 발생률이 무려 30%에 달하는 초고위험 약물입니다. 복용 최소 한 달 전부터 복용 종료 후 한 달까지 반드시 2가지 이상의 피임법을 병행해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 절대 투여 금지입니다.',
    brands: '로아큐탄, 이소티논',
  },
  {
    id: '8-acne-4',
    category: '여드름',
    name: '테트라사이클린계 항생제 (Tetracycline / Doxycycline / Minocycline)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 금지. 태아 골격 발달 지연 및 영구적 치아 착색을 유발하므로 임신 중 금기입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용이 금지됩니다.',
    brands: '바이브라마이신, 미노신',
  },

  // [아토피피부염 치료제]
  {
    id: '8-atopic-1',
    category: '아토피피부염',
    name: '보습제 및 저역가 국소 스테로이드',
    pregnancySafety: 'safe',
    pregnancyNote: '임신 중 아토피 치료의 1차 선택제로 안전합니다. 최소 용량의 저역가 스테로이드 국소 도포가 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전합니다.',
    brands: '락티케어, 데스오웬',
  },
  {
    id: '8-atopic-2',
    category: '아토피피부염',
    name: '항히스타민제 (Chlorpheniramine / Cetirizine / Levocetirizine / Loratadine)',
    pregnancySafety: 'safe',
    pregnancyNote: '아토피 가려움증 증상 완화를 위해 임신 중 안전하게 사용 가능한 1차 치료제들입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전하게 사용 가능합니다.',
    brands: '페니라민, 지르텍, 씨잘, 클라리틴',
  },
  {
    id: '8-atopic-3',
    category: '아토피피부염',
    name: '국소 칼시뉴린 억제제 (Tacrolimus / Pimecrolimus)',
    pregnancySafety: 'caution',
    pregnancyNote: '스테로이드 부작용 우려 부위에 제한적으로 신중히 사용해야 합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 투여가 필요합니다.',
    brands: '프로토픽 연고, 엘리델 크림',
  },
  {
    id: '8-atopic-4',
    category: '아토피피부염',
    name: '피부 소독제 (Chlorhexidine / Octenidine / Sodium hypochlorite)',
    pregnancySafety: 'caution',
    pregnancyNote: '2차 감염 예방 등 특수 상황에서 피부 소독을 위해 신중하게 고려할 수 있습니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 피부 적용 시 주의하십시오.',
    brands: '헥사메딘 액, 피부 소독용품',
  },
  {
    id: '8-atopic-5',
    category: '아토피피부염',
    name: '국소 항생제 / 항바이러스제 (Fusidic acid / Mupirocin / Acyclovir)',
    pregnancySafety: 'caution',
    pregnancyNote: '퓨시딕산, 무피로신, 아시클로버 성분은 포진상 습진 및 세균 감염 시 제한적으로 신중하게 사용합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 국소 부위 도포 시 신중을 기하십시오.',
    brands: '후시딘, 베아로반, 조비락스',
  },
  {
    id: '8-atopic-6',
    category: '아토피피부염',
    name: '두필루맙 / 전신 스테로이드 (Dupilumab / Systemic Steroids)',
    pregnancySafety: 'caution',
    pregnancyNote: '중증 아토피에 제2삼분기 이후 신중하게 생물학적 제제 또는 예외적 전신 스테로이드(최소 용량, 단기)를 고려할 수 있습니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 투약 유익성 및 위험성 평가가 필수적입니다.',
    brands: '듀픽센트, 소론도',
  },
  {
    id: '8-atopic-7',
    category: '아토피피부염',
    name: '자외선 A1 및 자외선 B 광선 요법 (UVA1 / NB-UVB / BB-UVB)',
    pregnancySafety: 'safe',
    pregnancyNote: '협대역 및 광대역 자외선 B, 자외선 A1은 임신 중 아토피 및 건선 치료에 안전한 광선 요법으로 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 광선 치료는 안전합니다.',
    brands: '피부과 광선치료 장비',
  },

  // [건선 (Psoriasis) 치료제]
  {
    id: '8-psoriasis-1',
    category: '건선',
    name: '피부 연화제 및 협대역 자외선 B 광선 요법 (NB-UVB)',
    pregnancySafety: 'safe',
    pregnancyNote: '건선은 햇빛에 호전되는 경향이 있어 보습제, 자외선 B 광선 요법, 저~중간 역가 국소 스테로이드가 우선 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전하게 처치 가능합니다.',
    brands: '보습제 및 광선치료',
  },
  {
    id: '8-psoriasis-2',
    category: '건선',
    name: '국소 비타민 D 유도체 (Calcipotriol)',
    pregnancySafety: 'caution',
    pregnancyNote: '칼시포트리올은 신중을 기해 사용하여야 하며, 위해성-유익성 평가 후 적용합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가와 상의하십시오.',
    brands: '다이보넥스, 다이보베트 (복합제 주의)',
  },
  {
    id: '8-psoriasis-3',
    category: '건선',
    name: '건선 생물학적 제제 (TNF-α / IL-17 / IL-23 / IL-12·23 Inhibitors)',
    pregnancySafety: 'caution',
    pregnancyNote: '에타너셉트, 인플릭시맙, 아달리무맙, 골리무맙, 익세키주맙, 세쿠키누맙, 구셀쿠맙, 우스테키누맙입니다. 제2삼분기 이후 신중히 투여합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 투약 여부는 담당의와 긴밀히 협의해야 합니다.',
    brands: '휴미라, 코센틱스, 스텔라라, 트렘피어',
  },
  {
    id: '8-psoriasis-4',
    category: '건선',
    name: '사이클로스포린 (Cyclosporine)',
    pregnancySafety: 'caution',
    pregnancyNote: '조산 우려가 있어 꼭 필요한 경우 최소 용량으로 신중하게 투약합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 주의가 필요합니다.',
    brands: '산디문',
  },
  {
    id: '8-psoriasis-5',
    category: '건선',
    name: '아시트레틴 / 에트레티네이트 (Acitretin / Etretinate)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 심각한 선천 기형을 유발하며, 체지방에 축적되므로 투여 종료 후 최소 3년간 임신이 금지됩니다. 투여 후 2개월간은 음주도 금지(체내 전환 촉진)됩니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 엄격히 금기합니다.',
    brands: '네오티가손',
  },
  {
    id: '8-psoriasis-6',
    category: '건선',
    name: '메토트렉세이트 / 디메틸 푸마르산염 (Methotrexate / Dimethyl fumarate)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 엽산 길항제로서 자연유산 및 주요 기형을 유발하며, 디메틸 푸마르산염 또한 데이터가 제한되어 사용이 금지됩니다. (MTX는 임신 최소 3~6개월 전 중단 필수)',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용해서는 안 됩니다.',
    brands: '엠티엑스 등',
  },
  {
    id: '8-psoriasis-7',
    category: '건선',
    name: '소라렌(Psoralen) 동반 자외선 A 치료 (PUVA)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 소라렌 약물을 동반한 PUVA 광선 치료는 임부에게 금기입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 권고되지 않습니다.',
    brands: '소라렌 (옥소랄렌 등)',
  },

  // [소양증 (Pruritus) 가려움증 치료제]
  {
    id: '8-pruritus-1',
    category: '소양증',
    name: '우르소데옥시콜산 (Ursodeoxycholic acid, UDCA)',
    pregnancySafety: 'safe',
    pregnancyNote: '임신성 담즙 정체증(ICP)으로 인한 심각한 가려움증 완화에 효과가 우수하여 유익하게 사용됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전하게 사용 가능합니다.',
    brands: '우루사 정',
  },
  {
    id: '8-pruritus-2',
    category: '소양증',
    name: '일반 보습제 및 국소 스테로이드',
    pregnancySafety: 'safe',
    pregnancyNote: '일반적인 소양증 증상 완화에 사용됩니다. 단, 고역가 스테로이드는 피부가 얇은 곳에 과다 도포 시 자궁내 성장제한을 초래할 수 있으므로 주의해야 합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 문제없이 적용 가능합니다.',
    brands: '다양한 외용제',
  },

`;

fileContent = fileContent.replace(oldDermRegex, newDermData);

// 2. Update SYMPTOM_NODES
// Change '피부계' to '피부 질환' directly or ensure label is correct.
// In the current file, we have: { id: '피부계', label: '피부 질환', icon: Zap, x: 115, y: -199 },
// We will change the id from '피부계' to '피부' for cleaner naming, optionally keep '피부계' but change label and subcategories. Let's keep '피부계' as ID.

const subNodesDermAddition = `  '피부계': [
    { id: '여드름', label: '여드름', icon: Zap, dx: -50, dy: -60 },
    { id: '아토피피부염', label: '아토피피부염', icon: Shield, dx: 50, dy: -60 },
    { id: '건선', label: '건선', icon: Activity, dx: -50, dy: 60 },
    { id: '소양증', label: '소양증(가려움)', icon: Droplets, dx: 50, dy: 60 },
  ],
  '소화기':`;
fileContent = fileContent.replace(/  '소화기':/, subNodesDermAddition);

// 3. Update CATEGORIES array
const categoriesOld = /const CATEGORIES = \['전체', \.\.\.SYMPTOM_NODES\.map\(node => node\.id\), '입덧', '변비', '설사', '소화불량', '속쓰림', '면역\/염증', '감기', '천식', '비염', '혈관부종', '항생제', '결핵\/바이러스', '백신\/진균', '고혈압', '부정맥\/심부전', '항응고\/혈전', '이뇨제', '당뇨병', '이상지질혈증', '갑상선'\];/;
const categoriesNew = `const CATEGORIES = ['전체', ...SYMPTOM_NODES.map(node => node.id), '입덧', '변비', '설사', '소화불량', '속쓰림', '면역/염증', '감기', '천식', '비염', '혈관부종', '항생제', '결핵/바이러스', '백신/진균', '고혈압', '부정맥/심부전', '항응고/혈전', '이뇨제', '당뇨병', '이상지질혈증', '갑상선', '여드름', '아토피피부염', '건선', '소양증'];`;
fileContent = fileContent.replace(categoriesOld, categoriesNew);

// 4. Update parentCategories
const parentCatAddition = `'피부계': ['여드름', '아토피피부염', '건선', '소양증', '피부계'],
        '소화기':`;
fileContent = fileContent.replace(/'소화기':/, parentCatAddition);

// 5. Update CLINICAL_GUIDES
const guideRegex = /'피부계': '[^']+',/;
const newGuide = `'피부계': '이소트레티노인, 아시트레틴과 같은 레티노이드계 약물은 중증 기형을 유발하므로 임신 중 절대 금불입니다(아시트레틴 투약 후엔 3년간 임신 금지). 건선과 아토피에는 보습제 및 협대역 자외선 B 광선 요법이 1차 선택지입니다.',`;
fileContent = fileContent.replace(guideRegex, newGuide);

fs.writeFileSync('src/App.tsx', fileContent);
console.log('Successfully updated Dermatology medications and subnodes.');
