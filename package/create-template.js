#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import https from 'https'; // สำหรับโหลด JSON จาก https
import http from 'http';   // เผื่อใช้กับ http
import { URL } from 'url';



function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    lib.get(url, (res) => {
      let data = '';

      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (err) {
          reject(new Error('❌ Invalid JSON response'));
        }
      });
    }).on('error', (err) => {
      reject(new Error('❌ Failed to fetch URL: ' + err.message));
    });
  });
}


async function create() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const targetDir = path.resolve(__dirname, '../../public/wacoalui');
  const targetFile = path.join(targetDir, 'template.html');


   const args = process.argv.slice(2);

  if (args[0] !== 'add' || args[1] !== 'url' || !args[2]) {
    console.error("❌ กรุณาระบุคำสั่งเช่น: npx wacoalui-template-init add url https://yourdomain.com/code.json");
    return;
  }

  const extractedUrl = args[2];

  // console.log(extractedUrl);
  // console.log(args[2]);
  
  

  if (!extractedUrl) {
    console.error("❌ กรุณาระบุ URL เช่น: npx name-bin url('https://yourdomain.com/code.json')");
    return;
  }




  try {
    const json = await fetchJSON(extractedUrl);

    if (!json.code) {
      console.error('❌ JSON ไม่พบ key "code"');
      return;
    }

    // สร้างโฟลเดอร์ถ้ายังไม่มี
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log('📁 Created directory:', targetDir);
    }

    // เขียนไฟล์ HTML
    fs.writeFileSync(targetFile, json.code);
    console.log('✅ template.html has been created in public/wacoalui');
  } catch (err) {
    console.error(err.message);
  }
}

create();




