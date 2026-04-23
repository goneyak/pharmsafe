import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Update Section 6
const oldNeuroRegex = /\/\/\s*---\s*6\.\s*신경·정신계 약물[\s\S]*?(?=\/\/\s*---\s*7\.\s*심혈관계 약물)/;

const newNeuroData = `// --- 6. 신경 및 정신계 질환 (MFDS 2025) ---
  // [불안장애 (Anxiety disorder)]
  {
    id: '6-anx-1',
    category: '불안장애',
    name: '디아제팜 (Diazepam) / 로라제팜 (Lorazepam)',
    pregnancySafety: 'caution',
    pregnancyNote: '벤조디아제핀 계열. 급성 불안 시 최단 기간 소량 사용할 수 있습니다. 로라제팜이 반감기가 짧아 선호되나, 기형 및 신생아 독성 우려로 신중해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 영아 기면 유발.',
    brands: '바리움, 아티반',
  },
  {
    id: '6-anx-2',
    category: '불안장애',
    name: '알프라졸람 (Alprazolam)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 피할 것. 반동 불안 유발 우려가 있어 임신 중 사용이 권장되지 않습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 금지.',
    brands: '자낙스',
  },

  // [수면장애 / 불면증 (Sleep disorder)]
  {
    id: '6-slp-1',
    category: '수면장애',
    name: '독실아민 / 디펜히드라민 (Doxylamine / Diphenhydramine)',
    pregnancySafety: 'caution',
    pregnancyNote: '비약물적 치료(인지행동치료) 실패 시 제한적으로 단기 사용을 고려할 수 있는 항히스타민제 성분들입니다.',
    lactationSafety: 'caution',
    lactationNote: '단기 사용 한정.',
    brands: '아론 정, 단미 수면유도제',
  },
  {
    id: '6-slp-2',
    category: '수면장애',
    name: '졸피뎀 / 에스조피클론 (Zolpidem / Eszopiclone)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 피할 것. 비-벤조디아제핀 계열 수면제. 신생아 호흡저하 우려로 투여를 권장하지 않습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 안전성 문제.',
    brands: '스틸녹스, 졸피드',
  },
  {
    id: '6-slp-3',
    category: '수면장애',
    name: '플루라제팜 / 트리아졸람 / 플루니트라제팜 (Flurazepam / Triazolam / Flunitrazepam)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 피할 것. 벤조디아제핀 계열 수면제로 신생아 독성 및 위해성이 커 금기시합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 절대 피할 것.',
    brands: '할시온, 플루니트라제팜',
  },

  // [우울장애 (Depressive disorder)]
  {
    id: '6-dep-1',
    category: '우울장애',
    name: '플루옥세틴 / 설트랄린 / 에스시탈로프람 (Fluoxetine / Sertraline / Escitalopram)',
    pregnancySafety: 'caution',
    pregnancyNote: '선택적 세로토닌 재흡수 억제제(SSRIs). 1차 선택으로 가장 널리 쓰이나, 3삼분기 노출 시 신생아 행동장애 및 폐동맥 고혈압 존속증 발생 보고가 있어 단독치료를 권장합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 설트랄린이 가장 안전합니다.',
    brands: '푸로작, 졸로푸트, 렉사프로',
  },
  {
    id: '6-dep-2',
    category: '우울장애',
    name: '파록세틴 (Paroxetine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '⚠️ 주의. 동일한 SSRI 계열이나 심혈관계 기형 발생 위험 증가 보고가 존재하여 다른 SSRI제보다 더욱 주의가 필요합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중하게 고려.',
    brands: '팍실',
  },
  {
    id: '6-dep-3',
    category: '우울장애',
    name: '삼환계 항우울제 (Tricyclic Antidepressants, TCAs)',
    pregnancySafety: 'caution',
    pregnancyNote: '데이터가 적어 1차로 권장되지 않으며, SSRI 실패 시 2차 옵션으로 전문가 상의 하에 고려합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 심박수 모니터링 필요.',
    brands: '에트라빌, 센시발',
  },

  // [양극성장애 (Bipolar disorder)]
  {
    id: '6-bp-1',
    category: '양극성장애',
    name: '비정형 항정신병약물 (Aripiprazole / Olanzapine / Quetiapine / Risperidone / Ziprasidone)',
    pregnancySafety: 'caution',
    pregnancyNote: '안전하다고 확립된 1차 약물이 없어 아리피프라졸, 올란자핀 등은 양극성장애의 2차 치료제로 신중하게 사용됩니다.',
    lactationSafety: 'caution',
    lactationNote: '영아 발달 및 행동관찰 필수.',
    brands: '아빌리파이, 자이프렉사, 쎄로켈, 리스페달, 젤독스',
  },
  {
    id: '6-bp-2',
    category: '양극성장애',
    name: '에스시탈로프람 / 부프로피온 / 데스벤라팍신 (Escitalopram / Bupropion / Desvenlafaxine)',
    pregnancySafety: 'caution',
    pregnancyNote: '항우울제군. 양극성장애의 우울삽화 시 2차 치료 목적으로 필요 시 신중히 투여를 고려합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 유익성 평가 필요.',
    brands: '렉사프로, 웰부트린, 프리스틱',
  },
  {
    id: '6-bp-3',
    category: '양극성장애',
    name: '리튬 (Lithium)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 위험성 높음 (3차 고려). 태아 심장기형(Ebstein 이상) 발생 위험이 커 투여 시 태아 심초음파 등 선별검사와 모체 피의 리튬 농도 추적이 필수적입니다.',
    lactationSafety: 'avoid',
    lactationNote: '영아 리튬 중독 우려로 금기.',
    brands: '리단 정',
  },
  {
    id: '6-bp-4',
    category: '양극성장애',
    name: '카르바마제핀 (Carbamazepine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 위험성 높음 (3차 고려). 선천 이상 및 성장장애가 보고되어 불가피한 경우 최소 유효 용량으로만 제한적 사용합니다.',
    lactationSafety: 'avoid',
    lactationNote: '간독성 우려.',
    brands: '테그레톨',
  },
  {
    id: '6-bp-5',
    category: '양극성장애',
    name: '발프로에이트 (Valproate)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기 (3차 고려). 척추갈림증(신경관 결손), 지능/발달 장애를 유발하며 기형 발생률이 11%에 달해 투여를 피해야 하며 임신 예방 프로그램 대상 약물입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '데파코트, 오르필',
  },
  {
    id: '6-bp-6',
    category: '양극성장애',
    name: '라모트리진 (Lamotrigine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 위험성 높음 (3차 고려). 1삼분기 투여 시 구개열 위험이 보고되는 등 임신 중 안전성이 미확립 상태입니다.',
    lactationSafety: 'avoid',
    lactationNote: '위험성 평가 우선.',
    brands: '라믹탈',
  },

  // [조현병 (Schizophrenia)]
  {
    id: '6-sz-1',
    category: '조현병',
    name: '할로페리돌 / 퍼페나진 (Haloperidol / Perphenazine)',
    pregnancySafety: 'caution',
    pregnancyNote: '정형 항정신병약물. 1삼분기 시작은 가급적 피하고 기존 복용자라면 유지하며 조현병 관리에 있어 상대적으로 선호되는 약물입니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 고려.',
    brands: '할돌, 페리콤 정',
  },
  {
    id: '6-sz-2',
    category: '조현병',
    name: '비정형 항정신병약물 (Clozapine / Olanzapine / Risperidone / Quetiapine / Aripiprazole / Ziprasidone / Amisulpride / Paliperidone)',
    pregnancySafety: 'caution',
    pregnancyNote: '처방 종류를 최소화하고 원래 투약 중이던 약물을 지속하는 것이 원칙입니다. 과도한 약물 변경은 산모의 재발 위험을 높입니다.',
    lactationSafety: 'caution',
    lactationNote: '전문가 밀착 모니터링 필수.',
    brands: '클로자릴, 자이프렉사, 쎄로켈, 인베가 등 포함',
  },
  {
    id: '6-sz-3',
    category: '조현병',
    name: '데포(Depot) 제제 / 장기 지속형 주사제',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 금지. 체내에 장기간 남아 신생아의 추체외로증상 유발 우려가 있으므로 장기 지속형 약물 투여는 금합니다.',
    lactationSafety: 'avoid',
    lactationNote: '신생아 체외 배출 지연됨.',
    brands: '인베가 서스티나 등 장기지속 주사류',
  },

  // [주의력결핍 과잉행동장애 (ADHD)]
  {
    id: '6-ad-1',
    category: 'ADHD',
    name: '메틸페니데이트 / 아토목세틴 (Methylphenidate / Atomoxetine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '⚠️ 안전성 미확립. 임부 대상 임상시험이 없어 1삼분기에는 약물 중단이 권장되며, 증상이 매우 심각하여 유익성이 더 큰 경우에만 투여를 고려합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 성분이 유출되므로 투약 회피.',
    brands: '콘서타, 메디키넷, 스트라테라',
  },

`;

