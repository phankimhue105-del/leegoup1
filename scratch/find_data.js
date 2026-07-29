const fs = require('fs');
const path = require('path');

const searchDir = "c:/Users/ASUS/Desktop/LeeGo/TẠO APP - UP 1/leegoup1";
const terms = ["InteractiveGame", "practiceQuestions", "curriculum", "Lesson 3", "checkUp"];

function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            if (file === 'node_modules' || file === '.git' || file === 'scratch') continue;
            walk(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json')) {
            try {
                const content = fs.readFileSync(fullPath, 'utf8');
                const found = terms.filter(t => content.includes(t));
                if (found.length > 0) {
                    console.log(`${file}: found [${found.join(', ')}]`);
                }
            } catch (e) {}
        }
    }
}

walk(searchDir);
