 const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const exts = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'];
const bad = [];

function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (exts.includes(path.extname(p).toLowerCase())) bad.push(p);
  }
}
walk('./assets');

(async () => {
  for (const p of bad) {
    try {
      await sharp(p).metadata();
    } catch (e) {
      console.log('❌ 坏图:', p, '—', e.message);
    }
  }
  console.log('检查完毕，共扫描', bad.length, '张图片');
})();
