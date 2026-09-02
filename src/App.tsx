/**
 * @license
 * SPDX-License-Identifier: MIT
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
import { MEDICATIONS } from './data/medications';
import type { Medication, SafetyLevel } from './data/medications';
import { CATEGORY_PARENTS, CATEGORY_LEAVES } from './data/categories';

type Mode = 'landing' | 'pregnancy' | 'lactation';

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

const CATEGORIES = ['전체', ...SYMPTOM_NODES.map(node => node.id), ...CATEGORY_LEAVES];

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
        (m.brands ?? '').toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedCategory === '전체') return matchesSearch;

      if (CATEGORY_PARENTS[selectedCategory]) {
        return matchesSearch && CATEGORY_PARENTS[selectedCategory].includes(m.category);
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
      case 'safe': return '우선 고려';
      case 'caution': return '신중 사용';
      case 'avoid': return '회피 권고';
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
        <section className="pt-6">
          <div className="rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-left shadow-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-xl bg-amber-100 p-2 text-amber-700">
                <AlertTriangle size={18} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black tracking-tight text-amber-900">
                  Professional reference only
                </p>
                <p className="text-sm font-medium leading-relaxed text-amber-800">
                  본 도구는 약사의 전문적 판단을 보조하기 위한 참고 자료입니다. 임신 주수, 수유 상태,
                  용량, 투여경로, 기저질환에 따라 판단이 달라질 수 있으며 실제 복약 및 처방 결정은
                  반드시 의료전문가 상담을 통해 이루어져야 합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

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
                <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                  MFDS 2025 전문가용 자료를 약국 상담 흐름에 맞게 재구성한 quick-reference MVP입니다.
                  현재는 임부 상담 범위를 우선 제공하며, 수유부 데이터는 별도 검증 후 확장 중입니다.
                </p>
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
                  <div className="mt-4 inline-flex items-center rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-pink-600">
                    In Progress
                  </div>
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
                현재 공개 버전은 수유부 상담 데이터를 최종 검증 중입니다.<br/><br/>
                근거 출처 정리와 표현 강도 검토가 끝난 뒤 정식 범위에 포함할 예정입니다.
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
                      // 수유부 모드는 Coming Soon 화면으로 분기되어 이 목록에 도달하지 않는다.
                      // 미출시 수유부 데이터를 번들에 싣지 않기 위해 임부 값만 참조한다.
                      const safety = med.pregnancySafety;
                      const note = med.pregnancyNote;
                      
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
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="text-[9px] font-black uppercase tracking-[0.1em] text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 shadow-sm">
                                    {med.category}
                                  </span>
                                  {med.indication && (
                                    <span className="text-[9px] font-black tracking-[0.05em] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                                      {med.indication}
                                    </span>
                                  )}
                                  {med.formulation && (
                                    <span className="text-[9px] font-black tracking-[0.05em] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                                      {med.formulation}
                                    </span>
                                  )}
                                </div>
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
                                {med.brands && (
                                  <div className="flex items-center gap-2">
                                    <div className="p-1 bg-slate-50 rounded-md">
                                      <Pill size={10} className="text-slate-400" />
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-bold tracking-tight">
                                      대표: <span className="text-slate-600">{med.brands}</span>
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="relative bg-slate-50/80 rounded-2xl p-4 border border-slate-100 flex gap-3 overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-400/20" />
                                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                                <p className="text-[13px] font-bold text-slate-600 leading-relaxed italic pr-1">
                                  "{note}"
                                </p>
                              </div>

                              {med.source?.page ? (
                                <p className="text-[10px] text-slate-400 font-bold tracking-tight">
                                  출처: {med.source.document} p.{med.source.page}
                                  {med.source.part ? ` · ${med.source.part}` : ''}
                                </p>
                              ) : (
                                <p className="text-[10px] text-amber-600 font-bold tracking-tight">
                                  ⚠️ 원문 출처 미확인 — 별도 확인 후 사용하십시오
                                </p>
                              )}
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
              Professional reference aid only. Not a substitute for clinical judgment or official drug information sources.
            </div>
          </footer>
        )}
      </main>
    </div>
  );
}
