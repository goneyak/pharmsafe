import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. English names in Migraine
content = content.replace(
  /'마그네슘 경구제 \/ 프로프라놀롤 \/ 메토프롤롤 \/ 삼환계 항우울제'/,
  "'마그네슘 경구제 / 프로프라놀롤 / 메토프롤롤 / 삼환계 항우울제 (Oral Magnesium / Propranolol / Metoprolol / Tricyclic Antidepressants)'"
);
content = content.replace(
  /'디발프로엑스 나트륨 \/ 토피라메이트 \/ 발프로에이트'/,
  "'디발프로엑스 나트륨 / 토피라메이트 / 발프로에이트 (Divalproex Sodium / Topiramate / Valproate)'"
);
content = content.replace(
  /'CGRP 표적치료제'/,
  "'CGRP 표적치료제 (CGRP Targeted Therapies)'"
);

// 2. Change contraception 'safe' to 'caution'
// I'll use regex to precisely find the Oral Contraceptives block
const conRegex = /(id:\s*'3-con-1',[\s\S]*?name:\s*'복합 경구피임약 \(Oral Contraceptives\)',\s*pregnancySafety:\s*)'safe'(,\s*pregnancyNote:\s*)'임신 사실을 모른 채 임신 초기에 부주의로 복용했더라도 선천 기형, 심장병, 수족변형 등의 발생률을 증가시키지 않아 지나친 불안 없이 산전 검진을 받으면 됩니다.'/;

content = content.replace(conRegex, "$1'caution'$2'임신 확인 전 부주의로 복용 시 선천 기형을 유발하진 않으나, 지속적인 호르몬 노출은 예기치 못한 위험이 있으므로 임신 확인 직후 투여를 중지해야 합니다.'");

fs.writeFileSync('src/App.tsx', content);
