import * as fs from 'fs';

let fileContent = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Remove the old block 2-1 to 2-6
const oldEndocrineRegex = /\/\/\s*---\s*2\.\s*내분비·면역계 약물[\s\S]*?(?=\/\/\s*---\s*3\.)/;
const newEndocrineData = `// --- 2. 내분비 및 대사 질환 (MFDS 2025) ---
  // [당뇨병 치료제]
  {
    id: '2-1',
    category: '당뇨병',
    name: '인슐린 (Insulin)',
    pregnancySafety: 'safe',
    pregnancyNote: '배·태아 독성이나 기형 유발 작용이 없어 임신 중 가장 우선적으로 권고되는 1차 치료제입니다. 적극적인 투여로 혈당을 조절하는 것이 필수적입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전하게 사용 가능합니다.',
  },
  {
    id: '2-2',
    category: '당뇨병',
    name: '메트포르민 (Metformin)',
    pregnancySafety: 'caution',
    pregnancyNote: '인슐린을 사용할 수 없는 경우에만 제한적으로 고려할 수 있으나, 태반을 통과하고 출생아 과체중 위험이 있어 우선 권장되지 않습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전합니다.',
  },
  {
    id: '2-3',
    category: '당뇨병',
    name: '글리벤클라마이드 (Glibenclamide)',
    pregnancySafety: 'caution',
    pregnancyNote: '태반을 통과하며 과체중아 및 신생아 저혈당 발생 위험이 메트포르민이나 인슐린보다 열등하여 추천되지 않습니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 영아 저혈당 모니터링이 필요합니다.',
  },
  {
    id: '2-4',
    category: '당뇨병',
    name: 'GLP-1 작용제 (Glucagon-like peptide-1 agonists)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 임부 사용 데이터가 없거나 동물실험 독성이 있어 복용 중 피임이 필수이며 임신 전 반드시 중단해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 안전성 미확립으로 금기입니다.',
  },
  {
    id: '2-5',
    category: '당뇨병',
    name: 'SGLT-2 억제제 계열 (Gliflozins / Flozins)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 생식 및 신장 독성 우려가 있어 복용 중 피임이 필수이며 임신 전 반드시 중단해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 신장 발달 위험으로 금기입니다.',
  },
  {
    id: '2-6',
    category: '당뇨병',
    name: 'DPP-4 억제제 (Dipeptidyl peptidase-4 inhibitors)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 동물실험 독성 등으로 인해 복용 중 피임이 필수이며 임신 전 반드시 중단해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기입니다.',
  },

  // [이상지질혈증 치료제]
  {
    id: '2-7',
    category: '이상지질혈증',
    name: '오메가-3 보충제 (DHA)',
    pregnancySafety: 'safe',
    pregnancyNote: '콜레스테롤 조절보다는 태아 뇌 발달을 위해 일일 최소 200~300mg 섭취가 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전합니다.',
  },
  {
    id: '2-8',
    category: '이상지질혈증',
    name: '스타틴 계열 (Simvastatin / Atorvastatin / Pitavastatin / Rosuvastatin / Pravastatin)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 콜레스테롤은 태아 발달에 필수적이므로 계획 임신 최소 6~12주 전 중단이 필수입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 금기입니다.',
  },
  {
    id: '2-9',
    category: '이상지질혈증',
    name: '피브레이트 계열 (Bezafibrate / Fenofibrate)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 동물실험에서 제3삼분기 태아 축적 위험이 관찰되어 임신 중 금기입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기입니다.',
  },
  {
    id: '2-10',
    category: '이상지질혈증',
    name: '기타 지질저하제 (Ezetimibe / Nicotinic acid / Acipimox)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 임부 안전성 데이터 부족 및 기형 발생 우려로 임신 중 투약을 금지합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기입니다.',
  },

  // [갑상선 질환 치료제]
  {
    id: '2-11',
    category: '갑상선',
    name: '레보티록신 (Levothyroxine)',
    pregnancySafety: 'safe',
    pregnancyNote: '태반을 쉽게 통과하지 않으며 부작용이 없어 가장 안전하게 신속히 투여해야 하는 호르몬제입니다. 임신 시 증량이 필요할 수 있습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전합니다.',
  },
  {
    id: '2-12',
    category: '갑상선',
    name: '리오티로닌 및 건조 갑상선 제제 (Liothyronine / Desiccated Thyroid)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 금지. T3 제제 및 동물 유래 갑상선 제제는 임신 중 생리적 변동이 크고 제어하기 어려워 사용이 금지됩니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 권장되지 않습니다.',
  },
  {
    id: '2-13',
    category: '갑상선',
    name: '프로필티오우라실 (Propylthiouracil)',
    pregnancySafety: 'caution',
    pregnancyNote: '메티마졸보다 기형 빈도와 중증도가 낮아 임신 1삼분기(초기) 항갑상선제 치료 시 우선 권고됩니다. 간독성에 주의하십시오.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 소량 투여 가능합니다.',
  },
  {
    id: '2-14',
    category: '갑상선',
    name: '메티마졸 (Methimazole)',
    pregnancySafety: 'caution',
    pregnancyNote: '피부 무형성증, 식도/후비공 폐쇄 등 메티마졸 배아병증 유발 가능성이 있어 1삼분기에는 회피하고, 2삼분기 이후 제한적으로 전환 고려할 수 있습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 최대 20mg까지 비교적 안전합니다.',
  },

`;

