/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Search, 
  Info, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Pill, 
  ChevronRight, 
  Stethoscope, 
  ArrowLeft,
  Baby,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  Activity,
  Zap,
  Brain,
  Shield,
  Star,
  Flame,
  Utensils,
  ArrowDownCircle,
  RotateCcw,
  Sparkles,
  SearchCode,
  Syringe,
  Dna,
  Bug,
  BugOff,
  Cross,
  Microscope,
  Ear,
  Eye,
  Cigarette,
  GlassWater,
  Clover,
  ThermometerSnowflake,
  Smile,
  Frown,
  Bone,
  Bandage,
  TestTube,
  Menu,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type SafetyLevel = 'safe' | 'caution' | 'avoid';
type Mode = 'landing' | 'pregnancy' | 'lactation';

interface Medication {
  id: string;
  category: string;
  name: string;
  pregnancySafety: SafetyLevel;
  pregnancyNote: string;
  lactationSafety: SafetyLevel;
  lactationNote: string;
  brands: string;
}

const MEDICATIONS: Medication[] = [
  // --- 1. 근골격계 약물 (MFDS 2025) ---
  {
    id: '1-1',
    category: '통증/진통',
    name: '에페리손 (Eperisone)',
    pregnancySafety: 'avoid',
    pregnancyNote: '중추성 근이완제. 임신 중 안전성 미확립으로 투여 금기.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 시 모유 이행 우려.',
    brands: '에페신, 마이오나 등',
  },
  {
    id: '1-2',
    category: '통증/진통',
    name: '클로르조사존 / 메토카르바몰 (Chlorzoxazone / Methocarbamol)',
    pregnancySafety: 'caution',
    pregnancyNote: '근이완제. 태아 기형 가능성 데이터 부족. 유익성 상회 시 신중 투여.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 영아 관찰.',
    brands: '리렉사, 로바신 등',
  },
  {
    id: '1-3',
    category: '통증/진통',
    name: '콜킨 (Colchicine)',
    pregnancySafety: 'caution',
    pregnancyNote: '통풍 치료제. 세포분열 억제 작용이 있어 임신 중 투여 시 엄격한 유익성 평가 필요.',
    lactationSafety: 'caution',
    lactationNote: '모유로 이행되나 소량임.',
    brands: '콜킨정 등',
  },

  // --- 2. 내분비 및 대사 질환 (MFDS 2025) ---
  // [당뇨병 치료제]
  {
    id: '2-1',
    category: '당뇨병',
    name: '인슐린 (Insulin)',
    pregnancySafety: 'safe',
    pregnancyNote: '배·태아 독성이나 기형 유발 작용이 없어 임신 중 가장 우선적으로 권고되는 1차 치료제입니다. 적극적인 투여로 혈당을 조절하는 것이 필수적입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전하게 사용 가능합니다.',
    brands: '휴물린, 란투스, 노보래피드',
  },
  {
    id: '2-2',
    category: '당뇨병',
    name: '메트포르민 (Metformin)',
    pregnancySafety: 'caution',
    pregnancyNote: '인슐린을 사용할 수 없는 경우에만 제한적으로 고려할 수 있으나, 태반을 통과하고 출생아 과체중 위험이 있어 우선 권장되지 않습니다.',
    lactationSafety: 'caution',
    lactationNote: '모유 이행은 있으나 보고된 이상반응은 적음. 자료 제한으로 수유 지속 여부를 전문가와 상의하여 개별 결정.',
    brands: '다이아벡스, 글루코파지',
  },
  {
    id: '2-3',
    category: '당뇨병',
    name: '글리벤클라마이드 (Glibenclamide)',
    pregnancySafety: 'caution',
    pregnancyNote: '태반을 통과하며 과체중아 및 신생아 저혈당 발생 위험이 메트포르민이나 인슐린보다 열등하여 추천되지 않습니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 영아 저혈당 모니터링이 필요합니다.',
    brands: '유글루콘 정',
  },
  {
    id: '2-4',
    category: '당뇨병',
    name: 'GLP-1 작용제 (-glutide)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 임부 사용 데이터가 없거나 동물실험 독성이 있어 복용 중 피임이 필수이며 임신 전 반드시 중단해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 안전성 미확립으로 금기입니다.',
    brands: '삭센다, 위고비, 트루리시티',
  },
  {
    id: '2-5',
    category: '당뇨병',
    name: 'SGLT-2 억제제 계열 (Gliflozins / Flozins)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 생식 및 신장 독성 우려가 있어 복용 중 피임이 필수이며 임신 전 반드시 중단해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 신장 발달 위험으로 금기입니다.',
    brands: '포시가, 자디앙, 슈글렛',
  },
  {
    id: '2-6',
    category: '당뇨병',
    name: 'DPP-4 억제제 (-gliptin)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 동물실험 독성 등으로 인해 복용 중 피임이 필수이며 임신 전 반드시 중단해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기입니다.',
    brands: '자누비아, 트라젠타, 가브스',
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
    brands: '오메가-3 건강기능식품 및 의약품류',
  },
  {
    id: '2-8',
    category: '이상지질혈증',
    name: '스타틴 계열 (Simvastatin / Atorvastatin / Pitavastatin / Rosuvastatin / Pravastatin)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 콜레스테롤은 태아 발달에 필수적이므로 계획 임신 최소 6~12주 전 중단이 필수입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 금기입니다.',
    brands: '리피토, 크레스토, 조코',
  },
  {
    id: '2-9',
    category: '이상지질혈증',
    name: '피브레이트 계열 (Bezafibrate / Fenofibrate)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 동물실험에서 제3삼분기 태아 축적 위험이 관찰되어 임신 중 금기입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기입니다.',
    brands: '리피딜수프라, 베잘립',
  },
  {
    id: '2-10',
    category: '이상지질혈증',
    name: '기타 지질저하제 (Ezetimibe / Nicotinic acid / Acipimox)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 임부 안전성 데이터 부족 및 기형 발생 우려로 임신 중 투약을 금지합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기입니다.',
    brands: '이지트롤, 니아스파',
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
    brands: '씬지로이드, 씬지록신',
  },
  {
    id: '2-12',
    category: '갑상선',
    name: '리오티로닌 및 건조 갑상선 제제 (Liothyronine / Desiccated Thyroid)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 금지. T3 제제 및 동물 유래 갑상선 제제는 임신 중 생리적 변동이 크고 제어하기 어려워 사용이 금지됩니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 권장되지 않습니다.',
    brands: '테트로닌, 아머타이로이드',
  },
  {
    id: '2-13',
    category: '갑상선',
    name: '프로필티오우라실 (Propylthiouracil)',
    pregnancySafety: 'caution',
    pregnancyNote: '메티마졸보다 기형 빈도와 중증도가 낮아 임신 1삼분기(초기) 항갑상선제 치료 시 우선 권고됩니다. 간독성에 주의하십시오.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 소량 투여 가능합니다.',
    brands: '안티로이드 정',
  },
  {
    id: '2-14',
    category: '갑상선',
    name: '메티마졸 (Methimazole)',
    pregnancySafety: 'caution',
    pregnancyNote: '피부 무형성증, 식도/후비공 폐쇄 등 메티마졸 배아병증 유발 가능성이 있어 1삼분기에는 회피하고, 2삼분기 이후 제한적으로 전환 고려할 수 있습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 최대 20mg까지 비교적 안전합니다.',
    brands: '메티마졸 정',
  },

  // --- 3. 비뇨·생식기계 약물 (MFDS 2025) ---
  // [요로 감염 (Urinary Tract Infection)]
  {
    id: '3-uti-1',
    category: '요로감염',
    name: '페니실린 / 세팔로스포린 (Penicillins / Cephalosporins)',
    pregnancySafety: 'safe',
    pregnancyNote: '베타-락탐 계열. 부작용이 적어 임산부 무증상 세균뇨 치료 및 요로 감염 시 우선 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전하게 사용.',
    brands: '아목시실린, 세파클러',
  },
  {
    id: '3-uti-2',
    category: '요로감염',
    name: '포스포마이신 (Fosfomycin)',
    pregnancySafety: 'safe',
    pregnancyNote: '기타 안전한 항생제로 방광염 1차 요법으로 매우 안전하게 권고됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전.',
    brands: '모누롤',
  },
  {
    id: '3-uti-3',
    category: '요로감염',
    name: '니트로푸란토인 (Nitrofurantoin)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 주의 및 금기. 제1삼분기에 구개열 위험으로 금기이며, 신생아 용혈성 빈혈 위험으로 분만 임박 시점 및 분만 시 사용 금지입니다.',
    lactationSafety: 'caution',
    lactationNote: 'G6PD 결핍 영아 주의.',
    brands: '마크로비드',
  },
  {
    id: '3-uti-4',
    category: '요로감염',
    name: '트리메토프림 / 설파메톡사졸 (Trimethoprim / Sulfamethoxazole)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 제1삼분기 사용을 금하며(엽산 길항제), 대안이 없을 때만 제한적으로 사용합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 영아 황달(Kernicterus) 위험.',
    brands: '셉트린',
  },
  {
    id: '3-uti-5',
    category: '요로감염',
    name: '아미노글리코사이드 계열 (Aminoglycosides)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 젠타마이신, 아미카신 등 장기간 노출 시 태아 이독성(청력 손상) 유발 가능성으로 금기입니다.',
    lactationSafety: 'caution',
    lactationNote: '위장관 흡수는 적음.',
    brands: '겐타마이신 주사제 등',
  },
  {
    id: '3-uti-6',
    category: '요로감염',
    name: '플루오로퀴놀론 계열 (Fluoroquinolones)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 레보플록사신, 시프로플록사신 등 동물실험 연골 형성 방해 관찰로 임신 중 사용하지 않습니다.',
    lactationSafety: 'avoid',
    lactationNote: '영아 관절 발달 장애 우려.',
    brands: '크라비트, 씨프로바이',
  },

  // [질염 (Vaginitis)]
  {
    id: '3-vag-2',
    category: '질염',
    name: '국소용 아졸계 항진균제 (Clotrimazole / Nystatin)',
    pregnancySafety: 'safe',
    pregnancyNote: '칸디다 질염 치료 시 국소용 제제인 클로트리마졸 질정이나 니스타틴이 우선적으로 안전하게 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 사용 안전.',
    brands: '카네스텐 질정',
  },
  {
    id: '3-vag-1',
    category: '질염',
    name: '메트로니다졸 / 클린다마이신 / 티니다졸 (Metronidazole / Clindamycin / Tinidazole)',
    pregnancySafety: 'caution',
    pregnancyNote: '세균성 및 트리코모나스 질염 치료 시 경구 및 질 내 국소요법으로 사용합니다. (단, 메트로니다졸과 티니다졸은 태반 장벽을 통과하므로 임신 3개월 이내에는 투여를 피합니다.)',
    lactationSafety: 'caution',
    lactationNote: '단회 고용량 투여 후 수유 일시 중단 권장.',
    brands: '후라시닐, 크레오신, 파시진',
  },
  {
    id: '3-vag-3',
    category: '질염',
    name: '플루코나졸 경구제 (Fluconazole Oral)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 경구용(먹는 약) 복용 시 유산 및 선천 기형 유발 위험이 커 제1삼분기에는 절대 피해야 합니다.',
    lactationSafety: 'caution',
    lactationNote: '단회 요법은 수유부에게 비교적 안전 평가.',
    brands: '디푸루칸 캡슐',
  },
  {
    id: '3-vag-4',
    category: '질염',
    name: '포비돈 요오드 (Povidone iodine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 질 점막 투여 시 전신 흡수되어 태아 갑상선 요오드 농도를 높이므로 임신 중 질염 치료 목적으로 절대 사용 금지입니다.',
    lactationSafety: 'avoid',
    lactationNote: '영아 갑상선 기능 억제.',
    brands: '지노베타딘',
  },

  // [치질 (Hemorrhoids)]
  {
    id: '3-hem-1',
    category: '치질',
    name: '락툴로오스 / 팽창성 완하제 (Lactulose / Bulk-forming laxatives)',
    pregnancySafety: 'safe',
    pregnancyNote: '치질 완화 시 전신 흡수가 되지 않아 임신 중 선호되는 약물입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유부에게 매우 안전.',
    brands: '듀파락 시럽, 아기오 과립',
  },

  // [피임 (Contraception)]
  {
    id: '3-con-1',
    category: '피임',
    name: '복합 경구피임약 (Oral Contraceptives)',
    pregnancySafety: 'caution',
    pregnancyNote: '임신 확인 전 부주의로 복용 시 선천 기형을 유발하진 않으나, 지속적인 호르몬 노출은 예기치 못한 위험이 있으므로 임신 확인 직후 투여를 중지해야 합니다.',
    lactationSafety: 'caution',
    lactationNote: '에스트로겐이 유량 감소 유발.',
    brands: '머시론, 야즈, 미니보라',
  },

  // [난임 (Infertility)]
  {
    id: '3-inf-1',
    category: '난임',
    name: '클로미펜 (Clomifene)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 불가. 배란유도제로 태아독성 및 기형 발생이 알려져 있으므로 임신 확인 직후 즉시 중단해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '클로미펜정',
  },
  {
    id: '3-inf-2',
    category: '난임',
    name: '레트로졸 (Letrozole)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 불가. 자연유산 및 기형아 보고가 있어 임신 확인 직후 즉시 중단합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 불가.',
    brands: '페마라',
  },
  {
    id: '3-inf-3',
    category: '난임',
    name: '보조생식술 유도제 (Gonadotropin / GnRH Agonists / GnRH Antagonists)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 착상 전·후 유산 및 배·태아독성이 있어 금기입니다. 단, 고세렐린과 류프로렐린은 항암 목적일 때만 위해성 평가 후에 사용됩니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '고날에프, 데카펩틸',
  },
  {
    id: '3-inf-4',
    category: '난임',
    name: '자궁내막증/난임 관련 호르몬제 (Progestogens / 복합 경구피임제)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 임신 확인 이후 난임 과정에서 투여되던 약물(안전 목적 외의 고용량 호르몬 요법)은 치료 중단을 통한 태아 독성 억제가 권고됩니다.',
    lactationSafety: 'avoid',
    lactationNote: '질환에 따라 개별 평가.',
    brands: '비잔 정 등',
  },

  // [조산 (Premature birth)]
  {
    id: '3-pre-1',
    category: '조산',
    name: '프로게스테론 (Progesterone)',
    pregnancySafety: 'safe',
    pregnancyNote: '유산 및 조산 치료를 위해 보충 요법으로 자궁수축 억제 목적으로 안전하게 사용됩니다.',
    lactationSafety: 'caution',
    lactationNote: '전문가 상담 필요.',
    brands: '유트로게스탄, 크리논 겔',
  },
  {
    id: '3-pre-3',
    category: '조산',
    name: '니페디핀 / 아토시반 (Nifedipine / Atosiban)',
    pregnancySafety: 'safe',
    pregnancyNote: '자궁수축억제제. 부작용이 적고 신생아 중증 이환율을 낮춰 조기진통(24~33주) 억제에 효과적으로 사용됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유부에게 안전.',
    brands: '트랙토실 주사, 아달라트',
  },
  {
    id: '3-pre-4',
    category: '조산',
    name: '전신 스테로이드 (Systemic Corticosteroids)',
    pregnancySafety: 'safe',
    pregnancyNote: '이른 조산 시 태아 폐 성숙 시간을 48시간 이상 벌기 위해 산모에게 투여됩니다.',
    lactationSafety: 'safe',
    lactationNote: '단기투여 수유 안전.',
    brands: '덱사메타손 주사 등',
  },
  {
    id: '3-pre-2',
    category: '조산',
    name: '황산마그네슘 (Magnesium sulfate)',
    pregnancySafety: 'caution',
    pregnancyNote: '자궁수축 억제, 경련 예방, 태아 뇌 발달 촉진 목적으로 단기 사용. 단 고농도 장기 사용 시 폐부종, 호흡 억제 우려로 모니터링 필수입니다.',
    lactationSafety: 'safe',
    lactationNote: '정맥투여 시 비교적 안전.',
    brands: '황산마그네슘 주사제',
  },
  {
    id: '3-pre-5',
    category: '조산',
    name: '리토드린 경구제 (Ritodrine Oral)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 산모/태아 심혈관계 심각한 부작용을 유발하여 경구제는 단종 추세 및 조기 진통 억제제 목적으로 금기되었습니다. (주사제만 제한적으로 사용).',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 불가.',
    brands: '라보파 정',
  },

  // [남성호르몬 작용제 (Androgenic agents)]
  {
    id: '3-and-1',
    category: '남성호르몬제',
    name: '테스토스테론 (Testosterone)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 여성 태아의 남성화 및 외부 생식기 비정상 발달을 유발하므로 투여 금기입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '네비도, 안드로겔',
  },
  {
    id: '3-and-2',
    category: '남성호르몬제',
    name: '피나스테리드 / 두타스테리드 (Finasteride / Dutasteride)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기(접촉 주의). 남성형 탈모약 5α-환원효소 억제제. 가루가 날리거나 캡슐이 터져 임부의 피부에 닿기만 해도 피부로 흡수되어 남성 기형을 유발하므로 만진 즉시 세척해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '프로페시아, 아보다트',
  },

  // --- 5. 소화기계 약물 (MFDS 2025) ---
  {
    id: '5-1-1',
    category: '입덧',
    name: '피리독신 (Pyridoxine, Vit B6) / 생강 (Ginger)',
    pregnancySafety: 'safe',
    pregnancyNote: '식이 및 보충제(초기 완화). 메스꺼움 감소에 효과적이며, 태아 발달 장애와 관련이 없는 것으로 확립된 안전한 성분입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '단일제 및 건강기능식품',
  },
  {
    id: '5-1-2',
    category: '입덧',
    name: '독실아민 숙신산염 + 피리독신 염산염 (Doxylamine succinate + Pyridoxine hydrochloride)',
    pregnancySafety: 'safe',
    pregnancyNote: '1차 치료 복합제(가장 권장됨). FDA 승인을 받은 임부 입덧 전문 치료제로 기형이나 유산 위험을 증가시키지 않습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 영아 졸음 유발 가능성으로 권장되지 않음.',
    brands: '디클렉틴, 아미렉틴 등',
  },
  {
    id: '5-1-6',
    category: '입덧',
    name: '독실아민 (Doxylamine)',
    pregnancySafety: 'safe',
    pregnancyNote: '항히스타민제 성분. 단일제로도 입덧 완화에 사용되며 오랫동안 사용되어 안전성이 확립되었습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 영아 진정 작용 우려.',
    brands: '단일제 등',
  },
  {
    id: '5-1-3',
    category: '입덧',
    name: '디멘히드리네이트 (Dimenhydrinate)',
    pregnancySafety: 'caution',
    pregnancyNote: '1세대 항히스타민제. 오심/구토 동반 시 사용 가능하나, 고용량 투여 시 자궁 수축을 자극할 가능성이 있습니다.',
    lactationSafety: 'caution',
    lactationNote: '단기 사용 고려.',
    brands: '드라마민 등',
  },
  {
    id: '5-1-4',
    category: '입덧',
    name: '메토클로프라마이드 / 클로르프로마진 (Metoclopramide / Chlorpromazine)',
    pregnancySafety: 'caution',
    pregnancyNote: '도파민 수용체 길항제 계열. 기형 독성은 없으나 산모의 근긴장이상반응 및 후기 투여 시 신생아 일시적 운동장애 위험이 있습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '맥페란 등',
  },
  {
    id: '5-1-5',
    category: '입덧',
    name: '온단세트론 (Ondansetron)',
    pregnancySafety: 'caution',
    pregnancyNote: '세로토닌 수용체 길항제. 안전성 미확립 (DUR 2등급). 임신 초기에는 특히 신중. 기타 항구토제 실패 시 치료상의 유익성이 위해성을 상회할 경우에만 전문가 판단 하 투여 고려.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 상담 필수.',
    brands: '조프란 등',
  },
  {
    id: '5-2-0',
    category: '속쓰림',
    name: '생활 습관 교정 (Lifestyle Modification)',
    pregnancySafety: 'safe',
    pregnancyNote: '1차 치료 방법. 베개 높게 베기, 취침 전 식사 금지, 자극적인 음식 피하기, 왼쪽으로 눕기 등으로 대부분 완화됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중에도 권장되는 기본 습관입니다.',
    brands: '비약물요법',
  },
  {
    id: '5-2-1',
    category: '속쓰림',
    name: '탄산칼슘 / 수산화마그네슘 (Calcium Carbonate / Magnesium Hydroxide)',
    pregnancySafety: 'safe',
    pregnancyNote: '대표적인 제산제 성분. 전신 흡수가 적어 임신 중 속쓰림에 1차적으로 안전하게 사용 가능합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '텀즈, 알마겔, 노루모 등',
  },
  {
    id: '5-2-1-1',
    category: '속쓰림',
    name: '복합 제산제 (Complex Antacids - Norumo)',
    pregnancySafety: 'safe',
    pregnancyNote: '수산화마그네슘, 침강탄산칼슘 등의 성분으로 구성된 제산제입니다. 전신 흡수량이 적어 임신 중 증상 완화에 안전하게 사용 가능합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '노루모, 알마겔 등',
  },
  {
    id: '5-2-13',
    category: '소화불량',
    name: '시메티콘 (Simethicone)',
    pregnancySafety: 'caution',
    pregnancyNote: '가스 제거제. 체내에 흡수되지 않아 물리적으로는 안전한 것으로 알려져 있으나, FDA 등급상 C군으로 분류되며 인간 대상 임상 데이터가 부족합니다. 증상이 심할 때 전문가 상담 후 단기 사용을 권장합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '가스앤프리, 훼스탈(일부) 등',
  },
  {
    id: '5-2-14',
    category: '소화기',
    name: '까스활명수-유 (Kkas-Hwalmyeongsu-U)',
    pregnancySafety: 'caution',
    pregnancyNote: '임산부를 위해 자궁 수축 위험 성분인 "현호색"을 제외한 제품입니다. 기존 활명수보다 훨씬 안전하지만, 자극적인 생약 성분이 포함되어 있으므로 꼭 필요한 경우에만 복용을 권장합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전하게 사용 가능.',
    brands: '까스활명수-유 (현호색 미함유)',
  },
  {
    id: '5-2-2',
    category: '속쓰림',
    name: '알긴산나트륨 (Sodium Alginate)',
    pregnancySafety: 'safe',
    pregnancyNote: '위 점막을 보호하고 역류를 물리적으로 차단합니다. 임신 중 역류성 식도염 증상 완화에 안전합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '개비스콘 등',
  },
  {
    id: '5-2-3',
    category: '속쓰림',
    name: '수크랄페이트 (Sucralfate)',
    pregnancySafety: 'safe',
    pregnancyNote: '위점막 보호제. 전신 흡수가 거의 없어 임시 중 궤양 및 식도염 치료에 안전하게 사용됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '아루사루민 등',
  },
  {
    id: '5-2-4',
    category: '속쓰림',
    name: '파모티딘 (Famotidine)',
    pregnancySafety: 'safe',
    pregnancyNote: 'H2 수용체 길항제. 위산 분비를 억제하며 임신 중 비교적 넓은 안전성 데이터가 확보되어 있습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전하게 사용 가능.',
    brands: '가스터 등',
  },
  {
    id: '5-2-5',
    category: '속쓰림',
    name: '시메티딘 (Cimetidine)',
    pregnancySafety: 'caution',
    pregnancyNote: 'H2 수용체 길항제. 사용 가능하나 태아에게 항안드로겐 효과(남성호르몬 억제) 가능성이 보고된 바 있어 주의가 필요합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전.',
    brands: '타가메트 등',
  },
  {
    id: '5-2-6',
    category: '속쓰림',
    name: '오메프라졸 (Omeprazole)',
    pregnancySafety: 'caution',
    pregnancyNote: '프로톤 펌프 억제제(PPIs). 기형 위험은 낮으나 고용량 투여 시 태아 성장을 방해할 수 있어 다른 제산제로 조절되지 않을 때만 신중히 사용합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 주의 및 상담.',
    brands: '오메드 등',
  },
  {
    id: '5-2-7',
    category: '속쓰림',
    name: '테고프라잔 / 펙수프라잔 (Tegoprazan / Fexuprazan)',
    pregnancySafety: 'avoid',
    pregnancyNote: '최신 위산 분비 억제제. 임부에 대한 안전성 연구 데이터가 매우 부족하여 임신 중 사용을 권장하지 않습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 안전성 미확립.',
    brands: '케이캡, 펙수클루 등',
  },
  {
    id: '5-2-9',
    category: '속쓰림',
    name: '탄산수소나트륨 제산제 (Sodium Bicarbonate)',
    pregnancySafety: 'avoid',
    pregnancyNote: '고나트륨 제산제. 나트륨 함량이 높아 임산부의 부종(부기)을 악화시킬 수 있으며 모체 및 태아의 전해질 불균형을 유발할 수 있습니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 주의.',
    brands: '일부 액상 제산제 등',
  },
  {
    id: '5-2-8',
    category: '소화불량',
    name: '액상 소화제 (Liquid Digestants)',
    pregnancySafety: 'avoid',
    pregnancyNote: '일부 생약 성분 포함. 현호색(Corydalis tuber) 등의 성분은 자궁 수축을 유발할 우려가 있어 임산부 복용이 금지되어 있습니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 투여.',
    brands: '까스활명수, 베나치오 등',
  },
  {
    id: '5-2-10',
    category: '소화불량',
    name: 'UDCA 포함 복합 소화제 (UDCA Complex)',
    pregnancySafety: 'avoid',
    pregnancyNote: '간 기능 개선 성분(UDCA) 포함. 임신 초기(1삼분기)에 사용이 금기되어 있으므로 구매 시 반드시 성분 확인이 필요합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 상담.',
    brands: '우루사(복합), 일부 소화제 등',
  },
  {
    id: '5-2-11',
    category: '속쓰림',
    name: '헬리코박터 제균 치료 (H.pylori Treatment)',
    pregnancySafety: 'avoid',
    pregnancyNote: '제균 약물의 안전성이 확립되지 않았습니다. 응급 상황이 아니므로 치료는 출산 이후로 미루는 것이 권장됩니다.',
    lactationSafety: 'caution',
    lactationNote: '출산 및 수유 상태에 따라 조율 필요.',
    brands: '항생제 복합요법',
  },
  {
    id: '5-2-12',
    category: '소화기',
    name: '현호색 (Corydalis Tuber)',
    pregnancySafety: 'avoid',
    pregnancyNote: '절대 금기. 자궁 수축을 유발하여 유산 위험을 높일 수 있는 생약 성분입니다. 액상 소화제(까스활명수-유 제외 제품) 구매 시 함유 여부를 반드시 확인해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 안전성 미확립.',
    brands: '각종 액상 소화제 성분',
  },
  {
    id: '5-3',
    category: '변비',
    name: '차전자피 / 폴리카르보필 (Psyllium husk / Polycarbophil)',
    pregnancySafety: 'safe',
    pregnancyNote: '1차 치료제. 장내에서 수분을 흡수해 부피를 키워 연동운동을 촉진함. 차전자 피 및 폴리카르보필 성분은 전신 흡수되지 않아 안전합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전.',
    brands: '무타실, 실콘, 아기오 등',
  },
  {
    id: '5-4',
    category: '변비',
    name: '락툴로오스 / 락티톨 / 폴리에틸렌글리콜 (Lactulose / Lactitol / Polyethylene glycol, PEG)',
    pregnancySafety: 'safe',
    pregnancyNote: '2차 치료제. 삼투성 완하제 성분들은 전신 흡수가 되지 않아 기형 위험이 없으며 장기 복용에도 비교적 안전합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 사용 가능.',
    brands: '듀파락, 폴락스, 이지엔6 등',
  },
  {
    id: '5-5',
    category: '변비',
    name: '수산화마그네슘 / 황산마그네슘 (Magnesium hydroxide / Magnesium sulfate)',
    pregnancySafety: 'caution',
    pregnancyNote: '삼투성 완하제. 태반을 통과하며 전해질 이상 초래 가능성이 있어 1차 치료(팽창성) 실패 시 전문가 상담 후 단기 사용을 권장합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유기 사용 안전.',
    brands: '마그밀 등',
  },
  {
    id: '5-6',
    category: '변비',
    name: '도큐세이트 나트륨 (Docusate Sodium)',
    pregnancySafety: 'caution',
    pregnancyNote: '연화성 완하제. 단기 사용은 안전하나 장기 투여 시 태아 영향에 대한 연구가 충분하지 않아 다른 안전한 하제를 우선 고려합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '둘코락스(복합 성분) 등',
  },
  {
    id: '5-7',
    category: '변비',
    name: '비사코딜 / 센나 (Bisacodyl / Senna)',
    pregnancySafety: 'avoid',
    pregnancyNote: '자극성 완하제 계열. 전해질 불균형 위험 및 센나(안트라퀴논 유도체)의 자궁수축 유발 가능성이 보고되어 있어 임신 중 사용을 피해야 합니다.',
    lactationSafety: 'caution',
    lactationNote: '모유를 통해 영아 설사 유발 가능성.',
    brands: '둘코락스, 아락실 등',
  },
  {
    id: '5-8',
    category: '변비',
    name: '프루칼로프라이드 (Prucalopride)',
    pregnancySafety: 'avoid',
    pregnancyNote: '세로토닌 수용체 작용제 계열. 최신 약물로 임부 안전성 데이터가 매우 부족하여 임신 중 투여가 금지됩니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '레졸로 등',
  },
  {
    id: '5-9-1',
    category: '설사',
    name: '로페라마이드 (Loperamide)',
    pregnancySafety: 'caution',
    pregnancyNote: '장 운동 억제제(지사제). 치료의 실익이 클 때만 단기간 사용하십시오. 임신 초기 노출 시 기형 위험에 대한 명확한 데이터가 부족합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 영아 변비 유발 가능성.',
    brands: '로프민 등',
  },
  {
    id: '5-9-2',
    category: '설사',
    name: '라모세트론 (Ramosetron)',
    pregnancySafety: 'caution',
    pregnancyNote: '설사형 과민성 대장증후군 치료제. 임부에 대한 임상 데이터가 매우 부족하여 투약 시 전문가의 면밀한 유익성 평가가 필요합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 안전성 미확립.',
    brands: '이리보 등',
  },
  {
    id: '5-10',
    category: '소화불량',
    name: '소화효소제 / 위장관조절제 (Digestive Enzymes / GI Regulators)',
    pregnancySafety: 'caution',
    pregnancyNote: '트리메부틴 위장관 조절제는 임신 중 안전성 데이터 부족으로 신중 투여 권고.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 사용 시 전문가 상담.',
    brands: '포리부틴 등',
  },

  // --- 6. 신경·정신계 약물 (MFDS 2025) ---
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
    id: '6-bp-6',
    category: '양극성장애',
    name: '라모트리징 (Lamotrigine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '안전성 미확립. 1삼분기 구개열 위험 보고 있음. 양극성장애 조절 필요성 대비 태아 위험을 신중히 평가. 가능하면 임신 전 약물 계획 수립 필수. (뇌전증 치료와는 별도 평가)',
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
    brands: '클로자릴, 자이프렉사, 쎄로켈, 인베가 등',
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

  // [뇌전증 (Epilepsy) 치료제]
  {
    id: '6-ep-1',
    category: '뇌전증',
    name: '라모트리진 / 레베티라세탐 (Lamotrigine / Levetiracetam)',
    pregnancySafety: 'safe',
    pregnancyNote: '상대적 저위험군 약물로, 뇌전증 발작 억제를 위해 강력히 권장됩니다. 임신 중 신장 청소율 증가로 잦은 혈중농도 측정과 용량 조절이 필수입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전.',
    brands: '라믹탈, 케프라',
  },
  {
    id: '6-ep-2',
    category: '뇌전증',
    name: '페노바르비탈 / 토피라메이트 (Phenobarbital / Topiramate)',
    pregnancySafety: 'caution',
    pregnancyNote: '중간 위험군. 구순구개열 등 발생 위험이 2~20%로 증가하므로 다른 약으로 조절되지 않을 경우에만 신중히 유지합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 신생아 진정 주의.',
    brands: '페노바르비탈정, 토파맥스',
  },
  {
    id: '6-ep-3',
    category: '뇌전증',
    name: '카르바마제핀 / 페니토인 / 바르비투르산 (Carbamazepine / Phenytoin / Barbiturates)',
    pregnancySafety: 'avoid',
    pregnancyNote: '고위험 주의 약물. 심장 기형 및 태아히단토인증후군을 유발할 우려가 있어 위험성 및 유익성을 면밀히 따져야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 주의 요망.',
    brands: '테그레톨, 페니토인 정',
  },
  {
    id: '6-ep-4',
    category: '뇌전증',
    name: '발프로에이트 (Valproate)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 기피 약물. 주요 기형(신경관 결손, 발달장애 등) 발생률이 7~10% 이상으로 가장 높아 최후의 수단으로만 고려해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 절대 금기.',
    brands: '데파킨, 올트릴',
  },
  {
    id: '6-ep-5',
    category: '뇌전증',
    name: '고용량 엽산 (High-dose Folic Acid 4~5mg)',
    pregnancySafety: 'safe',
    pregnancyNote: '보조 요법. 뇌전증 약물이 엽산 대사를 방해하여 신경관 결손을 유발하므로, 임부 권장량(0.4mg)보다 높은 4~5mg 복용이 강력히 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중에도 권장됩니다.',
    brands: '일반 의약품 엽산제제',
  },

  // [편두통 (Migraine) 치료제]
  {
    id: '6-mg-1',
    category: '편두통',
    name: '아세트아미노펜 (Acetaminophen)',
    pregnancySafety: 'safe',
    pregnancyNote: '1차 급성기(발작 완화) 치료. 최단 기간, 최소 용량 사용이 우선 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전.',
    brands: '타이레놀',
  },
  {
    id: '6-mg-5',
    category: '편두통',
    name: '메클리진 / 디펜히드라민 (Meclizine / Diphenhydramine)',
    pregnancySafety: 'safe',
    pregnancyNote: '구역/구토 완화 보조제 중 1차/우선 권장 (멀미에도 우선 사용). 기형 위험 증가 보고가 없습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 단기 사용.',
    brands: '디멘히드리네이트 제제',
  },
  {
    id: '6-mg-2',
    category: '편두통',
    name: '아스피린 / 나프록센 / 이부프로펜 / 디클로페낙 / 케토롤락 (Aspirin / Naproxen / Ibuprofen / Diclofenac / Ketorolac)',
    pregnancySafety: 'caution',
    pregnancyNote: '2차 제한적 치료. 임신 20주 이전에만 제한적으로 사용하며, 1삼분기 초반 유산 우려 및 3삼분기 동맥관 조기폐쇄 위험으로 인해 후기 사용은 절대 피해야 합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 단기 사용 가능.',
    brands: '아스피린, 탁센, 부루펜, 디클로페낙',
  },
  {
    id: '6-mg-4',
    category: '편두통',
    name: '수마트립탄 (Sumatriptan)',
    pregnancySafety: 'caution',
    pregnancyNote: '3차 최후 수단. 자궁-태반 혈관 수축 우려가 있으나 기형 증가 보고는 없어 제한적으로 조심스럽게 사용해볼 수 있습니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 후 12시간 텀 권장.',
    brands: '이미그란 정',
  },
  {
    id: '6-mg-7',
    category: '편두통',
    name: '마그네슘 경구제 / 프로프라놀롤 / 메토프롤롤 / 삼환계 항우울제 (Oral Magnesium / Propranolol / Metoprolol / Tricyclic Antidepressants)',
    pregnancySafety: 'caution',
    pregnancyNote: '편두통 예방 필요시 신중히 고려할 수 있습니다. 메토프롤롤 등은 분만 2~3일 전 중단이 필수적입니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 주의를 요합니다.',
    brands: '마그밀, 인데놀',
  },
  {
    id: '6-mg-3',
    category: '편두통',
    name: '옥시코돈 / 하이드로모르폰 / 하이드로코돈 / 모르핀 (Oxycodone / Hydromorphone / Hydrocodone / Morphine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '3차 최후 수단 (오피오이드). 신생아 금단 증상 우려가 있어 최단기간, 최소 용량으로만 극히 제한적으로 사용됩니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 영아 호흡저하 유발.',
    brands: '아이알코돈, 딜라디드 정',
  },
  {
    id: '6-mg-6',
    category: '편두통',
    name: '에르고타민 (Ergotamine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 맥각 알칼로이드로 강력한 자궁 수축 및 태아 저산소증/사망을 유발할 수 있습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 모유 억제 및 영아 구토 유발.',
    brands: '크래밍 정',
  },
  {
    id: '6-mg-8',
    category: '편두통',
    name: '디발프로엑스 나트륨 / 토피라메이트 / 발프로에이트 (Divalproex Sodium / Topiramate / Valproate)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기(편두통 예방 목적). 편두통 예방 목적으로 사용되는 뇌전증 약물들은 1삼분기 구순구개열 등 유발하므로 절대 불가합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 안전성 문제.',
    brands: '데파코트, 토파맥스',
  },
  {
    id: '6-mg-9',
    category: '편두통',
    name: 'CGRP 표적치료제 (CGRP Targeted Therapies)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 반감기가 매우 길어 주사 투여 후 5~6개월간 임신을 피해야 하는 약물입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 금지.',
    brands: '앰겔러티, 아조비, 바이엡티',
  },

  // [멀미 (Motion sickness) 치료제]
  {
    id: '6-mot-1',
    category: '멀미',
    name: '메클리진 / 디펜히드라민 (Meclizine / Diphenhydramine)',
    pregnancySafety: 'safe',
    pregnancyNote: '1차 권장. 임산부 입덧에 안전한 항히스타민제로서, 멀미 시에도 가장 우선적으로 안전하게 사용됩니다.',
    lactationSafety: 'safe',
    lactationNote: '안전성 확립됨.',
    brands: '노보민 등',
  },
  {
    id: '6-mot-2',
    category: '멀미',
    name: '스코폴라민 (Scopolamine 패치 등)',
    pregnancySafety: 'caution',
    pregnancyNote: '항콜린제. 멀미 대체제로 고려될 수 있으나, 자간 발작 위험을 높이므로 중증 자간전증 환자는 절대 피해야 합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 유질 감소 우려 및 영아 진정 가능성.',
    brands: '키미테 등',
  },

  // --- 7. 심혈관계 약물 (MFDS 2025) ---
  // [1차 권고 - 가장 안전함]
  {
    id: '7-1-1',
    category: '고혈압',
    name: '라베탈롤 (Labetalol)',
    pregnancySafety: 'safe',
    pregnancyNote: '임신 중 고혈압 1차 선택제. 자궁 태반 혈류 유지 이점이 있어 가장 선호됩니다. (경구용은 희귀의약품)',
    lactationSafety: 'safe',
    lactationNote: '수유 중 사용 가능.',
    brands: '라베신 주사, 일부 희귀의약품 경구제',
  },
  {
    id: '7-1-3',
    category: '고혈압',
    name: '니페디핀 (Nifedipine)',
    pregnancySafety: 'safe',
    pregnancyNote: '고혈압 및 조산 예방 1차 선택제. 응급 시 속효성, 이외에는 중간/지속 방출형 제제를 선호합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '아달라트, 니페디핀 정',
  },
  {
    id: '7-1-4',
    category: '고혈압',
    name: '니트로글리세린 (Nitroglycerin)',
    pregnancySafety: 'safe',
    pregnancyNote: '응급 고혈압 치료제. 응급 상황 시 정맥주사로 고려됩니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 상담.',
    brands: '니트로글리세린 주사',
  },
  {
    id: '7-2-1',
    category: '부정맥/심부전',
    name: '아데노신 (Adenosine)',
    pregnancySafety: 'safe',
    pregnancyNote: '부정맥(SVT) 응급 치료 1차 선택제. 정맥주사로 투여되며 태아 측 영향이 적어 비교적 안전합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '아데노코 주사',
  },
  {
    id: '7-2-2',
    category: '부정맥/심부전',
    name: '디고신 (Digoxin)',
    pregnancySafety: 'safe',
    pregnancyNote: '부정맥 치료제. 임신 중 가장 널리 사용된 항부정맥제 중 하나로 비교적 안전합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전.',
    brands: '디고신 정',
  },

  // [신중 투여 - 상담 필수]
  {
    id: '7-3-1',
    category: '부정맥/심부전',
    name: '메토프롤롤 (Metoprolol)',
    pregnancySafety: 'caution',
    pregnancyNote: '베타 차단제. 만성 고혈압이나 부정맥 치료에 비교적 선호되나, 분만 전 복용 시 신생아 서맥 등 모니터링이 필요합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전하게 사용 가능.',
    brands: '에이록스, 베타록 정',
  },
  {
    id: '7-3-2',
    category: '부정맥/심부전',
    name: '카르베딜롤 (Carvedilol)',
    pregnancySafety: 'caution',
    pregnancyNote: '베타 차단제. 임신 중 사용 정보가 부족하므로 유익성이 잠재적 위험을 상회할 때만 신중히 사용합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 주의.',
    brands: '딜라트렌 정',
  },
  {
    id: '7-3-3',
    category: '고혈압',
    name: '암로디핀 (Amlodipine)',
    pregnancySafety: 'caution',
    pregnancyNote: '칼슘 채널 차단제. 임신 중 데이터가 제한적입니다. 기존 복용자가 안정적인 경우 전문가 상담 후 유지 여부를 결정합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 상담.',
    brands: '노바스크 정',
  },
  {
    id: '7-3-4',
    category: '부정맥/심부전',
    name: '베라파밀 / 딜티아젬 (Verapamil / Diltiazem)',
    pregnancySafety: 'caution',
    pregnancyNote: '고혈압 및 부정맥 치료제. 사용 사례가 있으나 데이터가 적어 유익성 평가 후 신중 투여합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 주의.',
    brands: '이솝틴, 헤르벤 정',
  },
  {
    id: '7-3-5',
    category: '부정맥/심부전',
    name: '플레카이나이드 / 프로파페논 / 소탈롤 (Flecainide / Propafenone / Sotalol)',
    pregnancySafety: 'caution',
    pregnancyNote: '항부정맥제. 내성 또는 재발성 부정맥 시 전문가의 면밀한 감시 하에 제한적으로 고려합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 투여.',
    brands: '탐보코, 리트모노름, 소타롤 정',
  },
  {
    id: '7-3-6',
    category: '고혈압',
    name: '니트로프루시드 (Nitroprusside)',
    pregnancySafety: 'caution',
    pregnancyNote: '응급 고혈압 치료제. 태아 시안화물 중독 가능성이 있어 다른 약물에 반응 없는 응급 상황 시에만 단기간 사용합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '나이트로프루사이드 주사',
  },

  // [금기 및 제한 - 피해야 함]
  {
    id: '7-4-1',
    category: '부정맥/심부전',
    name: '아테놀롤 (Atenolol)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기 수준. 태반 혈류 감소 및 태아 성장 제한(FGR)을 유발할 수 있어 임신 중 투여를 피해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 과도한 진정 유발 가능.',
    brands: '테노민 정',
  },
  {
    id: '7-4-2',
    category: '부정맥/심부전',
    name: '프로프라놀롤 (Propranolol)',
    pregnancySafety: 'caution',
    pregnancyNote: '베타차단제. 고혈압 치료 1차 선호약물이 아님. 다만 편두통 예방·특정 부정맥 치료 등에서는 전문가 판단 하 고려 가능. 임신 시기와 적응증에 따라 개별화된 유익성-위해성 평가 필수.',
    lactationSafety: 'safe',
    lactationNote: '단기 소량 사용은 가능.',
    brands: '인데놀 정',
  },
  {
    id: '7-4-3',
    category: '이뇨제',
    name: '티아지드 이뇨제 (Hydrochlorothiazide / Indapamide / Chlorthalidone)',
    pregnancySafety: 'avoid',
    pregnancyNote: '히드로클로로티아지드, 인다파미드, 클로르탈리돈 포함. 정상적인 혈장량 증가를 방해하여 임신 중 사용하지 않습니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 유량 감소 주의.',
    brands: '다이크로짇, 후루덱스 정',
  },
  {
    id: '7-4-4',
    category: '이뇨제',
    name: '루프 이뇨제 (Furosemide / Torsemide)',
    pregnancySafety: 'avoid',
    pregnancyNote: '푸로세미드, 토르세미드 포함. 태반 관류 감소를 초래할 수 있어 폐부종 등 응급 상황이 아니면 피해야 합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 판단.',
    brands: '라식스, 토르셈 정',
  },
  {
    id: '7-4-5',
    category: '이뇨제',
    name: '칼륨 보존성 이뇨제 (Amiloride / Spironolactone)',
    pregnancySafety: 'avoid',
    pregnancyNote: '경험 부족 혹은 남성 태아 여성화 위험(스피로노락톤)으로 임신 중 투여를 금지합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '알닥톤 정',
  },
  {
    id: '7-4-6',
    category: '고혈압',
    name: 'ACE 억제제 및 ARB 계열 (Enalapril / Candesartan / Valsartan / Losartan / Olmesartan)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 태아 신장 혈류 방해로 양수과소증, 신부전, 기형, 사망을 초래하는 매우 위험한 약물입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 절대 사용 금물.',
    brands: '레니텍, 아타칸, 디오반 정',
  },
  {
    id: '7-4-7',
    category: '부정맥/심부전',
    name: '아미오다론 (Amiodarone)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 원칙적 금기. 태아 갑상선 기능 이상, 서맥, 성장 제한 위험이 큼. 다른 치료 실패 시 응급 상황에만 최단기간 고려.',
    lactationSafety: 'avoid',
    lactationNote: '모유로 다량 이행되어 영아 갑상선 독성 유발.',
    brands: '코다론 정/주사',
  },
  // --- 8. 피부 질환 약물 (MFDS 2025) ---
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

// --- 9. 항병원성 미생물 및 감염성 질환 (MFDS 2025) ---

  // [1차 권고 - 가장 안전함]
  {
    id: '9-1',
    category: '항생제',
    name: '페니실린 / 암피실린 / 아목시실린 / 설박탐 (Penicillin / Ampicillin / Amoxicillin / Sulbactam)',
    pregnancySafety: 'safe',
    pregnancyNote: '베타-락탐 계열. 태반을 통과하나 기형 유발 작용이 없어 가장 신뢰할 수 있는 1차 항생제입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전.',
    brands: '아목시클, 암피실린 등',
  },
  {
    id: '9-2',
    category: '항생제',
    name: '세파졸린 및 1~3세대 세팔로스포린 (Cefazolin / Cephalosporins)',
    pregnancySafety: 'safe',
    pregnancyNote: '선천 기형 위험이 낮아 제왕절개 예방적 항생제나 각종 감염증에 안전하게 사용됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 사용 가능.',
    brands: '세파졸린 등',
  },
  {
    id: '9-3',
    category: '항생제',
    name: '포스포마이신 (Fosfomycin)',
    pregnancySafety: 'safe',
    pregnancyNote: '요로 감염 등에 사용되는 안전한 항생제입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '모누롤 등',
  },
  {
    id: '9-4',
    category: '결핵/바이러스',
    name: '이소니아지드 / 리팜핀 / 에탐부톨 / 피라진아마이드 (Isoniazid / Rifampin / Ethambutol / Pyrazinamide)',
    pregnancySafety: 'safe',
    pregnancyNote: '1차 항결핵제. 활동성 결핵은 임신 중이라도 즉시 치료해야 하며, 이소니아지드 사용 시 피리독신(Vit B6) 병용이 필수입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전.',
    brands: '유한짓, 리팜핀 등',
  },
  {
    id: '9-5',
    category: '결핵/바이러스',
    name: '아시클로버 / 발라시클로버 (Acyclovir / Valacyclovir)',
    pregnancySafety: 'safe',
    pregnancyNote: '단순포진/대상포진 치료제. 임신 중 사용 경험이 풍부하며 1삼분기 노출 시에도 기형 위험 증가가 확인되지 않았습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전.',
    brands: '조비락스, 발트렉스 등',
  },
  {
    id: '9-6',
    category: '결핵/바이러스',
    name: '오셀타미비르 (Oseltamivir)',
    pregnancySafety: 'safe',
    pregnancyNote: '독감(인플루엔자) 1차 치료제. 합병증 위험 방지를 위해 증상 발현 48시간 이내 신속한 투여가 적극 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 사용 가능.',
    brands: '타미플루 등',
  },
  {
    id: '9-7',
    category: '결핵/바이러스',
    name: '테노포비르 DF / 엠트리시타빈 (Tenofovir DF / Emtricitabine)',
    pregnancySafety: 'safe',
    pregnancyNote: '태보포비르, 엠트리시타빈 성분을 포함한 B형간염 및 HIV 치료제입니다. 수직감염 예방을 위해 매우 중요하며 안전성이 확인되었습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 유지 권장.',
    brands: '비리어드, 트루바다 등',
  },
  {
    id: '9-8',
    category: '백신/진균',
    name: '클로트리마졸 / 니스타틴 국소 외용제 (Clotrimazole / Nystatin Topical)',
    pregnancySafety: 'safe',
    pregnancyNote: '질염/칸디다증용 국소 항진균제. 전신 흡수가 극소량이거나 없어 임신 중 가장 안전한 선택입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '카네스텐 등',
  },
  {
    id: '9-9',
    category: '백신/진균',
    name: '메트로니다졸 / 메플로퀸 / 클로로퀸 (Metronidazole / Mefloquine / Chloroquine)',
    pregnancySafety: 'safe',
    pregnancyNote: '항원충제 및 말라리아 치료제. 메타분석 결과 1삼분기 사용 시에도 기형 위험 증가가 관찰되지 않았습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 사용 가능.',
    brands: '후라시닐, 라리암 등',
  },
  {
    id: '9-10',
    category: '백신/진균',
    name: '불활성 백신 - 독감 / Tdap / 코로나 mRNA (Inactivated Influenza / Tdap / COVID-19 mRNA Vaccine)',
    pregnancySafety: 'safe',
    pregnancyNote: '임신 주수 상관없이 적극 권장. Tdap은 27~36주 사이 접종 시 신생아 보호 효과가 극대화됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전.',
    brands: '다양함',
  },

  // [신중 투여 - 상담 필수]
  {
    id: '9-11',
    category: '항생제',
    name: '아목시실린+클라불란산 (Amoxicillin / Clavulanic acid)',
    pregnancySafety: 'caution',
    pregnancyNote: '37주 이전 조기양막파열 임부 투여 시 신생아 괴사성 장염(NEC) 위험이 소폭 증가할 수 있어 유익성 평가 후 사용합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '아목시클 등',
  },
  {
    id: '9-12',
    category: '항생제',
    name: '마크롤라이드계 - 아지스로마이신 / 클래리스로마이신 / 에리스로마이신 (Azithromycin / Clarithromycin / Erythromycin)',
    pregnancySafety: 'caution',
    pregnancyNote: '역학 연구가 상반되어 기관형성기 이후 제한적 사용 권고. 유산 또는 심혈관계 이상 관련 보고가 있어 전문가 상담이 필요합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 투여.',
    brands: '지스로맥스, 클래리시드 등',
  },
  {
    id: '9-13',
    category: '항생제',
    name: '아미노글리코사이드 계열 (Gentamicin / Amikacin / Tobramycin / Neomycin)',
    pregnancySafety: 'caution',
    pregnancyNote: '태아 청신경 손상 우려로 신중해야 하나, 심내막염/패혈증 등 응급 시 혈중 농도 모니터링 하에 병용 가능합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 판단.',
    brands: '겐타마이신 등',
  },
  {
    id: '9-14',
    category: '결핵/바이러스',
    name: '2차 항결핵제 (Prothionamide / Clofazimine / Cycloserine / Bedaquiline)',
    pregnancySafety: 'caution',
    pregnancyNote: '안전성 데이터가 부족하거나 태아 성장 지연/착색 보고가 있어 다제내성 결핵 등 특수 상황에서만 제한적으로 고려합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 안전성 불확실.',
    brands: '프토아미드 등',
  },
  {
    id: '9-15',
    category: '결핵/바이러스',
    name: '기타 항바이러스제 - 렘데시비르 / 니르마르트렐비르+리토나비르 (Remdesivir / Nirmatrelvir+Ritonavir)',
    pregnancySafety: 'caution',
    pregnancyNote: '코로나19 치료제. 임상 데이터는 제한적이나 중증 고위험 임부에게 유익성이 크다고 판단될 경우 신중히 사용합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 판단.',
    brands: '베클루리, 팍스로비드 등',
  },
  {
    id: '9-16',
    category: '백신/진균',
    name: '암포테리신 B / 에키노칸딘 (Amphotericin B / Echinocandins)',
    pregnancySafety: 'caution',
    pregnancyNote: '생명을 위협하는 전신 진균 감염 시에만 사용. 태반 통과 및 골격 변화 우려가 있어 정밀한 유익성 평가가 필요합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 주의.',
    brands: '암비솜 등',
  },

  // [금기 및 제한 - 피해야 함]
  {
    id: '9-17',
    category: '항생제',
    name: '독시사이클린 / 테트라사이클린 (Doxycycline / Tetracyclines)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 태아 뼈 성장 억제 및 영구적 치아 변색(황-회-갈색)을 초래하며, 임부 간 독성 가능성이 있습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 금지.',
    brands: '바이브라마이신 등',
  },
  {
    id: '9-18',
    category: '항생제',
    name: '플루오로퀴놀론 계열 (Ciprofloxacin / Levofloxacin / Ofloxacin / Moxifloxacin)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 원칙적 금기. 태아 연골 형성을 방해 및 손상시킬 수 있어 사용을 삼가야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 권장되지 않음.',
    brands: '사이프로바이, 레보플록사신 등',
  },
  {
    id: '9-19',
    category: '항생제',
    name: '설포나마이드 / 클로람페니콜 (Sulfonamides / Chloramphenicol)',
    pregnancySafety: 'avoid',
    pregnancyNote: '3삼분기 노출 시 핵황달 및 회색아 증후군(Gray baby syndrome) 등 심각한 대사 합병증 유발 가능.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '박트림 등',
  },
  {
    id: '9-20',
    category: '결핵/바이러스',
    name: '페길화 인터페론 알파 (PEG-IFN-α)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. B형간염 등에 사용되나 유산 및 기형 발생 가능성으로 임부 금기 성분입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '페가시스 등',
  },
  {
    id: '9-21',
    category: '백신/진균',
    name: '경구용 아졸계 항진균제 (Oral Fluconazole / Itraconazole)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 경구 투여 금기. 1삼분기 고용량 노출 시 비정상적 얼굴, 심장병 등 기형 및 유산 위험이 있습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 피해야 함.',
    brands: '디푸루칸 등',
  },
  {
    id: '9-22',
    category: '백신/진균',
    name: '프리마퀸 (Primaquine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 태아 용혈성 빈혈 유발 및 유전자 변이 위험으로 출산 후로 투여를 미룹니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '프리마퀸 등',
  },
  {
    id: '9-23',
    category: '백신/진균',
    name: '생백신 - MMR / 수두 / 대상포진 / 독감 생백신 (MMR / Varicella / Zoster / Live Influenza Vaccine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 태아 감염 우려가 있는 생체 바이러스 백신입니다. 접종 후 4주간 피임이 필수적입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중에는 대체로 가능하나 전문가 상의.',
    brands: '다양함',
  },

  // --- 10. 호흡기 질환 - 감기 및 천식 (MFDS 2025) ---
  // [1차 권고 - 가장 안전함]
  {
    id: '10-2-inh',
    category: '천식',
    name: '부데소나이드 흡입제 (Inhaled Budesonide)',
    pregnancySafety: 'safe',
    pregnancyNote: '천식 ICS 1차 치료제. 전신 흡수가 적어 가장 안전하며, 산모의 천식 조절을 위해 임신 중 투약을 반드시 지속해야 합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전.',
    brands: '풀미코트 흡입제 등',
  },
  {
    id: '10-11',
    category: '천식',
    name: '살부타몰 / 포르모테롤 / 살메테롤 흡입제 (Salbutamol / Formoterol / Salmeterol)',
    pregnancySafety: 'safe',
    pregnancyNote: '흡입 베타 작용제 계열(SABA/LABA). 증상 완화제 및 조절제로 사용되며 전신 노출이 매우 낮아 안전하게 관리 가능합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전하게 사용 가능.',
    brands: '벤토린, 심비코트, 세레타이드 등',
  },
  {
    id: '10-6',
    category: '천식',
    name: '몬테루카스트 (Montelukast)',
    pregnancySafety: 'safe',
    pregnancyNote: 'LTRAs 성분. 흡입 스테로이드(ICS) 단독으로 조절이 어려울 때 추가하는 보조 요법으로 비교적 안전합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '싱귤레어 등',
  },

  // [신중 투여 - 상담 필수]
  {
    id: '10-12',
    category: '감기',
    name: '덱스트로메토르판 (Dextromethorphan)',
    pregnancySafety: 'caution',
    pregnancyNote: '사람 기형 관련 데이터는 부족하나 동물실험 유해성 보고가 있으므로, 유익성 평가 후 신중히 사용하십시오.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 투여.',
    brands: '메디코프 등',
  },
  {
    id: '10-13',
    category: '천식',
    name: '전신 스테로이드 (Systemic Steroids)',
    pregnancySafety: 'caution',
    pregnancyNote: '천식 급성 악화 시 산모 저산소증 예방을 위해 투여합니다. 다만 조기양막파열 및 자궁내 성장제한 위험이 있어 모니터링이 필요합니다.',
    lactationSafety: 'safe',
    lactationNote: '단기 투여는 수유 중 비교적 안전.',
    brands: '소론도 정/주사 등',
  },
  {
    id: '10-14',
    category: '천식',
    name: '테오필린 (Theophylline)',
    pregnancySafety: 'caution',
    pregnancyNote: '2차 선택제. 태반 통과로 신생아 구토/신경과민 유발 가능. 3분기 자궁 수축 억제 가능성으로 최소량만 사용.',
    lactationSafety: 'caution',
    lactationNote: '영아 과민 유발 가능.',
    brands: '아스콘플 등',
  },

  // [금기 및 제한 - 피해야 함]
  {
    id: '10-15',
    category: '감기',
    name: '코데인 (Codeine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 원칙적 사용 금지. 태반을 통과하며 태아 호흡 억제 우려. 마른기침에만 제한적 단기 사용 고려.',
    lactationSafety: 'avoid',
    lactationNote: '영아 호흡 억제 위험으로 금기.',
    brands: '코태원 등',
  },
  {
    id: '10-16',
    category: '천식',
    name: '에피네프린 (Epinephrine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 일반적 사용 금기. 다만 아나필락시스나 치명적 천식 발작 등 응급 상황 시에는 실익이 커 즉각 투여해야 합니다.',
    lactationSafety: 'caution',
    lactationNote: '응급 상황 시 전문가 판단.',
    brands: '에피펜 등',
  },

  // --- 10.1 알레르기 질환 - 비염 및 두드러기 (MFDS 2025) ---
  // [1차 권고 - 가장 안전함]
  {
    id: '10-1',
    category: '비염',
    name: '세티리진 / 레보세티리진 / 로라타딘 (Cetirizine / Levocetirizine / Loratadine)',
    pregnancySafety: 'safe',
    pregnancyNote: '알레르기 비염 및 두드러기 1차 선택제입니다. 대규모 데이터에서 기형 위험 증가가 없음이 확인되었습니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전하게 사용 가능.',
    brands: '지르텍, 씨잘, 클라리틴 등',
  },
  {
    id: '15-1',
    category: '비염',
    name: '클로르페니라민 (Chlorpheniramine)',
    pregnancySafety: 'safe',
    pregnancyNote: '오랜 기간 사용된 안전한 성분. 다만 졸음 및 진정 작용에 주의하십시오.',
    lactationSafety: 'caution',
    lactationNote: '과량 사용 시 유량 감소 가능성.',
    brands: '코리투살 등',
  },
  {
    id: '10-2-nasal',
    category: '비염',
    name: '부데소나이드 / 시클레소나이드 비강 스프레이 (Budesonide / Ciclesonide Nasal Spray)',
    pregnancySafety: 'safe',
    pregnancyNote: '안전성 데이터가 풍부하고 전신 흡수가 낮아 선호되는 비강 스프레이 국소 제제입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 사용 가능.',
    brands: '풀미코트, 옴나리스 등',
  },
  {
    id: '10-3-nasal',
    category: '비염',
    name: '모메타손 / 플루티카손 비강 스프레이 (Mometasone / Fluticasone Nasal Spray)',
    pregnancySafety: 'safe',
    pregnancyNote: '전신 흡수가 낮아 안전한 편입니다. 비강 스프레이 형태로 안전하게 사용 가능합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '나조넥스, 아바미스 등',
  },
  {
    id: '10-9-nasal',
    category: '비염',
    name: '아젤라스틴 비강 스프레이 (Azelastine Nasal Spray)',
    pregnancySafety: 'safe',
    pregnancyNote: '비강 국소 사용 시 전신 흡수가 적어 안전합니다. 권장량 준수가 중요합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 상담 필요.',
    brands: '아젭틴 등',
  },

  // [신중 투여 - 상담 필수]
  {
    id: '10-10-nasal',
    category: '비염',
    name: '올로파타딘 비강 스프레이 (Olopatadine Nasal Spray)',
    pregnancySafety: 'caution',
    pregnancyNote: '데이터는 부족하나 전신 노출이 적습니다. 전문가 판단 하에 신중히 사용합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 투여.',
    brands: '파타네이즈 등',
  },
  {
    id: '10-5-nasal',
    category: '비염',
    name: '옥시메타졸린 / 자일로메타졸린 비강 스프레이 (Oxymetazoline / Xylometazoline Nasal Spray)',
    pregnancySafety: 'caution',
    pregnancyNote: '비충혈 완화 스프레이. 3일 이상 사용 시 반동성 비염 우려로 단기 사용만 권장합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전.',
    brands: '오트리빈 등',
  },
  {
    id: '10-7',
    category: '두드러기',
    name: '생물학적 제제 (Omalizumab / Dupilumab)',
    pregnancySafety: 'caution',
    pregnancyNote: '태반을 통과하며 데이터가 제한적입니다. 유익성이 클 때 신중히 투여를 결정합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 상담.',
    brands: '졸레어, 듀피젠트 등',
  },
  {
    id: '10-17',
    category: '혈관부종',
    name: '신선 동결혈장 / 이카티반트 (Icatibant)',
    pregnancySafety: 'safe',
    pregnancyNote: '유전성 혈관부종 급성 발작 응급 요법. 응급 시 안전하게 사용 가능합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 상담.',
    brands: '피라지르 등',
  },

  // [금기 및 제한 - 피해야 함]
  {
    id: '10-4',
    category: '비염',
    name: '슈도에페드린 / 페닐에프린 경구제 (Oral Pseudoephedrine / Phenylephrine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 경구용 비충혈 완화제. 혈관 수축 작용으로 인한 태아 결손 가능성으로 사용을 제한합니다.',
    lactationSafety: 'caution',
    lactationNote: '유량 감소 가능성 있음.',
    brands: '슈다페드 등',
  },
  {
    id: '15-2',
    category: '두드러기',
    name: '하이드록시진 (Hydroxyzine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 분만 전 투여 시 신생아 호흡 억제 위험이 있습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '유시락스 등',
  },
  {
    id: '10-8',
    category: '두드러기',
    name: 'JAK 억제제 (JAK Inhibitors)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 태아 발달 위험으로 임부 및 가임기 여성 사용 금기.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '젤잔즈 등',
  },
  {
    id: '10-18',
    category: '혈관부종',
    name: '다나졸 (Danazol)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 태아의 남성화를 유발할 우려가 있습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 금기.',
    brands: '단젠 등',
  },
  // --- 11. 혈액 및 체액 (MFDS 2025) ---
  // [1차 권고 - 가장 안전함]
  {
    id: '11-1-1',
    category: '항응고/혈전',
    name: '저분자량 헤파린 (LMWH - Enoxaparin / Dalteparin / Nadroparin)',
    pregnancySafety: 'safe',
    pregnancyNote: '에녹사파린, 달테파린, 나드로파린 성분입니다. 태반을 통과하지 않아 기형 위험이 없으며 혈전 관리에 가장 우선적으로 권고됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전.',
    brands: '크렉산, 프라그민, 프락시파린 주사',
  },
  {
    id: '11-1-2',
    category: '항응고/혈전',
    name: '미분획화 헤파린 (UFH - Unfractionated heparin)',
    pregnancySafety: 'safe',
    pregnancyNote: '태반 미통과 항응고제. 분만 임박 시 출혈 조절이 용이하여 전환 및 사용이 권장됩니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '헤파린 주사액',
  },
  {
    id: '11-1-3',
    category: '통증/진통',
    name: '저용량 아스피린 (Low-dose Aspirin)',
    pregnancySafety: 'safe',
    pregnancyNote: '항인지질항체 증후군 유산 예방 및 자간전증 예방을 위해 유익하게 사용됩니다.',
    lactationSafety: 'safe',
    lactationNote: '단기/저용량 수유 중 안전.',
    brands: '아스피린프로텍트정 100mg',
  },

  // [신중 투여 - 상담 필수]
  {
    id: '11-3-1',
    category: '항응고/혈전',
    name: '폰다파리눅스 / 아르가트로반 (Fondaparinux / Argatroban)',
    pregnancySafety: 'caution',
    pregnancyNote: 'Xa인자 및 트롬빈 억제제. 헤파린 금기 시에만 전문가 상담 후 대체제로 신중히 고려합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 주의.',
    brands: '아릭스트라 주사, 아르가트로반 주사',
  },
  {
    id: '11-3-2',
    category: '항응고/혈전',
    name: '기타 항혈소판제 (Clopidogrel / Ticagrelor / Prasugrel / Ticlopidine)',
    pregnancySafety: 'caution',
    pregnancyNote: '클로피도그렐, 티카그렐러, 프라수그렐, 티클로피딘 포함. 안전성 미확립이나 심근경색 등 응급 시 유익성이 클 때 투여합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 판단.',
    brands: '플라빅스, 브릴린타 정',
  },
  {
    id: '11-3-3',
    category: '항응고/혈전',
    name: '혈소판 응집 억제제 (Abciximab / Tirofiban)',
    pregnancySafety: 'caution',
    pregnancyNote: '압식시맙, 티로피반 등. 응급 상황에서 유익성이 위험을 상회할 때만 임신 중 정맥주사로 고려합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 투여.',
    brands: '리오프로 주사, 애그릴린 주사',
  },

  // [금기 및 제한 - 피해야 함]
  {
    id: '11-4-1',
    category: '항응고/혈전',
    name: '와파린 (Warfarin)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 원칙적 금기. 태반 통과로 비강 저형성, 단지증 등 \'태아 와파린 증후군\' 기형을 유발합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전.',
    brands: '쿠마딘 정',
  },
  {
    id: '11-4-2',
    category: '항응고/혈전',
    name: '직접 경구 항응고제 (DOACs - Dabigatran / Rivaroxaban / Apixaban / Edoxaban)',
    pregnancySafety: 'avoid',
    pregnancyNote: '다비가트란, 리바록사반, 아픽사반, 에독사반 포함. 데이터 부족으로 임신 시 즉시 중단 및 헤파린 전환을 권고합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 금지.',
    brands: '프라닥사, 자렐토, 엘리퀴스, 릭시아나 정',
  },
  {
    id: '11-4-3',
    category: '통증/진통',
    name: '고용량 아스피린 (High-dose Aspirin)',
    pregnancySafety: 'avoid',
    pregnancyNote: '고용량 NSAIDs 작용으로 태아 심폐 및 신기능 독성 위험이 있어 임신 중 피해야 합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 영아 라이 증후군 위험으로 피함.',
    brands: '아스피린정 500mg',
  },
  // --- 12. 통증/진통제 및 근이완제 (MFDS 2025) ---
  // [비마약성 진통제 (해열진통제 / NSAIDs)]
  {
    id: '12-n-1',
    category: '해열진통제',
    name: '아세트아미노펜 (Acetaminophen)',
    pregnancySafety: 'safe',
    pregnancyNote: '1차 권장. 임신 중 어느 시기에 사용해도 주요 선천 기형 위험이 증가하지 않는 가장 안전한 해열진통제입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 매우 안전.',
    brands: '타이레놀, 펜잘',
  },
  {
    id: '12-n-2',
    category: '해열진통제',
    name: '이부프로펜 / 디클로페낙 / 나프록센 (Ibuprofen / Diclofenac / Naproxen)',
    pregnancySafety: 'caution',
    pregnancyNote: '비선택적 NSAIDs. 20주 이전까지만 아주 제한적으로 주의 사용. 20주 이후부터는 태아 신부전, 양수소소증, 동맥관 조기 폐쇄 위험으로 절대 금기입니다.',
    lactationSafety: 'safe',
    lactationNote: '반감기가 짧아 수유 중 비교적 안전.',
    brands: '부루펜, 애드빌, 낙센',
  },
  {
    id: '12-n-3',
    category: '해열진통제',
    name: '세레콕시브 / 에토리콕시브 / 폴마콕시브 (Celecoxib / Etoricoxib / Polmacoxib)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 피할 병용 금기. COX-2 선택적 억제제 계열로 배아-태아 독성 및 혈관 기형 유발 가능성이 보고되어 임신 중 사용 금기입니다.',
    lactationSafety: 'avoid',
    lactationNote: '안전성 확립되지 않아 수유 금지.',
    brands: '쎄레브렉스',
  },

  // [마약성 진통제]
  {
    id: '12-o-1',
    category: '마약성진통제',
    name: '오피오이드 계열 약제 (Opioids)',
    pregnancySafety: 'caution',
    pregnancyNote: '제한적 주의. 기형 발생률은 낮으나 장기간 노출 시 신생아 금단증상을 유발합니다. 급성 통증 시 최단 기간/최소 용량 한정 투여 요망.',
    lactationSafety: 'caution',
    lactationNote: '영아 호흡 억제 우려로 주의 깊은 관찰 필요.',
    brands: '트라마돌, 옥시코돈 패치',
  },

  // [근이완제]
  {
    id: '12-m-1',
    category: '근이완제',
    name: '클로르페네신 / 시클로벤자프린 / 에페리손 (Chlorphenesin / Cyclobenzaprine / Eperisone)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 권장 안 함. 근육 통증용 경구 근이완제. 태아 안전성 및 유효성이 불명확하고 오심/졸음 부작용이 크므로 다른 물리적 요법 우선입니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유부 독성 부족.',
    brands: '근이완제',
  },
  {
    id: '12-m-2',
    category: '근이완제',
    name: '메토카르바몰 / 프리디놀 / 티자니딘 (Methocarbamol / Pridinol / Tizanidine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 권장 안 함. 위 약물과 동일하게 임신 중 태아 독성 연구 부족 및 산모 졸음 부작용으로 권고되지 않습니다.',
    lactationSafety: 'avoid',
    lactationNote: '사용 불가.',
    brands: '근육이완 국소약제',
  },
  {
    id: '12-m-3',
    category: '근이완제',
    name: '보툴리눔 독소 A형 / B형 (Botulinum Toxin A / B)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 권장 안 함. 국소 근육경직 주사용 및 미용 목적 사용 절대 금기입니다. 동물 실험에서 유산 및 저체중아 출생 보고가 존재합니다.',
    lactationSafety: 'avoid',
    lactationNote: '명확한 데이터 부족하므로 투여 불가.',
    brands: '보톡스 등',
  },

  // --- 13. 악성종양 치료 및 보조 약물 (MFDS 2025) ---
  // [수술 및 방사선 치료 (가이드라인)]
  {
    id: '13-sur-1',
    category: '수술/방사선요법',
    name: '수술적 치료 가이드 (Surgical Treatment)',
    pregnancySafety: 'caution',
    pregnancyNote: '임신 제1삼분기(초기)에는 가급적 수술을 피하고, 제2삼분기에 시행하는 것이 유산 위험을 최소화합니다. 단, 산모의 수술 유익성이 압도적으로 크면 시기와 무관하게 긴급 시행합니다.',
    lactationSafety: 'safe',
    lactationNote: '일반적인 마취 후 수유 가능.',
    brands: '종양학적 응급 수술 가이드',
  },
  {
    id: '13-rad-1',
    category: '수술/방사선요법',
    name: '방사선 치료 가이드 (Radiation Therapy)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 고선량 노출로 태아 소두증/지적장애/골격기형 등 잠재적 위험이 매우 커 일반적으로 권장되지 않으며 출산 후로 연기합니다. 특히 복부/골반 배막 치료는 절대 금기입니다. (예외: 척수 압박 등 응급 상황 한정)',
    lactationSafety: 'caution',
    lactationNote: '수유 중 방사성 동위원소 사용 금기.',
    brands: '응급 및 예방 가이드',
  },

  // [전신적 치료 (항암 요법)]
  {
    id: '13-chemo-1',
    category: '항암화학요법',
    name: '항암 화학요법 약물군 (Chemotherapy Agents)',
    pregnancySafety: 'caution',
    pregnancyNote: '⚠️ 제1삼분기에는 절대 피해야 합니다. 제2, 3삼분기에는 기형 발생률이 일반인 수준으로 떨어져 비교적 안전하게 투여를 하되 비임신 시와 동일한 용량을 유지하며, 출혈/감염 방지를 위해 35주 이후(예상 분만일 3주 전) 투여를 중단합니다.',
    lactationSafety: 'avoid',
    lactationNote: '혈중 반감기에 따라 수유 절대 금기.',
    brands: '시클로포스파미드, 5-FU 약물들',
  },
  {
    id: '13-tih-1',
    category: '표적/면역/호르몬제',
    name: '표적요법 및 면역요법 (Targeted & Immunotherapy)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 임부 안전성 데이터가 제한적이므로 태아 기형 및 위해 방지를 위해 사용이 권장되지 않습니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유부 안전성 데이터 부족 및 금기.',
    brands: '표적/면역항암제',
  },
  {
    id: '13-tih-2',
    category: '표적/면역/호르몬제',
    name: '호르몬요법 (Hormone Therapy)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 태아 발달에 필수적인 호르몬 생성과 작용을 방해하므로 종양 호르몬제 류는 절대 시행하지 않고 피합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 금지.',
    brands: '타목시펜, 아로마타제 억제제',
  },

  // [항암 치료 보조 약물]
  {
    id: '13-anti-1',
    category: '항구토제',
    name: '메토클로프라마이드 (Metoclopramide)',
    pregnancySafety: 'safe',
    pregnancyNote: '임신 전 기간에 걸쳐 구역·구토 억제 및 항암 보조 목적으로 안전하게 사용 가능한 권장 약물입니다.',
    lactationSafety: 'safe',
    lactationNote: '단기 사용 시 수유 안전.',
    brands: '맥페란 정/주사',
  },
  {
    id: '13-anti-2',
    category: '항구토제',
    name: '온단세트론 (Ondansetron)',
    pregnancySafety: 'caution',
    pregnancyNote: '기형 발생 우려가 있으므로 임신 제2, 3삼분기에만 가장 제한적으로 선별하여 사용이 권장됩니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 투여 신중 고려.',
    brands: '조프란 정/주사',
  },
  {
    id: '13-ste-1',
    category: '보조스테로이드',
    name: '덱사메타손 (Dexamethasone)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 사용 금지. 항구토 보조 목적으로 쓰이나 태반을 통과하여 태아에게 장기적인 신경행동학적 악영향을 미칠 가능성이 있어 사용을 지양합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 이행 가능성에 따라 최소량 사용.',
    brands: '덱사메타손 주',
  },
  {
    id: '13-ste-2',
    category: '보조스테로이드',
    name: '메틸프레드니솔론 / 프레드니솔론 / 히드로코르티손 (Methylprednisolone / Prednisolone / Hydrocortisone)',
    pregnancySafety: 'safe',
    pregnancyNote: '항암 항구토 보조 목적으로 덱사메타손을 대체하여 권장. 태반 투과율이 매우 낮아 임부에게 우선적으로 대체 권장되는 스테로이드 약물들입니다.',
    lactationSafety: 'safe',
    lactationNote: '부신피질호르몬이나 수유 중 가장 안전함.',
    brands: '소론도, 메티솔 엠 등',
  },
  {
    id: '13-neu-1',
    category: '호중구감소치료제',
    name: '과립구 콜로니 자극인자 (G-CSF - Granulocyte-colony stimulating factor)',
    pregnancySafety: 'caution',
    pregnancyNote: '항암 치료로 인한 면역 저하(호중구 감소) 시 명확한 위해가 발견되지 않아 면밀한 모니터링 하에 예외적으로 사용을 고려할 수 있습니다.',
    lactationSafety: 'caution',
    lactationNote: '효율성에 따라 신중 투여.',
    brands: '류코스팀, 그라신 등',
  },
// --- 14. 안과·이비인후과 (MFDS 2025) ---
  {
    id: '14-1',
    category: '안과/한방/기타',
    name: '라타노프로스트 (Latanoprost)',
    pregnancySafety: 'avoid',
    pregnancyNote: '프로스타글란딘 유도체. 자궁 수축 유발 가능성으로 임신 중 사용 금기.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 투여.',
    brands: '잘라탄 등',
  },
  {
    id: '14-2',
    category: '안과/한방/기타',
    name: '티몰롤 (Timolol)',
    pregnancySafety: 'caution',
    pregnancyNote: '안약이나 전신 흡수 시 태아 서맥이나 베타차단 부작용 가능성이 있으므로 비루관 압박을 권장합니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 안전.',
    brands: '티모프틱',
  },

  // --- 16. 비만, 흡연, 음주 관리 (MFDS 2025) ---
  // [비만 (Obesity)]
  {
    id: '16-obe-1',
    category: '비만',
    name: '식욕억제제 (Diethylpropion / Phendimetrazine / Phentermine)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기(향정신성의약품). 임부 대상 연구가 없으며 배아 생존 감소 및 태아 골격 기형 유발 가능성이 커 임신 확인 즉시 복용을 중단합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 절대 금기.',
    brands: '디에타민, 푸링, 펜터민 등',
  },
  {
    id: '16-obe-2',
    category: '비만',
    name: '지방분해효소억제제 (Orlistat)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 임신 중 체중 감량이나 비만치료제 사용은 절대 권장되지 않습니다. 즉시 중단하십시오.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 사용 금지.',
    brands: '제니칼, 올리타 등',
  },
  {
    id: '16-obe-3',
    category: '비만',
    name: 'GLP-1 작용제 (Liraglutide / Semaglutide)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 기형 발생 우려로 임신 중 비만 치료 목적으로 투여 금기입니다. 임신 계획 시 미리 중단이 권고됩니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 투여 금기.',
    brands: '삭센다, 위고비 등',
  },

  // [흡연/금연보조제 (Smoking)]
  {
    id: '16-smo-1',
    category: '흡연',
    name: '담배 / 니코틴 / 일산화탄소 (Smoking)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 치명적 금기. 임신 중 흡연(간접흡연 포함)은 태아 성장제한, 사산, 심장/장관 기형을 유발하므로 행동 상담을 통한 즉각적 금연이 필수입니다.',
    lactationSafety: 'avoid',
    lactationNote: '모유를 통해 니코틴 등 독성 물질 전달.',
    brands: '일반 담배, 전자담배',
  },
  {
    id: '16-smo-2',
    category: '흡연',
    name: '니코틴 대체요법 (Nicotine Replacement Therapy)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 니코틴 자체의 독성으로 태아 호흡기/순환기/골격계 기형 유발 우려가 있어 일괄 권장되지 않습니다. 비약물 요법을 우선합니다.',
    lactationSafety: 'avoid',
    lactationNote: '영아 심박수 증가 우려.',
    brands: '니코레트, 니코틴 패치/껌',
  },
  {
    id: '16-smo-3',
    category: '흡연',
    name: '부프로피온 / 바레니클린 (Bupropion / Varenicline)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 금연 약물치료제. 부프로피온은 1삼분기 노출 시 심장 결함 증가가 보고되었고, 바레니클린은 통제된 연구가 부족하여 임신 중 권장되지 않습니다.',
    lactationSafety: 'avoid',
    lactationNote: '모유 수유부 안전성 데이터 부족.',
    brands: '웰부트린, 챔픽스',
  },

  // [음주 (Alcohol)]
  {
    id: '16-alc-1',
    category: '음주',
    name: '알코올 (Alcohol)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 금기. 안전한 노출 수준은 없으며 태반을 자유롭게 통과하여 태아 알코올 스펙트럼 장애(FASD, 중추신경계 손상 및 안면 기형)를 유발합니다.',
    lactationSafety: 'avoid',
    lactationNote: '모유로 이행되어 영아 수면 및 발달 장애 유발.',
    brands: '모든 종류의 술',
  },

  // --- 17. 한방제제 및 건강기능식품 (MFDS 2025) ---
  {
    id: '17-1',
    category: '안과/한방/기타',
    name: '기타 보충제 (Herbal / Supplements)',
    pregnancySafety: 'caution',
    pregnancyNote: '성분이 명확하지 않은 한약이나 고용량 건기식은 전문가 상담 없이 복용 주의.',
    lactationSafety: 'caution',
    lactationNote: '성분 확인 필수.',
    brands: '다양함',
  },

  // --- 18. 면역 매개 염증성 질환 (IBD, 류마티스 관절염, 루푸스 등) ---
  // [1차 권고 - 비교적 안전]
  {
    id: '18-1',
    category: '면역/염증',
    name: '5-아미노살리실산 / 설파살라진 (5-Aminosalicylic acid, 5-ASA / Sulfasalazine)',
    pregnancySafety: 'safe',
    pregnancyNote: '비교적 안전함. 5-ASA 및 설파살라진은 장내 항염증제로 임신 중 유지 가능합니다. 단, 설파살라진 사용 시 고용량 엽산 보충이 필수적입니다.',
    lactationSafety: 'safe',
    lactationNote: '수유 중 비교적 안전.',
    brands: '조피린, 아사콜, 펜타사',
  },

  // [신중 투여 - 상담 필수]
  {
    id: '18-2',
    category: '면역/염증',
    name: '글루코코르티코이드 (Glucocorticoids)',
    pregnancySafety: 'caution',
    pregnancyNote: '스테로이드제. 급성 악화 시 조절을 위해 필요하지만, 장기 고용량 투여 시 임신성 당뇨/고혈압 및 태아 성장 제한 위험이 있어 최소량만 유지합니다.',
    lactationSafety: 'safe',
    lactationNote: '저용량은 수유 중 안전.',
    brands: '프레드니솔론, 소론도 등',
  },
  {
    id: '18-4',
    category: '면역/염증',
    name: '아자티오프린 / 메르캅토퓨린 (Azathioprine / Mercaptopurine)',
    pregnancySafety: 'caution',
    pregnancyNote: '티오퓨린 계열 면역억제제. 기형 유발 위험은 낮으나 태아 성장에 영향을 줄 수 있으므로 질환 활성도에 따라 유지 여부를 결정합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 신중 투여 및 모니터링.',
    brands: '아자프린, 푸리네톤 등',
  },
  {
    id: '18-5',
    category: '면역/염증',
    name: '타크로리무스 / 사이클로스포린 (Tacrolimus / Cyclosporine)',
    pregnancySafety: 'caution',
    pregnancyNote: '필요시 최소 용량 사용. 선천 기형 위험은 낮아 보이나 조산 및 자궁내 성장제한(IUGR) 보고가 있어 신중한 추적 관찰이 필요합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 주의.',
    brands: '산디문, 프로그랍 등',
  },
  {
    id: '18-7',
    category: '면역/염증',
    name: 'TNF-α 억제제 (Infliximab / Adalimumab / Etanercept / Golimumab)',
    pregnancySafety: 'caution',
    pregnancyNote: '에타너셉트, 인플릭시맙, 아달리무맙, 골리무맙 성분의 생물학적 제제입니다. 태반을 통과하므로 출생 후 신생아는 6개월간 생백신 투여를 금지합니다.',
    lactationSafety: 'caution',
    lactationNote: '수유 중 전문가 상담.',
    brands: '레미케이드, 휴미라, 엔브렐, 심포니',
  },
  {
    id: '18-8',
    category: '면역/염증',
    name: 'IL 억제제 계열 (IL Inhibitors - Ixekizumab, Secukinumab, Guselkumab, Risankizumab, Ustekinumab)',
    pregnancySafety: 'caution',
    pregnancyNote: '익세키주맙, 세쿠키누맙, 구셀쿠맙, 리산키주맙, 우스테키누맙 성분의 생물학적 제제입니다. 임부 데이터가 제한적이므로 유익성이 위험을 상회할 때만 상담 후 사용합니다.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 안전성 미확립.',
    brands: '스텔라라, 탈츠, 코센틱스, 트렘피어, 스카이리치',
  },

  // [금기 - 피해야 함]
  {
    id: '18-3',
    category: '면역/염증',
    name: '메토트렉세이트 (Methotrexate)',
    pregnancySafety: 'avoid',
    pregnancyNote: '절대 금기. 강력한 최기형성 약물로 유산 및 다발성 골격계 기형을 유발합니다. 임신 최소 3~6개월 전 중단 필수.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 절대 금기.',
    brands: '엠티엑스 등',
  },
  {
    id: '18-6',
    category: '면역/염증',
    name: '시클로포스파마이드 / 미코페놀레이트 모페틸 / 레플루노마이드 (Cyclophosphamide / Mycophenolate mofetil / Leflunomide)',
    pregnancySafety: 'avoid',
    pregnancyNote: '❌ 절대 사용 주의 (피할 것). 세포 독성 및 면역 억제 작용으로 태아에게 심각한 해를 끼칠 위험이 매우 큽니다. 반드시 전문가와 상담하십시오.',
    lactationSafety: 'avoid',
    lactationNote: '수유 중 절대 금기.',
    brands: '엔독산, 셀셉트, 아라바 등',
  },
];

