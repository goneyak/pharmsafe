/**
 * 의약품 데이터 무결성 검증.
 *
 * 이 검사가 없어서 2026-05-23 에 `brands` 누락 41건이 배포까지 갔고,
 * 검색창에 한 글자만 넣어도 앱이 죽는 상태로 방치됐다.
 * CI 가 이 스크립트를 돌리는 한 같은 사고는 머지 전에 멈춘다.
 *
 * 실행: npm test
 */
import { readFileSync } from 'node:fs';
import { MEDICATIONS, type Medication } from '../src/data/medications';
import { CATEGORY_PARENTS, CATEGORY_LEAVES } from '../src/data/categories';

const SAFETY = ['safe', 'caution', 'avoid'];
// 수유부 필드는 미출시라 여기 없다 — medications.lactation.ts 참고
const REQUIRED: (keyof Medication)[] = [
  'id', 'category', 'name', 'pregnancySafety', 'pregnancyNote',
];

const errors: string[] = [];
const warnings: string[] = [];

// 1. id 유일성 — 중복이면 React key 가 충돌하고 검색 결과가 섞인다
const byId = new Map<string, number>();
for (const m of MEDICATIONS) byId.set(m.id, (byId.get(m.id) ?? 0) + 1);
for (const [id, n] of byId) if (n > 1) errors.push(`중복 id '${id}' (${n}회)`);

// 2. 필수 필드 — 없으면 런타임에서 undefined 를 만진다
for (const m of MEDICATIONS) {
  for (const k of REQUIRED) {
    const v = m[k];
    if (typeof v !== 'string' || v.trim() === '') {
      errors.push(`[${m.id ?? '?'}] 필수 필드 '${String(k)}' 누락 또는 빈 값`);
    }
  }
  if (!SAFETY.includes(m.pregnancySafety)) {
    errors.push(`[${m.id}] pregnancySafety 값이 '${m.pregnancySafety}' — 허용: ${SAFETY.join('|')}`);
  }
}

// 3. 카테고리 도달성 — 어느 진입점으로도 못 여는 레코드가 없어야 한다
const reachable = new Set<string>(CATEGORY_LEAVES);
for (const [parent, children] of Object.entries(CATEGORY_PARENTS)) {
  reachable.add(parent);
  children.forEach((c) => reachable.add(c));
}
for (const m of MEDICATIONS) {
  if (!reachable.has(m.category)) errors.push(`[${m.id}] category '${m.category}' 는 UI 에서 도달 불가`);
}

// 4. 동일 성분 중복 — 판정이 갈리면 약사가 상충하는 카드를 동시에 본다
const byName = new Map<string, Medication[]>();
for (const m of MEDICATIONS) byName.set(m.name, [...(byName.get(m.name) ?? []), m]);
for (const [name, group] of byName) {
  if (group.length < 2) continue;
  const labels = new Set(group.map((g) => g.pregnancySafety));
  const ctx = group.every((g) => g.indication || g.formulation || g.doseNote);
  if (labels.size > 1 && !ctx) {
    errors.push(
      `동일 성분 '${name}' 이 ${group.length}건인데 라벨이 갈림 (${[...labels].join(' vs ')}) ` +
      `— indication / formulation / doseNote 로 맥락을 밝히지 않으면 상충하는 카드가 함께 노출된다`,
    );
  } else if (labels.size > 1) {
    warnings.push(`동일 성분 '${name}' 라벨 상이 (${[...labels].join(' vs ')}) — 맥락 필드로 구분됨`);
  }
}

// 5. 수유부 초안이 앱 번들로 새지 않는지 — 실제로 이 사고가 났다
const appSrc = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf-8');
if (/medications\.lactation/.test(appSrc)) {
  errors.push('App.tsx 가 medications.lactation 을 import 한다 — 미검증 수유부 문구가 번들로 배포된다');
}

// 6. 출처 커버리지 — 실패시키지 않는다. 다만 매번 눈에 보이게 한다
const cited = MEDICATIONS.filter((m) => m.source?.page).length;
const pct = ((cited / MEDICATIONS.length) * 100).toFixed(1);

console.log(`레코드 ${MEDICATIONS.length}건 검사`);
console.log(`원문 출처 명시: ${cited}/${MEDICATIONS.length} (${pct}%)`);
if (warnings.length) {
  console.log(`\n경고 ${warnings.length}건`);
  warnings.forEach((w) => console.log(`  · ${w}`));
}
if (errors.length) {
  console.error(`\n실패 ${errors.length}건`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  process.exit(1);
}
console.log('\n통과');
