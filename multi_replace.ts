import * as fs from 'fs';

function replaceSections(filePath: string, replacements: {start: number, end: number, contentPath: string}[]) {
    let fileContent = fs.readFileSync(filePath, 'utf-8');
    let lines = fileContent.split('\n');
    
    // Sort replacements backwards to avoid shifting index issues
    replacements.sort((a, b) => b.start - a.start);
    
    for (const r of replacements) {
        const newContent = fs.readFileSync(r.contentPath, 'utf-8');
        const before = lines.slice(0, r.start - 1);
        const after = lines.slice(r.end);
        lines = [...before, newContent.trimEnd(), ...after];
    }
    
    fs.writeFileSync(filePath, lines.join('\n'));
}

replaceSections('src/App.tsx', [
    { start: 519, end: 540, contentPath: 'replacement_7.txt' },
    { start: 1024, end: 1045, contentPath: 'replacement_11.txt' }
]);
