class Loadcss {
  constructor({ token = "" }) {
    this.token = token || '';
    this.createLoadCSS();
  }
  createLoadCSS() {
    let VALID_KEY;

    let token = this.token;
    if (token == '') {

      // เช็คว่าใช้กับ Vite
      if (typeof import.meta !== "undefined" && import.meta.env?.WACOALUI_TOKEN) {
        VALID_KEY = import.meta.env.WACOALUI_TOKEN;
      }

      // ถ้าใช้ Create React App หรือ Webpack
      if (!VALID_KEY && typeof process !== "undefined" && process.env?.WACOALUI_TOKEN) {
        VALID_KEY = process.env.WACOALUI_TOKEN;
      }

      if (!VALID_KEY) {
        console.error("❌ CSS Key not found in env");
        return;
      }
    } else {
      VALID_KEY = token;
    }



    const href = `https://wacoalui.wacoal.co.th/wacoalUi/css/${VALID_KEY}`;

    if (document.querySelector(`link[href="${href}"]`)) {
      console.warn("⚠️ CSS already loaded:", href);
      return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => console.log("✅ CSS loaded:", href);
    link.onerror = () => console.error("❌ Failed to load CSS:", href);
    document.head.appendChild(link);
  }
}
export default Loadcss;


