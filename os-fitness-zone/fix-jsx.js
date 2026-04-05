import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src/pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'Home.jsx');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Fix HTML comments
  content = content.replace(/<!--(.*?)-->/g, '{/*$1*/}');

  // Fix unclosed tags like <br>, <hr>
  content = content.replace(/<br>/g, '<br />');
  content = content.replace(/<hr>/g, '<hr />');

  // Fix 'for' to 'htmlFor'
  content = content.replace(/\bfor="/g, 'htmlFor="');

  // Fix any remaining styles that might be invalid like style="margin-top: 10px"
  content = content.replace(/style="[^"]*"/g, '');

  fs.writeFileSync(filePath, content);
  console.log('Fixed', file);
}