const CLINICAL_GUIDES: Record<string, string> = {
  '소화기': '임산부 속쓰림은 흔하지만, 약물 선택에 유의해야 합니다. 특히 **현호색(Corydalis)** 성분은 자궁 수축 및 유산 위험이 있어 액상 소화제 구매 시 함유 여부를 반드시 확인해야 합니다. 생활 습관 교정과 안전한 제산제를 우선하십시오.',
  '입덧': '입덧은 임부의 삶의 질을 저하시키는 흔한 증상으로, 독실아민+피리독신 복합제가 전 세계적으로 1차 선택제로 권고됩니다.',
  '변비': '식이요법 후 효과 없을 시 팽창성 완하제(1차) → 삼투성(2차) 순으로 사용합니다. 마그네슘 제제는 1차적 사용을 피하며, 자극성 완하제와 프루칼로프라이드는 임신 중 권장되지 않습니다.',
  '설사': '임신 중 급성 설사는 약물 복용보다 수분과 전해질 보충이 최우선입니다. 증상이 심해 꼭 필요한 경우에만 로페라마이드 성분을 단기간 제한적으로 사용하며, 임신 초기에는 각별한 주의가 필요합니다.',
  '소화불량': '위장관 조절제는 임신 중 데이터가 부족하므로 식이 조절을 우선하고, 약물 사용 시 태아 유익성을 판단해야 합니다.',
  '속쓰림': '임신 후기 자궁 압박으로 흔히 발생합니다. 제산제나 위점막 보호제를 우선하며, H2 차단제(파모티딘 등)나 PPI(오메프라졸)는 전문가와 상의하여 신중하게 투여를 고려할 수 있습니다.',
  '통증/진통': '통증 관리는 산모의 스트레스 조절에 필수입니다. 아세트아미노펜이 가장 안전하며, NSAIDs는 임신 후반기(20주~) 태아 신독성 및 동맥관 수축 위험으로 피해야 합니다.',
  '내분비': '당뇨 조절은 기형 예방의 핵심입니다(인슐린 가장 안전, 1차 선택). 이상지질혈증 약물(스타틴 등)은 태아 발달을 저해하므로 임신 중 투여 금지입니다. 갑상선 호르몬제(레보티록신)는 매우 안전하며 적극 투여해야 합니다. 비만의 경우 체중 감량이나 비만치료제(식욕억제제/GLP-1 등) 사용은 임신 중 절대 권장되지 않습니다',
  '순환기': '고혈압에는 라베탈롤/니페디핀이 권장되며, ACEI/ARB와 와파린, 스타틴은 전 기간 절대 금기입니다. 고위험군 산모의 경우 저용량 아스피린(전자간증 예방) 사용을 확인하십시오.',
  '감염/항생제': '임기 중 항생제 사용은 감염 관리의 실익이 큽니다. 페니실린/세팔로스포린계는 안전하게 사용 가능하나, 독시사이클린(치아 변색) 및 퀴놀론계(연골 형성 방해)는 절대 금기입니다. 활동성 결핵은 임신 중이라도 반드시 치료해야 하며(이소니아지드 시 Vit B6 병용 필수), 독감에는 타미플루를 증상 발현 48시간 내에 신속 투여하십시오. 질염 시에는 경구약보다 국소 제제가 선호되며, MMR, 수두 등의 생백신은 태아 감염 우려로 임신 중 절대 금기입니다.',
  '피부계': '이소트레티노인, 아시트레틴과 같은 레티노이드계 약물은 중증 기형을 유발하므로 임신 중 절대 금불입니다(아시트레틴 투약 후엔 3년간 임신 금지). 건선과 아토피에는 보습제 및 협대역 자외선 B 광선 요법이 1차 선택지입니다.',
  '호흡기': '감기에는 충분한 휴식과 수분 섭취가 1순위이며, 약물은 증상 완화를 위해 제한적으로 사용합니다. 특히 천식은 산모와 태아 건강을 위해 기존 흡입제(ICS)를 반드시 유지하고 전문 상담을 지속해야 합니다.',
  '알레르기': '알레르기 비염에는 **세티리진/로라타딘**과 **부데소나이드(코 스프레이)**가 1차 선택지입니다. 슈도에페드린, 페닐에프린 성분의 먹는 코막힘 약은 피해야 하며, 임신 중 새로운 면역요법 시작은 금지됩니다.',
  '신경/정신': '뇌전증 유지는 필수적이나 발프로에이트는 피하고, 불안·수면장애 약제는 후순위, 편두통엔 아세트아미노펜이 안전합니다. 흡연(간접포함)과 음주는 태아 기형 및 FASD 유발의 치명적 원인이므로 행동 기법을 통한 즉각 중단이 필수이며, 금연 약물(니코틴 대체, 바레니클린 등)조차 통제된 안전성이 부족하여 강력히 피해야 합니다',
  '비뇨생식기': '무증상 세균뇨 방지는 필수(페니실린/세팔로스포린 선호, 퀴놀론 금기). 질염 시 클로트리마졸 권장 및 플루코나졸 경구 유산 위험으로 금기. 초기 복합 피임약 복용은 너무 걱정하지 않으셔도 되지만, 클로미펜/레트로졸 같은 난임 치료제는 즉시 끊어야 합니다. 조기 진통 억제제(리토드린 주사, 니페디핀 등)와 탈모약/호르몬제(치명적 접촉 주의) 가이드를 철저히 확인하십시오',
  '기타/종양': '임신 중 종양학적 응급 제외, 수술은 2삼분기 권장, 방사선은 출산 후로 연기(복부/골반 금기). 항암 화학 요법은 1삼분기 절대 피하고 2,3삼분기에만 일반인 용량으로 진행(35주 후 중단). 표적/호르몬/면역 요법은 모두 금기입니다. 항구토는 메토클로프라마이드 우선, 항구토용 덱사메타손은 절대 피하고 메틸프레드니솔론/프레드니솔론으로 대체하십시오',
  '면역/염증': '면역 질환 산모는 기저 질환의 안정적 관리가 태아를 위해 더 중요할 수 있습니다. 5-ASA는 엽산과 함께 비교적 안전하게 사용하며, 스테로이드는 최소 용량을 유지합니다. 특히 생물학적 제제 투여 산모의 아기는 출생 후 6개월간 생백신(BCG 등) 접종이 금지되므로 투약 이력 확인이 필수적입니다.',
};

