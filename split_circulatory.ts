import * as fs from 'fs';

const filePath = 'src/App.tsx';
let fileContent = fs.readFileSync(filePath, 'utf-8');

// 1. Assign explicit subcategories based on ID
const catMap: Record<string, string> = {
  '7-1-1': '고혈압',
  '7-1-2': '고혈압',
  '7-1-3': '고혈압',
  '7-1-4': '고혈압',
  '7-1-5': '고혈압',
  '7-3-3': '고혈압',
  '7-3-6': '고혈압',
  '7-4-6': '고혈압',
  '7-2-1': '부정맥/심부전',
  '7-2-2': '부정맥/심부전',
  '7-3-1': '부정맥/심부전',
  '7-3-2': '부정맥/심부전',
  '7-3-4': '부정맥/심부전',
  '7-3-5': '부정맥/심부전',
  '7-4-1': '부정맥/심부전',
  '7-4-2': '부정맥/심부전',
  '7-4-7': '부정맥/심부전',
  '7-4-3': '이뇨제',
  '7-4-4': '이뇨제',
  '7-4-5': '이뇨제',
  '11-1-1': '항응고/혈전',
  '11-1-2': '항응고/혈전',
  '11-3-1': '항응고/혈전',
  '11-3-2': '항응고/혈전',
  '11-3-3': '항응고/혈전',
  '11-4-1': '항응고/혈전',
  '11-4-2': '항응고/혈전',
};

for (const [id, newCat] of Object.entries(catMap)) {
  const regex = new RegExp(`(id:\\s*'${id}',\\n\\s*category:\\s*)'[^']+'`, 'g');
  fileContent = fileContent.replace(regex, `$1'${newCat}'`);
}

// 2. Add '순환기' to SUB_NODES
const subNodesAddition = `  '감염/항생제': [
    { id: '항생제', label: '항균제 (Antibiotics)', icon: Shield, dx: -50, dy: -60 },
    { id: '결핵/바이러스', label: '결핵/바이러스', icon: Activity, dx: 50, dy: -60 },
    { id: '백신/진균', label: '백신/진균/원충', icon: Droplets, dx: 0, dy: 60 },
  ],
  '순환기': [
    { id: '고혈압', label: '항고혈압제', icon: Heart, dx: -60, dy: -60 },
    { id: '부정맥/심부전', label: '부정맥/심부전', icon: Activity, dx: 60, dy: -60 },
    { id: '항응고/혈전', label: '항응고/혈전', icon: Shield, dx: -40, dy: 60 },
    { id: '이뇨제', label: '이뇨제', icon: Droplets, dx: 60, dy: 60 },
  ]
};`;
fileContent = fileContent.replace(/(  '감염\/항생제': \[\s*\{ id: '항생제'[\s\S]*?\],\s*\{ id: '백신\/진균'[\s\S]*?\}\s*\]\n\};)/, subNodesAddition);

// 3. Update CATEGORIES array
const categoriesOld = /const CATEGORIES = \['전체', ...SYMPTOM_NODES\.map\(node => node\.id\), '입덧', '변비', '설사', '소화불량', '속쓰림', '면역\/염증', '감기', '천식', '비염', '혈관부종', '항생제', '결핵\/바이러스', '백신\/진균'\];/;
const categoriesNew = `const CATEGORIES = ['전체', ...SYMPTOM_NODES.map(node => node.id), '입덧', '변비', '설사', '소화불량', '속쓰림', '면역/염증', '감기', '천식', '비염', '혈관부종', '항생제', '결핵/바이러스', '백신/진균', '고혈압', '부정맥/심부전', '항응고/혈전', '이뇨제'];`;
fileContent = fileContent.replace(categoriesOld, categoriesNew);

// 4. Update parentCategories
const parentCatAddition = `'순환기': ['고혈압', '부정맥/심부전', '항응고/혈전', '이뇨제', '순환기'],
        '감염/항생제': ['항생제', '결핵/바이러스', '백신/진균', '감염/항생제'],`;
fileContent = fileContent.replace(/'감염\/항생제': \['항생제', '결핵\/바이러스', '백신\/진균', '감염\/항생제'\],/, parentCatAddition);


fs.writeFileSync(filePath, fileContent);
console.log('Successfully completed circulatory sub-categories split.');
