import * as fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. We had duplicate '피부계' in CLINICAL_GUIDES because of greedy regex replacement in `update_derm.ts` on '소화기':
const badGuidesBlock = `'피부계': [
    { id: '여드름', label: '여드름', icon: Zap, dx: -50, dy: -60 },
    { id: '아토피피부염', label: '아토피피부염', icon: Shield, dx: 50, dy: -60 },
    { id: '건선', label: '건선', icon: Activity, dx: -50, dy: 60 },
    { id: '소양증', label: '소양증(가려움)', icon: Droplets, dx: 50, dy: 60 },
  ],
  '피부계': ['여드름', '아토피피부염', '건선', '소양증', '피부계'],
        '소화기': '임산부 속쓰림은 흔하지만, 약물 선택에 유의해야 합니다. 특히 **현호색(Corydalis)** 성분은 자궁 수축 및 유산 위험이 있어 액상 소화제 구매 시 함유 여부를 반드시 확인해야 합니다. 생활 습관 교정과 안전한 제산제를 우선하십시오.',`;

const fixedGuidesBlock = `'소화기': '임산부 속쓰림은 흔하지만, 약물 선택에 유의해야 합니다. 특히 **현호색(Corydalis)** 성분은 자궁 수축 및 유산 위험이 있어 액상 소화제 구매 시 함유 여부를 반드시 확인해야 합니다. 생활 습관 교정과 안전한 제산제를 우선하십시오.',`;

content = content.replace(badGuidesBlock, fixedGuidesBlock);

// 2. Add '피부계' cleanly to `SUB_NODES`
const subNodesRegex = /const SUB_NODES: Record<string, { id: string; label: string; icon: any; dx: number; dy: number }\[\]> = {/g;
const subNodesFix = `const SUB_NODES: Record<string, { id: string; label: string; icon: any; dx: number; dy: number }[]> = {
  '피부계': [
    { id: '여드름', label: '여드름', icon: Zap, dx: -50, dy: -60 },
    { id: '아토피피부염', label: '아토피피부염', icon: Shield, dx: 50, dy: -60 },
    { id: '건선', label: '건선', icon: Activity, dx: -50, dy: 60 },
    { id: '소양증', label: '소양증(가려움)', icon: Droplets, dx: 50, dy: 60 },
  ],`;
content = content.replace(subNodesRegex, subNodesFix);

// 3. Add '피부계' to parentCategories properly
const parentCatRegex = /const parentCategories: Record<string, string\[\]> = {/g;
const parentCatFix = `const parentCategories: Record<string, string[]> = {
        '피부계': ['여드름', '아토피피부염', '건선', '소양증', '피부계'],`;
content = content.replace(parentCatRegex, parentCatFix);

fs.writeFileSync('src/App.tsx', content);
console.log('Fixed syntax mapping errors in App.tsx');
