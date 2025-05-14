#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';




function create() {

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const targetDir = path.resolve(__dirname, '../../public/wacoalui');
const targetFile = path.join(targetDir, 'template.html');

console.log(targetDir);


// ตรวจสอบและสร้างโฟลเดอร์ถ้ายังไม่มี
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log('Created directory:', targetDir);
}

const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Wacoal UI</title>
  <link rel="stylesheet" href="dist/wacoalui.css">
</head>
<body>
  <h1>Hello from Wacoal UI</h1>
</body>
</html>
`;

// เขียนไฟล์
fs.writeFileSync(targetFile, htmlTemplate);
console.log('✅ template.html has been created in public/wacoalui');
}

create();




