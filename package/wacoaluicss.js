// โหลด key จาก environment
const VALID_KEY = import.meta.env.WACOALUI_TOKEN; // Vite
  
// ถ้าใช้ Create React App (CRA) ให้ใช้: process.env.REACT_APP_WACOAL_CSS_KEY
// const VALID_KEY = process.env.REACT_APP_WACOAL_CSS_KEY;

if (!VALID_KEY) {
  console.error("❌ CSS Key not found in .env");
  return;
}

const href = `https://wacoalui.wacoal.co.th/wacoalUi/css/${VALID_KEY}`;

// ตรวจสอบว่าโหลดแล้วหรือยัง
if (document.querySelector(`link[href="${href}"]`)) {
  console.warn("CSS already loaded:", href);
  return;
}

const link = document.createElement("link");
link.rel = "stylesheet";
link.href = href;
link.onload = () => console.log("✅ CSS loaded:", href);
link.onerror = () => console.error("❌ Failed to load CSS:", href);
document.head.appendChild(link);