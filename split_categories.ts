import * as fs from 'fs';

const filePath = 'src/App.tsx';
let fileContent = fs.readFileSync(filePath, 'utf-8');

// 1. Update Medications categories
// ID starts with '2-' -> Endocrine
fileContent = fileContent.replace(/(id:\s*'2-\d+',\s*category:\s*)'내분비\/순환기'/g, "$1'내분비'");
// IDs for section 7 and 11 -> Cardiocascular/Blood
fileContent = fileContent.replace(/(category:\s*)'내분비\/순환기'/g, "$1'순환기'");

// 2. Update SYMPTOM_NODES array to have 12 perfectly spread nodes (30 degree intervals)
const oldNodesRegex = /const SYMPTOM_NODES = \[([\s\S]*?)\];/;
const newNodes = `const SYMPTOM_NODES = [
  { id: '소화기', label: '소화기 질환', icon: Activity, x: 0, y: -230 },
  { id: '피부계', label: '피부 질환', icon: Zap, x: 115, y: -199 },
  { id: '내분비', label: '내분비 질환', icon: Activity, x: 199, y: -115 },
  { id: '순환기', label: '순환기(혈액)', icon: Heart, x: 230, y: 0 },
  { id: '감염/항생제', label: '감염/백신', icon: Shield, x: 199, y: 115 },
  { id: '비뇨생식기', label: '비뇨생식기', icon: Droplets, x: 115, y: 199 },
  { id: '신경/정신', label: '신경/정신', icon: Brain, x: 0, y: 230 },
  { id: '알레르기', label: '알레르기', icon: Zap, x: -115, y: 199 },
  { id: '호흡기', label: '호흡기 질환', icon: Wind, x: -199, y: 115 },
  { id: '통증/진통', label: '통증/진통', icon: Thermometer, x: -230, y: 0 },
  { id: '기타/종양', label: '악성종양', icon: Star, x: -199, y: -115 },
  { id: '면역/염증', label: '면역/염증', icon: Stethoscope, x: -115, y: -199 },
];`;
fileContent = fileContent.replace(oldNodesRegex, newNodes);

// 3. Update CLINICAL_GUIDES
const guideRegex = /'내분비\/순환기':\s*'[^']+',/;
const newGuide = `'내분비': '당뇨 조절은 기형 예방의 핵심입니다(인슐린 1차). 갑상선 질환 역시 임신 중 요구량이 변동하므로 전문의의 세심한 약물 조절이 필수적입니다.',\n  '순환기': '고혈압에는 라베탈롤/니페디핀이 권장되며, ACEI/ARB와 와파린, 스타틴은 전 기간 절대 금기입니다. 고위험군 산모의 경우 저용량 아스피린(전자간증 예방) 사용을 확인하십시오.',`;
fileContent = fileContent.replace(guideRegex, newGuide);

fs.writeFileSync(filePath, fileContent);
console.log('Successfully split Endocrine and Circulatory categories.');