fileContent = fileContent.replace(oldEndocrineRegex, newEndocrineData);

// 2. Add Endocrine subcategories to SUB_NODES
const subNodesNewEndocrine = `  '내분비': [
    { id: '당뇨병', label: '당뇨병', icon: Activity, dx: -50, dy: -60 },
    { id: '이상지질혈증', label: '이상지질혈증', icon: Droplets, dx: 50, dy: -60 },
    { id: '갑상선', label: '갑상선 질환', icon: Shield, dx: 0, dy: 60 },
  ],
  '순환기': [`;

fileContent = fileContent.replace(/  '순환기': \[/, subNodesNewEndocrine);

// 3. Update CATEGORIES array
const categoriesOld = /const CATEGORIES = \['전체', \.\.\.SYMPTOM_NODES\.map\(node => node\.id\), '입덧', '변비', '설사', '소화불량', '속쓰림', '면역\/염증', '감기', '천식', '비염', '혈관부종', '항생제', '결핵\/바이러스', '백신\/진균', '고혈압', '부정맥\/심부전', '항응고\/혈전', '이뇨제'\];/;
const categoriesNew = `const CATEGORIES = ['전체', ...SYMPTOM_NODES.map(node => node.id), '입덧', '변비', '설사', '소화불량', '속쓰림', '면역/염증', '감기', '천식', '비염', '혈관부종', '항생제', '결핵/바이러스', '백신/진균', '고혈압', '부정맥/심부전', '항응고/혈전', '이뇨제', '당뇨병', '이상지질혈증', '갑상선'];`;
fileContent = fileContent.replace(categoriesOld, categoriesNew);

// 4. Update parentCategories
const parentCatAddition = `'내분비': ['당뇨병', '이상지질혈증', '갑상선', '내분비'],
        '순환기': ['고혈압', '부정맥/심부전', '항응고/혈전', '이뇨제', '순환기'],`;
fileContent = fileContent.replace(/'순환기': \['고혈압', '부정맥\/심부전', '항응고\/혈전', '이뇨제', '순환기'\],/, parentCatAddition);

// 5. Update CLINICAL_GUIDES
const newGuide = `'내분비': '당뇨 조절은 기형 예방의 핵심입니다(인슐린 가장 안전, 1차 선택). 이상지질혈증 약물(스타틴 등)은 태아 발달을 저해하므로 임신 중 투여 금지입니다. 갑상선 호르몬제(레보티록신)는 매우 안전하며 적극 투여해야 합니다.',`;
fileContent = fileContent.replace(/'내분비': '[^']+',/, newGuide);

fs.writeFileSync('src/App.tsx', fileContent);
console.log('Successfully updated Endocrine medications and subnodes.');