content = content.replace(oldNeuroRegex, newNeuroData);


// 2. Set SubNodes for Neuroscience
const subNodesAddition = `  '신경/정신': [
    { id: '우울장애', label: '우울장애', icon: Brain, dx: -50, dy: -60 },
    { id: '불안장애', label: '불안장애', icon: Activity, dx: 50, dy: -60 },
    { id: '수면장애', label: '수면장애(불면)', icon: Shield, dx: 0, dy: 60 },
    { id: '양극성장애', label: '양극성장애', icon: Activity, dx: -80, dy: 0 },
    { id: '조현병', label: '조현병', icon: Activity, dx: 80, dy: 0 },
    { id: 'ADHD', label: 'ADHD', icon: Zap, dx: 0, dy: -100 },
  ],
  '알레르기':`;
content = content.replace(/  '알레르기':/, subNodesAddition);

// 3. Update Categories
const categoriesOld = /const CATEGORIES = \['전체', [\s\S]*?\];/;
const categoriesNew = `const CATEGORIES = ['전체', ...SYMPTOM_NODES.map(node => node.id), '입덧', '변비', '설사', '소화불량', '속쓰림', '면역/염증', '감기', '천식', '비염', '혈관부종', '항생제', '결핵/바이러스', '백신/진균', '고혈압', '부정맥/심부전', '항응고/혈전', '이뇨제', '당뇨병', '이상지질혈증', '갑상선', '여드름', '아토피피부염', '건선', '소양증', '우울장애', '불안장애', '수면장애', '양극성장애', '조현병', 'ADHD'];`;
content = content.replace(categoriesOld, categoriesNew);

