


const langLocal = localStorage.getItem('lang') || 'en';
const LangEN =  `
        <div class="webAcceptCookieBarShell">
          <p style="max-width:1024px; margin-bottom: 15px;">
           Cookies are used on this site. To provide you a better experience on our services. If you use our website as is with no changes to your settings. 
           We recognize that by using our website, you consent to receiving cookies.
            <a href="http://corporate.wacoal.co.th/privacy/policy_en.pdf" target="_blank" rel="noopener">
              Read More
            </a>
          </p>
          <button type="button" class="acceptBtn">Accept</button>
        </div>
      `
const LangTH = `
        <div class="webAcceptCookieBarShell">
          <p style="max-width:1070px; margin-bottom: 15px;">
            เราให้ความสำคัญต่อข้อมูลส่วนบุคคลของท่าน
            หากท่านใช้บริการเว็บไซต์นี้โดยไม่มีการปรับตั้งค่าใด ๆ
            แสดงว่าท่านยินยอมที่จะรับคุกกี้บนเว็บไซต์ของเรา
            <a href="http://corporate.wacoal.co.th/privacy/policy_th.pdf" target="_blank" rel="noopener">
              อ่านเพิ่มเติม
            </a>
          </p>
          <button type="button" class="acceptBtn">ยอมรับ</button>
        </div>
      `


class Cookie {



    constructor() {
      this.cookieName = "webAcceptCookie";
        this.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      this.init();
 

        
    }

    init() {
        
      if (!this.readCookie(this.cookieName)) {
        this.injectStyles();
        this.renderBar();
      }

      const clearBtn = document.querySelector(".pjClearCookie");
      if (clearBtn) {
        clearBtn.addEventListener("click", (e) => {
          e.preventDefault();
          this.eraseCookie(this.cookieName);
          location.reload();
        });
      }
    }

    // ✅ Cookie Functions
    createCookie(name, value, days = 365) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
    }

    readCookie(name) {
      const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
      return match ? match[2] : null;
    }

    eraseCookie(name) {
      this.createCookie(name, "", -1);
    }

    // ✅ Inject CSS + Theme + Animation
    injectStyles() {
      if (document.getElementById("webAcceptCookieCss")) return;

      const link = document.createElement("link");
      link.id = "webAcceptCookieCss";
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@600&family=Prompt&display=swap";
      document.head.appendChild(link);

      const style = document.createElement("style");
      style.textContent = `
        /* Common Styles */
        #webAcceptCookieBar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          width: 100%; padding: 15px 0;
          font-family: 'Prompt', sans-serif;
          text-align: center;
          opacity: 0; transform: translateY(100%);
          transition: transform 0.5s ease, opacity 0.5s ease;
          z-index: 9999;
          display: flex; justify-content: center;
        }

        #webAcceptCookieBar.show {
          opacity: 1;
          transform: translateY(0);
        }

        #webAcceptCookieBar p {
          font-size: 16px; line-height: 1.5; margin: 0 10px;
        }

        #webAcceptCookieBar a {
          text-decoration: underline; transition: color 0.3s;
        }

        #webAcceptCookieBar button {
          font-family: 'Prompt', sans-serif;
          padding: 8px 24px; margin-left: 15px;
          border-radius: 25px; border: none; cursor: pointer;
          transition: background 0.3s, transform 0.3s;
        }

        #webAcceptCookieBar button:hover {
          transform: scale(1.05);
        }

        /* Themes */
        #webAcceptCookieBar.dark {
          background-color: rgba(0,0,0,0.85);
          color: #fff;
          backdrop-filter: blur(5px);
        }
        #webAcceptCookieBar.dark a { color: #ffd700; }
        #webAcceptCookieBar.dark button { background-color: #737373; color: #fff; }
        #webAcceptCookieBar.dark button:hover { background-color: #656363; }

        #webAcceptCookieBar.light {
          background-color: rgba(255,255,255,0.85);
          color: #333;
          backdrop-filter: blur(5px);
        }
        #webAcceptCookieBar.light a { color: #217dacff; }
        #webAcceptCookieBar.light button { background-color: #90a4ae; color: #fff; }
        #webAcceptCookieBar.light button:hover { background-color: #8699a3; }

        /* Responsive */
        @media (max-width: 767px) {
          #webAcceptCookieBar p { font-size: 14px; }
          #webAcceptCookieBar button { margin-top: 10px; margin-left: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    // ✅ Render HTML Bar
    renderBar() {
      const bar = document.createElement("div");
      bar.id = "webAcceptCookieBar";
      bar.classList.add(this.theme);
      bar.innerHTML = langLocal == 'th'?LangTH:LangEN;
      document.body.appendChild(bar);

      // แสดงด้วย animation
      setTimeout(() => bar.classList.add("show"), 50);

      this.bindEvents();
    }

    bindEvents() {
      const acceptBtn = document.querySelector("#webAcceptCookieBar .acceptBtn");
      const bar = document.getElementById("webAcceptCookieBar");
      if (acceptBtn && bar) {
        acceptBtn.addEventListener("click", () => {
          this.createCookie(this.cookieName, "YES", 365);
          bar.classList.remove("show");
          setTimeout(() => bar.remove(), 500); // รอ animation จบ
        });
      }
    }
  }


export default Cookie;