const CustomIcons = {
  Stomach: ({ size = 24, className, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M10.5 3v3.5c0 1.5-1 4-3 4.5S3 12 3 16s2.5 5 6 5c6 0 12-4 12-10 0-3-2-5-4.5-5h-1c-1.5 0-3-1-3-3V3z" />
    </svg>
  ),
  Pancreas: ({ size = 24, className, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M19 12c-2.5-3-5.5-2-8-1s-4.5.5-6-1-2-3-2-3 4.5-1 7.5 1 6 1 8.5-1 3.5-1 3.5-1-1 5-3.5 5z" />
      <path d="M9 11v3M12 11.5v3M15 11v3" />
    </svg>
  ),
  Kidneys: ({ size = 24, className, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M7.5 17C4.5 17 3 14 3 11s2-5 4-5 3.5 2 3.5 5-2 6-3 6z" />
      <path d="M16.5 17C19.5 17 21 14 21 11s-2-5-4-5-3.5 2-3.5 5 2 6 3 6z" />
      <path d="M10 11v6a2 2 0 0 0 4 0v-6" />
    </svg>
  ),
  Lungs: ({ size = 24, className, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 3v9" />
      <path d="M12 7c-2 0-4-1-6-3-2-1-3 0-3 3v5c0 4 3 7 7 7s3-4 3-4" />
      <path d="M12 7c2 0 4-1 6-3 2-1 3 0 3 3v5c0 4-3 7-7 7s-3-4-3-4" />
    </svg>
  ),
  Skin: ({ size = 24, className, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M3 8h18" />
      <path d="M5 8v2a2 2 0 0 0 2 2h0a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h0a2 2 0 0 0 2-2v-2" />
      <path d="M3 16h18" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="6" cy="4" r="1.5" />
      <circle cx="18" cy="4" r="1.5" />
    </svg>
  ),
  Allergy: ({ size = 24, className, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 2v20" />
      <path d="M12 12c-3-3-6-4-8-4-1 0-2 1-2 2s2 2 4 2c2 0 5 1 6 4" />
      <path d="M12 12c3-3 6-4 8-4 1 0 2 1 2 2s-2 2-4 2c-2 0-5 1-6 4" />
      <circle cx="8" cy="6" r="1.5" />
      <circle cx="16" cy="6" r="1.5" />
    </svg>
  ),
  Tumor: ({ size = 24, className, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 3a9 9 0 0 0-9 9c0 1.5.5 3 1.5 4l-1.5 5 5-1.5A9 9 0 1 0 12 3z" />
      <path d="M9 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
      <path d="M14 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
    </svg>
  ),
  Pain: ({ size = 24, className, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M4.5 19.5 19.5 4.5" />
      <path d="m14 5 1-2 2 1 1-2 2 1" />
      <path d="m5 14-2 1 1 2-2 1 1 2" />
      <path d="m8 8-4-4" />
      <path d="m16 16 4 4" />
    </svg>
  ),
  Immune: ({ size = 24, className, ...props }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
    </svg>
  )
};

const SYMPTOM_NODES = [
  { id: '소화기', label: '소화기 질환', icon: CustomIcons.Stomach, x: 0, y: -180 },
  { id: '피부계', label: '피부 질환', icon: CustomIcons.Skin, x: 90, y: -156 },
  { id: '내분비', label: '내분비 질환', icon: CustomIcons.Pancreas, x: 156, y: -90 },
  { id: '순환기', label: '순환기(혈액)', icon: Heart, x: 180, y: 0 },
  { id: '감염/항생제', label: '감염/백신', icon: Bug, x: 156, y: 90 },
  { id: '비뇨생식기', label: '비뇨생식기', icon: CustomIcons.Kidneys, x: 90, y: 156 },
  { id: '신경/정신', label: '신경/정신', icon: Brain, x: 0, y: 180 },
  { id: '알레르기', label: '알레르기', icon: CustomIcons.Allergy, x: -90, y: 156 },
  { id: '호흡기', label: '호흡기 질환', icon: CustomIcons.Lungs, x: -156, y: 90 },
  { id: '통증/진통', label: '통증/진통', icon: CustomIcons.Pain, x: -180, y: 0 },
  { id: '기타/종양', label: '악성종양', icon: CustomIcons.Tumor, x: -156, y: -90 },
  { id: '면역/염증', label: '면역/염증', icon: CustomIcons.Immune, x: -90, y: -156 },
];

const SUB_NODES: Record<string, { id: string; label: string; icon: any; dx: number; dy: number }[]> = {
  '피부계': [
    { id: '여드름', label: '여드름', icon: Sparkles, dx: -90, dy: -90 },
    { id: '아토피피부염', label: '아토피피부염', icon: Shield, dx: 90, dy: -90 },
    { id: '건선', label: '건선', icon: Bandage, dx: -90, dy: 90 },
    { id: '소양증', label: '소양증(가려움)', icon: BugOff, dx: 90, dy: 90 },
  ],
  '비뇨생식기': [
    { id: '요로감염', label: '요로감염', icon: Bug, dx: 0, dy: -140 },
    { id: '질염', label: '질염(진균/세균)', icon: Microscope, dx: 110, dy: -80 },
    { id: '치질', label: '치질', icon: ArrowDownCircle, dx: 130, dy: 30 },
    { id: '조산', label: '조산(수축억제)', icon: Baby, dx: 80, dy: 120 },
    { id: '피임', label: '복합피임약', icon: Heart, dx: -80, dy: 120 },
    { id: '난임', label: '난임(호르몬)', icon: Dna, dx: -130, dy: 30 },
    { id: '남성호르몬제', label: '남성호르몬/기타', icon: Syringe, dx: -110, dy: -80 },
  ],
  '소화기': [
    { id: '입덧', label: '입덧/구토', icon: Frown, dx: -100, dy: 10 },
    { id: '변비', label: '변비', icon: ArrowDownCircle, dx: -50, dy: 60 },
    { id: '설사', label: '설사', icon: Droplets, dx: 50, dy: 60 },
    { id: '소화불량', label: '소화불량', icon: Utensils, dx: 100, dy: 10 },
    { id: '속쓰림', label: '속쓰림', icon: Flame, dx: 0, dy: 90 },
  ],
  '알레르기': [
    { id: '비염', label: '알레르기 비염', icon: Wind, dx: -100, dy: -80 },
    { id: '두드러기', label: '두드러기', icon: BugOff, dx: 100, dy: -80 },
    { id: '혈관부종', label: '혈관부종/아나필락시스', icon: AlertTriangle, dx: 0, dy: 100 },
  ],
  '호흡기': [
    { id: '감기', label: '감기 (URTI)', icon: ThermometerSnowflake, dx: -110, dy: -40 },
    { id: '천식', label: '천식 (Asthma)', icon: Wind, dx: 110, dy: -40 },
  ],
  '감염/항생제': [
    { id: '항생제', label: '항균제 (Antibiotics)', icon: Pill, dx: -100, dy: -80 },
    { id: '결핵/바이러스', label: '결핵/바이러스', icon: Bug, dx: 100, dy: -80 },
    { id: '백신/진균', label: '백신/진균/원충', icon: Syringe, dx: 0, dy: 110 },
  ],
  '내분비': [
    { id: '당뇨병', label: '당뇨병', icon: TestTube, dx: -100, dy: -90 },
    { id: '이상지질혈증', label: '이상지질혈증', icon: Droplets, dx: 100, dy: -90 },
    { id: '갑상선', label: '갑상선 질환', icon: Shield, dx: -100, dy: 90 },
    { id: '비만', label: '비만/체중관리', icon: Activity, dx: 100, dy: 90 },
  ],
  '순환기': [
    { id: '고혈압', label: '항고혈압제', icon: Heart, dx: -100, dy: -90 },
    { id: '부정맥/심부전', label: '부정맥/심부전', icon: Activity, dx: 100, dy: -90 },
    { id: '항응고/혈전', label: '항응고/혈전', icon: Shield, dx: -100, dy: 90 },
    { id: '이뇨제', label: '이뇨제', icon: Droplets, dx: 100, dy: 90 },
  ],  
  '통증/진통': [
    { id: '해열진통제', label: '해열/NSAIDs', icon: Thermometer, dx: -100, dy: -80 },
    { id: '마약성진통제', label: '오피오이드', icon: AlertTriangle, dx: 100, dy: -80 },
    { id: '근이완제', label: '근이완제/주사', icon: Bone, dx: 0, dy: 110 },
  ],
  '신경/정신': [
    { id: '기분/수면장애', label: '기분/수면장애', icon: Heart, dx: -70, dy: -80 },
    { id: '중증정신질환', label: '조현/양극성', icon: SearchCode, dx: 70, dy: -80 },
    { id: 'ADHD', label: 'ADHD', icon: Zap, dx: 100, dy: 30 },
    { id: '뇌전증', label: '뇌전증/발작', icon: AlertTriangle, dx: 0, dy: -130 },
    { id: '두통/어지럼증', label: '편두통/멀미', icon: Sparkles, dx: -100, dy: 30 },
    { id: '물질사용장애', label: '흡연/음주', icon: GlassWater, dx: 0, dy: 100 },
  ],
  '기타/종양': [
    { id: '수술/방사선요법', label: '수술/방사선요법', icon: Cross, dx: 0, dy: -90 },
    { id: '항암화학요법', label: '항암화학요법', icon: Pill, dx: 70, dy: -60 },
    { id: '표적/면역/호르몬제', label: '표적/면역/호르몬', icon: Dna, dx: 100, dy: 0 },
    { id: '항구토제', label: '항구토제', icon: Frown, dx: 70, dy: 70 },
    { id: '보조스테로이드', label: '보조스테로이드', icon: Shield, dx: 0, dy: 100 },
    { id: '호중구감소치료제', label: '호중구/기타', icon: TestTube, dx: -70, dy: 60 },
    { id: '안과/한방/기타', label: '안과/한방', icon: Eye, dx: -90, dy: 0 },
  ],
};

const CATEGORIES = ['전체', ...SYMPTOM_NODES.map(node => node.id), '입덧', '변비', '설사', '소화불량', '속쓰림', '면역/염증', '감기', '천식', '비염', '혈관부종', '항생제', '결핵/바이러스', '백신/진균', '고혈압', '부정맥/심부전', '항응고/혈전', '이뇨제', '당뇨병', '이상지질혈증', '갑상선', '비만', '여드름', '아토피피부염', '건선', '소양증', '기분/수면장애', '중증정신질환', 'ADHD', '뇌전증', '두통/어지럼증', '물질사용장애', '해열진통제', '마약성진통제', '근이완제', '요로감염', '질염', '치질', '조산', '피임', '난임', '남성호르몬제', '수술/방사선요법', '항암화학요법', '표적/면역/호르몬제', '항구토제', '보조스테로이드', '호중구감소치료제', '안과/한방/기타'];

export default function App() {
  const [mode, setMode] = useState<Mode>('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const filteredMedications = useMemo(() => {
    return MEDICATIONS.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.brands.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedCategory === '전체') return matchesSearch;

      const parentCategories: Record<string, string[]> = {
        '피부계': ['여드름', '아토피피부염', '건선', '소양증', '피부계'],
        '비뇨생식기': ['요로감염', '질염', '치질', '조산', '피임', '난임', '남성호르몬제', '비뇨생식기'],
        '소화기': ['입덧', '변비', '설사', '소화불량', '속쓰림', '소화기'],
        '호흡기': ['감기', '천식', '호흡기'],
        '알레르기': ['비염', '두드러기', '혈관부종', '알레르기'],
        '내분비': ['당뇨병', '이상지질혈증', '갑상선', '비만', '내분비'],
        '순환기': ['고혈압', '부정맥/심부전', '항응고/혈전', '이뇨제', '순환기'],
        '감염/항생제': ['항생제', '결핵/바이러스', '백신/진균', '감염/항생제'],
        '통증/진통': ['해열진통제', '마약성진통제', '근이완제', '통증/진통'],
        '기타/종양': ['수술/방사선요법', '항암화학요법', '표적/면역/호르몬제', '항구토제', '보조스테로이드', '호중구감소치료제', '안과/한방/기타', '기타/종양'],
        '신경/정신': ['우울장애', '불안장애', '수면장애', '양극성장애', '조현병', 'ADHD', '뇌전증', '편두통', '멀미', '흡연', '음주', '신경/정신'],
        '기분/수면장애': ['우울장애', '불안장애', '수면장애'],
        '중증정신질환': ['양극성장애', '조현병'],
        '두통/어지럼증': ['편두통', '멀미'],
        '물질사용장애': ['흡연', '음주'],
      };

      if (parentCategories[selectedCategory]) {
        return matchesSearch && parentCategories[selectedCategory].includes(m.category);
      }

      return matchesSearch && m.category === selectedCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getSafetyColor = (level: SafetyLevel) => {
    switch (level) {
      case 'safe': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
      case 'caution': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'avoid': return 'text-rose-600 bg-rose-50 border-rose-100';
    }
  };

  const getSafetyIcon = (level: SafetyLevel) => {
    switch (level) {
      case 'safe': return <CheckCircle2 className="w-4 h-4" />;
      case 'caution': return <AlertTriangle className="w-4 h-4" />;
      case 'avoid': return <XCircle className="w-4 h-4" />;
    }
  };

  const getSafetyLabel = (level: SafetyLevel) => {
    switch (level) {
      case 'safe': return '안전';
      case 'caution': return '주의/상담';
      case 'avoid': return '금기/회피';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-x-hidden">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {mode !== 'landing' && (
              <button 
                onClick={() => {
                  setMode('landing');
                  setSelectedCategory('전체');
                  setSearchQuery('');
                }}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors mr-1"
              >
                <ArrowLeft size={20} className="text-slate-600" />
              </button>
            )}
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
              <Pill className="text-white w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800">
              PharmSafe <span className="text-blue-600 font-medium text-sm">
                {mode === 'pregnancy' ? '임부 가이드' : mode === 'lactation' ? '수유부 가이드' : ''}
              </span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><Stethoscope size={14} /> 약국 상담 지침</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <AnimatePresence mode="wait">
          {mode === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center py-20 text-center"
            >
              <div className="mb-16">
                <h2 className="text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tighter">
                  누구를 위한 <br /><span className="text-blue-600">상담인가요?</span>
                </h2>
                <p className="text-slate-500 text-xl font-medium max-w-sm mx-auto">대상자를 선택하면 해당 기준에 최적화된 안전성 가이드를 제공합니다.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl px-4">
                <button
                  onClick={() => setMode('pregnancy')}
                  className="group relative bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-blue-500 shadow-2xl shadow-blue-500/10 transition-all hover:-translate-y-2 active:scale-95 text-center flex flex-col items-center"
                >
                  <div className="w-28 h-28 bg-blue-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-500">
                    <Baby size={54} className="text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">임부(Pregnancy)</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">태아의 발달 단계와 <br />산모의 건강을 고려한 지침</p>
                  <div className="mt-6 flex items-center gap-1 text-blue-600 font-bold text-sm uppercase tracking-wider">
                    가이드 보기 <ChevronRight size={16} />
                  </div>
                </button>

                <button
                  onClick={() => setMode('lactation')}
                  className="group relative bg-white p-10 rounded-[3rem] border-2 border-transparent hover:border-pink-500 shadow-2xl shadow-pink-500/10 transition-all hover:-translate-y-2 active:scale-95 text-center flex flex-col items-center"
                >
                  <div className="w-28 h-28 bg-pink-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-pink-100 transition-all duration-500">
                    <Heart size={54} className="text-pink-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">수유부(Lactation)</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">모유 이행성 및 <br />영아의 안전을 고려한 지침</p>
                  <div className="mt-6 flex items-center gap-1 text-pink-600 font-bold text-sm uppercase tracking-wider">
                    가이드 보기 <ChevronRight size={16} />
                  </div>
                </button>
              </div>
            </motion.div>
          ) : mode === 'lactation' ? (
            <motion.div
              key="lactation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center pt-24 pb-32 text-center"
            >
              <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <Heart size={48} className="text-pink-500" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">수유부 안전 약물 가이드</h2>
              <p className="text-lg text-slate-500 max-w-lg mb-8 leading-relaxed">
                현재 수유부 관련 모유 이행 및 안전성에 대한 심층 데이터를 체계적으로 구축 중에 있습니다.<br/><br/>
                조금만 기다려 주시면 더욱 정확한 정보로 찾아뵙겠습니다.
              </p>
              <div className="inline-flex items-center gap-2 mb-10 px-5 py-2.5 bg-pink-50 text-pink-600 rounded-full text-sm font-bold uppercase tracking-widest border border-pink-100">
                <SearchCode size={18} /> Coming Soon
              </div>
              <button 
                onClick={() => setMode('landing')}
                className="flex items-center gap-2 px-8 py-4 bg-slate-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <ArrowLeft size={20} /> 메인 화면으로 돌아가기
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="guide"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="pt-10 space-y-12"
            >
              {/* Interactive Symptom Map */}
              {mode === 'pregnancy' && (
                <section className="relative w-full mb-10">
                  <div className="flex justify-end mb-4">
                    <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex items-center">
                      <button
                        onClick={() => setViewMode('map')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                          viewMode === 'map' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Network size={16} /> 맵뷰
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                          viewMode === 'list' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Menu size={16} /> 리스트뷰
                      </button>
                    </div>
                  </div>

                  {viewMode === 'list' ? (
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm mb-10 h-[500px] sm:h-[650px] overflow-y-auto custom-scrollbar">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {SYMPTOM_NODES.map((node) => {
                          const Icon = node.icon;
                          const hasSubs = SUB_NODES[node.id];
                          const isActive = expandedParent === node.id;
                          return (
                            <div key={node.id} className="flex flex-col">
                              <button
                                onClick={() => {
                                  if (hasSubs) {
                                    setExpandedParent(isActive ? null : node.id);
                                    setSelectedCategory(node.id);
                                  } else {
                                    setExpandedParent(null);
                                    setSelectedCategory(node.id);
                                  }
                                }}
                                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${
                                  isActive
                                    ? 'bg-blue-50 border-blue-200 shadow-sm'
                                    : 'bg-white border-slate-100 hover:border-blue-100 hover:bg-slate-50'
                                }`}
                              >
                                <div className={`p-2 rounded-xl ${isActive ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                  <Icon size={20} />
                                </div>
                                <span className="font-bold text-slate-800">{node.label}</span>
                              </button>
                              
                              <AnimatePresence>
                                {isActive && hasSubs && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden mt-2 ml-4 border-l-2 border-slate-100 pl-4 space-y-2"
                                  >
                                    {hasSubs.map((sub) => {
                                      const SubIcon = sub.icon;
                                      return (
                                        <button
                                          key={sub.id}
                                          onClick={() => setSelectedCategory(sub.id)}
                                          className={`flex items-center gap-2 w-full text-left p-2 rounded-xl transition-colors ${
                                            selectedCategory === sub.id ? 'bg-blue-100/50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-100'
                                          }`}
                                        >
                                          <SubIcon size={14} className={selectedCategory === sub.id ? 'text-blue-500' : 'text-slate-400'} />
                                          <span className="text-sm">{sub.label}</span>
                                        </button>
                                      )
                                    })}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="relative h-[500px] sm:h-[650px] lg:h-[750px] flex items-center justify-center overflow-hidden mb-10 bg-white/50 rounded-[3rem] border border-slate-100 shadow-inner"
                      onClick={() => {
                        setSelectedCategory('전체');
                        setExpandedParent(null);
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center scale-[0.6] sm:scale-100 lg:scale-[1.2] transition-transform origin-center">
                        {/* Central Figure */}
                        <div className="relative z-10 w-32 h-32 bg-blue-600 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-blue-500/40 border-8 border-white cursor-pointer group" title="메인으로 (초기화)">
                          {/* Ripple Animation */}
                          <div className="absolute inset-0 rounded-full border-4 border-blue-400/50 animate-ping" />
                          <div className="absolute inset-[-1rem] rounded-full border-2 border-blue-200/30 animate-pulse" />
                          
                          <Baby size={48} className="text-white relative z-20 mb-1 leading-none" />
                          
                          {/* Tooltip Badge */}
                          <div className="absolute -bottom-8 whitespace-nowrap text-[10px] font-black text-blue-600 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-md border border-blue-100 flex flex-col items-center transition-all group-hover:-translate-y-1">
                            <span>Pregnancy Map </span>
                            <span className="text-[9px] font-medium text-slate-500 mt-0.5">중앙을 눌러 초기화해 보세요</span>
                          </div>
                        </div>

                        {/* Nodes & Edges */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {SYMPTOM_NODES.map((node) => {
                            const isActive = selectedCategory === node.id || expandedParent === node.id;
                      const isDimmed = expandedParent && expandedParent !== node.id;
                      const Icon = node.icon;
                      const hasSubs = SUB_NODES[node.id];
                      
                      return (
                        <div key={node.id} className="absolute flex items-center justify-center">
                          {/* Connection Line */}
                          <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className={`absolute origin-left h-0.5 bg-gradient-to-r from-blue-200 to-transparent z-0`}
                            style={{ 
                              width: Math.sqrt(node.x**2 + node.y**2),
                              transform: `rotate(${Math.atan2(node.y, node.x)}rad)`,
                              opacity: isActive ? 1 : (isDimmed ? 0.05 : 0.3)
                            }}
                          />
                          
                          {/* Parent Node */}
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (hasSubs) {
                                setExpandedParent(expandedParent === node.id ? null : node.id);
                                setSelectedCategory(node.id);
                              } else {
                                setExpandedParent(null);
                                setSelectedCategory(node.id);
                              }
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ 
                              opacity: isDimmed ? 0.2 : 1,
                              x: node.x,
                              y: node.y,
                              scale: isActive ? 1.2 : 1
                            }}
                            whileHover={{ scale: 1.15 }}
                            className={`relative z-20 flex flex-col items-center gap-2 transition-all`}
                          >
                            <div className={`p-4 rounded-3xl shadow-lg border-2 transition-all ${
                              isActive 
                                ? 'bg-blue-600 border-blue-400 text-white scale-110' 
                                : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                            }`}>
                              <Icon size={24} />
                            </div>
                            <span className={`text-[11px] font-bold whitespace-nowrap px-2 py-1 rounded-lg ${
                              isActive ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              {node.label}
                            </span>
                          </motion.button>

                          {/* Sub Nodes */}
                          <AnimatePresence>
                            {expandedParent === node.id && hasSubs && hasSubs.map((sub) => {
                              const isSubActive = selectedCategory === sub.id;
                              const SubIcon = sub.icon;
                              return (
                                <motion.button
                                  key={sub.id}
                                  initial={{ opacity: 0, scale: 0, x: node.x, y: node.y }}
                                  animate={{ 
                                    opacity: 1, 
                                    scale: 1, 
                                    x: node.x + sub.dx, 
                                    y: node.y + sub.dy 
                                  }}
                                  exit={{ opacity: 0, scale: 0, x: node.x, y: node.y }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCategory(sub.id);
                                  }}
                                  className={`absolute z-30 flex flex-col items-center gap-1 group`}
                                >
                                  <div className={`p-3 rounded-2xl shadow-md border transition-all ${
                                    isSubActive 
                                      ? 'bg-blue-500 border-blue-300 text-white' 
                                      : 'bg-white border-blue-100 text-blue-600 hover:bg-blue-50'
                                  }`}>
                                    <SubIcon size={18} />
                                  </div>
                                  <span className={`text-[10px] whitespace-nowrap font-black px-2 py-0.5 rounded shadow-sm ${
                                    isSubActive ? 'bg-blue-700 text-white' : 'bg-white text-blue-500 border border-blue-50'
                                  }`}>
                                    {sub.label}
                                  </span>
                                </motion.button>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                  </div>
                </div>
                )}
              </section>
              )}

              {/* Search Section */}
              <section className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-start gap-4">
                  <div className="p-2 bg-blue-600 rounded-xl text-white">
                    <Info size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-blue-900 text-lg mb-1 tracking-tight">상담 팁 (Counseling Tip)</h4>
                    <p className="text-blue-700 text-sm font-medium leading-relaxed">
                      "임신 중에는 같은 증상이라도 <b>단일성분 제품</b>을 우선 고르고, 종합감기약처럼 여러 성분이 섞인 복합제는 피하는 쪽이 안전합니다. 우선 권장되는 단일 성분을 확인하세요."
                    </p>
                  </div>
                </div>

                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={24} />
                  <input
                    type="text"
                    placeholder="성분명 또는 제품명을 입력하여 검색..."
                    className="w-full pl-16 pr-6 py-6 bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/40 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-xl font-medium"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 items-center justify-center sm:justify-start">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                        selectedCategory === cat
                          ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 -translate-y-0.5'
                          : 'bg-white text-slate-400 border border-slate-100 hover:border-blue-100 hover:text-blue-500 shadow-sm'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </section>

              {/* List Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 px-2">
                  <div className="h-0.5 flex-grow bg-slate-200 rounded-full" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">{filteredMedications.length} Medications Found</span>
                  <div className="h-0.5 flex-grow bg-slate-200 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {selectedCategory !== '전체' && CLINICAL_GUIDES[selectedCategory] && (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="md:col-span-2 lg:col-span-3 xl:col-span-4 bg-slate-900 rounded-3xl p-5 mb-2 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Info size={80} />
                      </div>
                      <div className="flex gap-3">
                        <div className="w-1 h-auto bg-blue-500 rounded-full shrink-0" />
                        <div>
                          <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Clinical Insight (MFDS 2025)</p>
                          <p className="text-[13px] text-slate-200 font-bold leading-relaxed pr-8">
                            {CLINICAL_GUIDES[selectedCategory]}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <AnimatePresence mode="popLayout">
                    {filteredMedications.map((med) => {
                      const safety = mode === 'pregnancy' ? med.pregnancySafety : med.lactationSafety;
                      const note = mode === 'pregnancy' ? med.pregnancyNote : med.lactationNote;
                      
                      return (
                        <motion.div
                          key={med.id}
                          layout
                          initial={{ opacity: 0, scale: 0.98, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/20 overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                        >
                          <div className="p-5 sm:p-6">
                            <div className="flex flex-col gap-4">
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-[9px] font-black uppercase tracking-[0.1em] text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 shadow-sm">
                                  {med.category}
                                </span>
                                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black tracking-widest ${getSafetyColor(safety)} uppercase shadow-sm`}>
                                  {getSafetyIcon(safety)}
                                  {getSafetyLabel(safety)}
                                </div>
                              </div>
                              
                              <div>
                                {(() => {
                                  const match = med.name.match(/^([^(]+)(?:\s*\(([^)]+)\))?$/);
                                  const koName = match ? match[1].trim() : med.name;
                                  const subName = match ? match[2] : null;
                                  const isEnglish = subName && /^[A-Za-z0-9\s\-+/.]+$/.test(subName);

                                  return (
                                    <>
                                      <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight leading-tight">
                                        {koName}
                                      </h4>
                                      {subName && isEnglish ? (
                                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2 mt-0.5">
                                          {subName}
                                        </p>
                                      ) : subName ? (
                                        <p className="text-[12px] font-bold text-slate-500 mb-2 mt-0.5">
                                          ({subName})
                                        </p>
                                      ) : <div className="mb-2" />}
                                    </>
                                  );
                                })()}
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-slate-50 rounded-md">
                                    <Pill size={10} className="text-slate-400" />
                                  </div>
                                  <p className="text-[11px] text-slate-400 font-bold tracking-tight">
                                    대표: <span className="text-slate-600">{med.brands}</span>
                                  </p>
                                </div>
                              </div>

                              <div className="relative bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex gap-3 overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-400/20" />
                                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-[13px] font-bold text-slate-600 leading-relaxed italic pr-1">
                                  "{note}"
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {filteredMedications.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-32 text-center"
                  >
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="text-slate-300" size={32} />
                    </div>
                    <p className="text-xl font-black text-slate-800 tracking-tight">검색 결과가 없습니다.</p>
                    <p className="text-slate-400 font-medium mt-1">다른 키워드나 메뉴를 이용해 보세요.</p>
                    <button 
                      onClick={() => setSelectedCategory('전체')}
                      className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-widest"
                    >
                      카테고리 초기화
                    </button>
                  </motion.div>
                )}
              </section>

            </motion.div>
          )}
        </AnimatePresence>

        {mode !== 'landing' && (
          <footer className="mt-32 border-t border-slate-200 pt-16 flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-900 rounded-xl">
                <Pill className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-slate-900">PharmSafe</span>
            </div>
            <div className="max-w-md text-center text-xs text-slate-400 font-bold leading-relaxed uppercase tracking-[0.1em]">
              © 2026 PharmSafe Guide for Pharmacists. <br />
              본 가이드는 약사의 전문적 판단을 보조하기 위한 도구로만 사용되어야 합니다.
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