// 4. Update ParentCategories
const parentCatAddition = `'신경/정신': ['우울장애', '불안장애', '수면장애', '양극성장애', '조현병', 'ADHD', '신경/정신'],
        '감염/항생제':`;
content = content.replace(/'감염\/항생제':/, parentCatAddition);

// 5. Update CLINICAL_GUIDES for 신경/정신
const guideRegex = /'신경\/정신': '편두통은 임신 중 호전되는 경향이 있으나, 약물 사용 시 수마트립탄, 졸미트립탄 성분은 주의가 필요합니다\. 뇌전증 약물은 전문가와의 기형 위험 상담이 필수적입니다\.',/;
const newGuide = `'신경/정신': '기존 복용 약물을 임의로 끊기보다 체계적으로 유지하거나 조절하는 것이 중요합니다. 우울증엔 SSRI 단독이 가장 선호되며, 양극성장애의 발프로에이트 투여는 신경관 결손 11% 유발로 절대 피해야 합니다. 불안 및 수면 장애 약물(벤조디아제핀, 졸피뎀 등)은 신생아 호흡저하를 우려하여 가장 후순위로 미뤄집니다.',`;
content = content.replace(guideRegex, newGuide);

fs.writeFileSync('src/App.tsx', content);
console.log('Successfully updated Neuro/Psychiatric section and UI sub-nodes');
