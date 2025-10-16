class AlertBox {

 
    constructor({ title = "", text = "", type = "",position="", autoClose = "" ,buttonApprove="",buttonApproveText="",buttonClose="",buttonCloseText="",fade=""}) {
        this.title = title;
        this.text = text;
        this.type = type || 'normal';
        this.position = position || 'center';
        this.autoClose = autoClose*1000;
        this.buttonApprove = buttonApprove;
        this.buttonClose = buttonClose;
        this.buttonApproveText = buttonApproveText || 'OK';
        this.buttonCloseText = buttonCloseText || 'Close';
        this.fade = fade || 2;
      
        if(this.position == ''){
            this.position = 'center';
        }

        switch (this.type) {
            case 'approve':
                this.icon = 'uil-check';
                break;
            case 'error':
                this.icon = 'uil uil-times';
                break;
            case 'pending':
                    this.icon = 'uil uil-exclamation';
                    break;
            default:
                this.icon = 'uil uil-info-circle';
                break;
        }

        this.promise = new Promise((resolve) => {
            this.resolve = resolve;
        });

        setTimeout(() => {
        this.createAlert();
        }, 300);
    }

     updateAlertBoxPositions() {
        let bottomPosition = 140; 

        const alertBoxes = Array.from(document.querySelectorAll('.alert-box')).reverse();
    
        alertBoxes.forEach((checkAlertboxActive) => {

            let heightbox = checkAlertboxActive.scrollHeight;
            const positionbox = checkAlertboxActive.classList.contains(`alert-position-${this.position}`);
            if(positionbox){
                if(checkAlertboxActive.classList.contains('alert-position-br')){
                    checkAlertboxActive.style.bottom = bottomPosition + 'px';
                    bottomPosition += heightbox + 10;
                }
                if(checkAlertboxActive.classList.contains('alert-position-bl')){
                    checkAlertboxActive.style.bottom = bottomPosition + 'px';
                    bottomPosition += heightbox + 10;
                }
                if(checkAlertboxActive.classList.contains('alert-position-tl')){
                    checkAlertboxActive.style.top = bottomPosition + 'px';
                    bottomPosition += heightbox + 10;
                }
                if(checkAlertboxActive.classList.contains('alert-position-tr')){
                    checkAlertboxActive.style.top = bottomPosition + 'px';
                    bottomPosition += heightbox + 10;
                }
                if(checkAlertboxActive.classList.contains('alert-position-center')){
                    checkAlertboxActive.classList.remove('show');
                }
            }
           

        });
    }

    createAlert() {

        if(this.fade == 0){
            this.updateAlertBoxPositions();
        }

        // console.log(allheight);
        

        let alertpositionBox = `alert-box alert-position-${this.position}`;
        let alertTypeBox = `alert-${this.type}`;
        `alert-${this.type}`;

        let ids = Math.random().toString(36).slice(2);

        const body = document.body;
        const html = `<div class='`+alertpositionBox+`' id='${ids}'>
            <div class="alert-body `+alertTypeBox+`">
                <div class="alert-icon">
                    <div class="icon">
                        <i class="`+this.icon+`"></i>
                    </div>
                </div>
                <div class="alert-text">
                    <p class="title"><b>`+this.title+`</b></p>
                    <p class="description">`+this.text+`</p>
                    <div class="alert-btn">
                    ${this.buttonClose ? `<button class="alert-btn-close">`+this.buttonCloseText+`</button>` : ''}
                    ${this.buttonApprove ? `<button class="alert-btn-true" >`+this.buttonApproveText+`</button>` : ''}
                    </div>
                </div>
            </div>
        </div>
        ${this.fade != 0?`<div class="alert-fade bg-fade-${this.fade}"></div>`:''}

        `;
        body.insertAdjacentHTML('beforeend', html);

        const alertdata = document.getElementById(ids);
        const alertfade = document.getElementsByClassName('alert-fade');
        
        setTimeout(() => {
            alertdata.classList.add('show');

            if(this.fade != 0){
                alertfade[0].classList.add('fade-show');
            }
        }, 50);

          // ตั้งเวลาปิดอัตโนมัติ
          if (this.autoClose) {
            setTimeout(() => {
                this.closeAlert(alertdata);
                if(this.fade != 0){
                    alertfade[0].remove();
                }
            }, this.autoClose);
        }

        if(this.fade != 0){
            alertfade[0].addEventListener('click', () => {
                this.closeAlert(alertdata);
                alertfade[0].remove();
            });
        }

         if(this.buttonClose){
            const closeButton = alertdata.querySelector('.alert-btn-close');
            closeButton.addEventListener('click', (e) => {
                this.resolve({ event: e, action: 'close' });  // ทำให้ .then() ทำงาน
                this.closeAlert(alertdata);
                if(this.fade != 0){
                    alertfade[0].remove();
                }
            });
        }

        if(this.buttonApprove){
            const okButton = alertdata.querySelector('.alert-btn-true');
            okButton.addEventListener('click', (e) => {
                this.resolve({ event: e, action: 'approve' });  // ทำให้ .then() ทำงาน
                this.closeAlert(alertdata);  // ปิด AlertBox
                if(this.fade != 0){
                    alertfade[0].remove();
                }

            });
        }
       
    }

    closeAlert(alertdata) {
        alertdata.classList.remove("show");
        setTimeout(() => {
        alertdata.remove();
        }, 50);
    }

    closeAlertbefore(alertdata){
        alertdata.remove();

    }

    then(callback) {
        return this.promise.then(callback);
    }
}

// ปิดเมื่อกด ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.getElementById("custom-alert")?.classList.remove("show");
    }
});

class Modalbox{

    constructor({name = ""}) {
        this.name = name;
        this.createModal();
    }  

    createModal(){
      
       document.querySelectorAll('.modal-link').forEach((modaldata)=>{
    modaldata.addEventListener('click', () => {
        let name = modaldata.getAttribute("data-modal");
        let fade = modaldata.getAttribute("data-fade");
        console.log(name);
        
        if(name){
           const position =  modaldata.getAttribute('data-position');
            console.log(position);
            
           if(position){
            const modalbox = document.getElementById(name);
                modalbox.classList.add('modal-slide-show');
                modalbox.classList.add(`modal-slide-${position}`);
                setTimeout(() => {
                modalbox.classList.add(`modal-slide-show-${position}`);
                }, 50);
           }else {
            const modalbox = document.getElementById(name);
            modalbox.style.display = 'block';
                    setTimeout(() => {
                     modalbox.classList.add('show-modal');
                    }, 100);
           }
        //    เปิด fade
           if(fade){
            const body = document.body;
            const html = `<div class="modal-fade" id='fade${name}'></div>`;
            body.insertAdjacentHTML('beforeend', html);
            setTimeout(() => {
                const fadelist = document.getElementById(`fade${name}`);
                    fadelist.classList.add('show-modal-fade');
            }, 50);

        }

          
        }                
    });
});


document.body.addEventListener('click', (event) => {
    const closeButton = event.target.closest('[data-closemodal]');
    if (closeButton) {
        const modalBox = closeButton.closest('.modal-wrap');
        const modalBox_slide = closeButton.closest('.modal-slide-wrap');
                
        if(modalBox){
            modalBox.classList.remove('show-modal');
             setTimeout(() => {
                       modalBox.style.display = ''; 
            }, 300);
        }
        if(modalBox_slide){
            modalBox_slide.classList.remove('modal-slide-show');
            setTimeout(() => {
                modalBox_slide.classList.remove('modal-slide-show-left');
                modalBox_slide.classList.remove('modal-slide-show-right');
            }, 50);
            setTimeout(() => {
                modalBox_slide.classList.remove('modal-slide-left');
                modalBox_slide.classList.remove('modal-slide-right');
            }, 350);
            
        }
        document.querySelectorAll('.modal-fade').forEach((fade)=>{
            fade.classList.remove('show-modal-fade');
            setTimeout(() => {
                fade.remove();
            }, 300);
        });
        
    }
});

        
    }

   
}

// ปิดเมื่อกด ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.getElementById("custom-alert")?.classList.remove("show");
    }
});

class Animate {
    constructor({ icon = '' }) {
        // this.name = name;
        this.createAnimate();
    }

    createAnimate() {
        const animationDuration = 3000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(animationDuration / frameDuration);
        const easeOutQuad = (t) => t * (2 - t);

        // ฟังก์ชันสำหรับการ run animation
        function animateCountUp(el) {
            let breaktype = el.getAttribute("data-break");
            let frame = 0;

            if (breaktype === 'comma') {
                let rawValue = el.innerHTML.replace(/,/g, '');
                const countTo = parseFloat(rawValue);
                const hasDecimal = rawValue.includes('.');
                const decimalPart = hasDecimal ? rawValue.split('.')[1] : '';
                const digit = decimalPart.length;

                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = countTo * progress;

                    const localeOptions = hasDecimal
                        ? {
                            minimumFractionDigits: digit,
                            maximumFractionDigits: digit,
                        }
                        : {};

                    el.innerHTML = currentCount.toLocaleString('en-US', localeOptions);

                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);

            } else if (breaktype === 'dot') {
                let digit = el.getAttribute("data-digit") || 1;
                const countTo = parseFloat(el.innerHTML.replace(/,/g, ''));
                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = countTo * progress;
                    el.innerHTML = currentCount.toLocaleString('en-US', {
                        minimumFractionDigits: digit,
                        maximumFractionDigits: digit,
                    });
                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);

            } else {
                const countTo = parseInt(el.innerHTML, 10);
                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = Math.round(countTo * progress);
                    el.innerHTML = currentCount;
                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);
            }
        }

        // เริ่มใช้ IntersectionObserver
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp(entry.target); // เริ่ม animation
                    observer.unobserve(entry.target); // ทำครั้งเดียว
                }
            });
        }, { threshold: 0.5 }); // ปรับ threshold ตามต้องการ

        // สมัคร observer ให้ทุก .timer
        document.querySelectorAll('.timer').forEach(el => {
            observer.observe(el);
        });

        // console.log(countupEls);


        // countupEls.forEach(animateCountUp);
    }
}

class Dropdown {


    constructor({ icon = "" }) {
        // this.name = name;
        this.createDropdown();
    }

    createDropdown() {


        document.querySelectorAll(".dropdown-link").forEach((menu) => {
            menu.addEventListener("click", function () {
                const name = this.getAttribute("data-name");
                const menucontent = document.getElementById(name);
                menucontent.scrollHeight;
                const Widthmenu = menucontent.scrollWidth;
                const boxwidth = menu.scrollWidth;

                let counts = 0;
                menucontent.querySelectorAll("li").forEach((dropbox, index) => {
                    counts += 1;
                });

                if (menu.classList.contains("dropdown-active")) {
                    menu.classList.remove("dropdown-active");
                    menucontent.classList.remove("dropdown-show");
                    menucontent.style.height = "";
                    menucontent.style.width = "";
                    setTimeout(() => {
                        menucontent.classList.remove("left-0", "right-0");

                    }, 300);

                } else {
                    menu.classList.add("dropdown-active");
                    menucontent.classList.add("dropdown-show");
                    menucontent.style.height = 34 * counts + 20 + "px";

                    if (Widthmenu < boxwidth) {
                        menucontent.style.width = boxwidth + 20 + "px";
                    } else {
                        menucontent.style.width = Widthmenu + 20 + "px";
                    }

                    // ตรวจสอบตำแหน่งของ element
                    const rect = menu.getBoundingClientRect();
                    const windowWidth = window.innerWidth;

                    // ลบ class ก่อนเพิ่มใหม่
                    menucontent.classList.remove("left-0", "right-0");

                    if (rect.left < 100) {
                        // ใกล้ด้านซ้าย
                        menucontent.classList.add("left-0");
                    } else if (windowWidth - rect.right < 100) {
                        // ใกล้ด้านขวา
                        menucontent.classList.add("right-0");
                    }
                }
            });
        });


    }
}

// ปิดเมื่อกด ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.getElementById("custom-alert")?.classList.remove("show");
    }
});

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

class SetLoading {

    constructor({ MaincolorLoading = "", SubcolorLoading = "", colorLoading2 = "", colorLoading3 = "", colorLoading4 = "", EventpageLoad = "" }) {
        this.MaincolorLoading = MaincolorLoading || '#2c2c2c';
        this.SubcolorLoading = SubcolorLoading || '#dbdcef';
        this.colorLoading2 = colorLoading2 || '#ff4545';
        this.colorLoading3 = colorLoading3 || '#ffbf47';
        this.colorLoading4 = colorLoading4 || '#a6ff7c';
        this.EventpageLoad = EventpageLoad || 'false';
        this.createSetLoading();
    }

    createSetLoading() {
        // Set custom CSS properties for colors
        document.documentElement.style.setProperty('--main-loading-color', this.MaincolorLoading);
        document.documentElement.style.setProperty('--sub-loading-color', this.SubcolorLoading);
        document.documentElement.style.setProperty('--loading-color-2', this.colorLoading2);
        document.documentElement.style.setProperty('--loading-color-3', this.colorLoading3);
        document.documentElement.style.setProperty('--loading-color-4', this.colorLoading4);

        // If EventpageLoad is true, show a loading page
        if (this.EventpageLoad === 'true') {
            const htmlload = `<div class='loadpage loadshow' id="loadpage">
            <div class="spinner-cube">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </div>
                </div>`;
            const body = document.body;
            body.insertAdjacentHTML('afterbegin', htmlload);

            window.addEventListener("load", function () {
                const loadpage = document.getElementById('loadpage');
                loadpage.classList.remove('loadshow');

                setTimeout(() => {
                    loadpage.remove();
                }, 300);
            });
          
        }
    }
}

async function getLoadingIcon(icon) {
    
  try {
    const response = await fetch('https://wacoalui.wacoal.co.th/api/loading/icon/'+icon);
    
    if (!response.ok) {
      console.error('HTTP Error:', response);
      return 'Error';
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Network Error:', error);
    return 'Error';
  }
}

class Loading {

    constructor({EventpageLoad = "",LoadIcon = "",ScrollLock="" }) {  
        this.EventpageLoad = EventpageLoad || 'false';
        this.LoadIcon = LoadIcon || 'spinner-basic';
        this.ScrollLock = ScrollLock || 'false';

        this.createSetLoading();
    }


    async createSetLoading() {
        // รอให้โหลด icon เสร็จก่อน
        const icondata = await getLoadingIcon(this.LoadIcon);

        // สร้าง element
        const div = document.createElement("div");
        const icon = document.createElement("div");

        div.classList.add('load_wrap');
        

        // ถ้ามี html จาก API เช่น <div class="spinner-basic"></div>
        if (icondata && icondata.icon.htmlcode) {
            icon.innerHTML = icondata.icon.htmlcode;
        }else {
            icon.innerHTML = `<div class="spinner-basic"></div>`;
        }

        

        div.appendChild(icon);
        document.body.appendChild(div);
        if(this.ScrollLock){
          document.body.classList.add('overflow-hidden');
        }else {
          document.body.classList.remove('overflow-hidden');

        }

        // แสดง/ซ่อนตาม EventpageLoad
        if (this.EventpageLoad) {
            document.querySelectorAll(".load_wrap").forEach((load, index) => {
            if (index === 0) {
                load.classList.add('load_show');
            }
            });
        } else {
            document.querySelectorAll(".load_wrap").forEach(load => {
            load.classList.remove('load_show');
            });cd;
        }
        }
}

class MenuDropdown {


    constructor({ icon = ""}) {
        // this.name = name;
        this.createDropdown();
    }  

    createDropdown(){
 

    document.querySelectorAll(".menu-dropdown").forEach((menu) => {
        const icon = menu.getAttribute("data-icon");
        if(icon){
            if(icon == 'true'){
                menu.classList.add('showicon');
            }else {
                menu.classList.remove('showicon');

            }

        }
      

        menu.addEventListener("click", function () {
            let name = this.getAttribute("data-name"); // หรือ this.dataset.name
            const menucontent = document.getElementById(name);
            const heightmenu = menu.scrollHeight;

            const isOpen = menucontent.classList.contains('show');
            const showicon = menu.classList.contains('showicon');

          

                if (isOpen) {
              
                menucontent.classList.remove('show');
                menu.style.height = '38px';

                if(showicon){
                menu.classList.remove('showiconup');
                }
                } else {
                    menucontent.classList.add('show');
                    menu.style.height = heightmenu + 'px';
                    if(showicon){
                        menu.classList.add('showiconup');
                    }
                }


          
        });
      });


    }
}

// ปิดเมื่อกด ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.getElementById("custom-alert")?.classList.remove("show");
    }
});

class Notification {

    constructor() {
        this.createNotification();
    }

    createNotification() {
       
        document.querySelectorAll(".notification-btn").forEach((notification) => {
            notification.addEventListener('click', () => {
                const notiname = notification.getAttribute("data-notification");
                const notibox = document.getElementById(notiname);
                if(notibox){
                        if(notibox.classList.contains('show-notification')){
                            notibox.classList.remove('show-notification');
                        }else {
                            notibox.classList.add('show-notification');
                        }
                }
        
            });
        });
        
        document.querySelectorAll(".notification-close").forEach((notificationclose) => {
            notificationclose.addEventListener('click', () => {
                    document.querySelectorAll(".notification").forEach((notification) => {
        
                        if(notification.classList.contains('show-notification')){
                            notification.classList.remove('show-notification');
                        }
                        
                    });
        
            });
        });


    }
}

class setColor{


    constructor({ maincolor = "", subcolor="",maintextcolor = "", subtextcolor="",bodycolor="",autoTheme=false}) {
        this.maincolor = maincolor || '#202020';
        this.subcolor = subcolor || '#646464';
        this.maintextcolor = maintextcolor || '#202020';
        this.subtextcolor = subtextcolor || '#646464';
        this.bodycolor = bodycolor || '#ffffff';
        this.autoTheme = autoTheme;

        
        this.createColor();
    }   

    createColor(){
        document.documentElement.style.setProperty('--main-color', this.maincolor);
        document.documentElement.style.setProperty('--sub-color', this.subcolor);
        document.documentElement.style.setProperty('--main-text-color', this.maintextcolor);
        document.documentElement.style.setProperty('--sub-text-color', this.subtextcolor);

        if(this.autoTheme == true){
            function setThemeBasedOnTime() {
                const now = new Date();
                const hours = now.getHours(); // เวลาเป็นชั่วโมง (0 - 23)
                // เช็คว่าเวลาปัจจุบันอยู่ระหว่าง 06:00 - 18:00 หรือไม่
                if (hours >= 6 && hours < 18) {
                      // โหมดกลางวัน
                        document.documentElement.style.setProperty('--body-color', '#ffffff'); // สีขาว (โหมดกลางวัน)
                } else {
                     // โหมดกลางคืน
                     document.documentElement.style.setProperty('--body-color', '#111214'); // สีดำ (โหมดกลางคืน)
                     document.documentElement.style.setProperty('--main-text-color', '#ffffff');
                     document.documentElement.style.setProperty('--sub-text-color', '#ffffff');

                   
                }
            }
          
            setThemeBasedOnTime();
            // อัพเดททุกๆ 10 นาที (600000 ms) เพื่อให้ตรวจสอบเวลาซ้ำ
            setInterval(setThemeBasedOnTime, 600000);
        }else {
            document.documentElement.style.setProperty('--body-color', this.bodycolor);
        }
    }
}

class Slider {
    constructor({}) {
        this.createSlider();
    }

    createSlider() {
        document.querySelectorAll('.slider').forEach((slider) => {            
             const valueDisplay = slider.nextElementSibling;
            const rootStyle = getComputedStyle(document.documentElement);
            const mainColor = rootStyle.getPropertyValue('--main-color').trim();
            const subColor = '#ffffff'; // หรือใช้ CSS var ได้เช่นกัน

            function calcValue() {
                const valuePercentage = (slider.value / slider.max) * 100;
                slider.style.background = `linear-gradient(to right, ${mainColor} ${valuePercentage}%, ${subColor} ${valuePercentage}%)`;
                if (valueDisplay) valueDisplay.textContent = slider.value;
            }

            // เรียกครั้งแรกเพื่อให้มี background ถูกต้องตอนโหลด
            calcValue();

            // ผูก event 'input' เพียงครั้งเดียว
            slider.addEventListener('input', () => {
                calcValue();
            });


        });
      

    }
}

class Tab {
    constructor({ icon = ""}) {
        // this.name = name;
        this.createTab();

        setTimeout(() => {
            this.activeTab();
          }, 0);
        // alert('test')
    }  

    createTab(){
        
        document.querySelectorAll(".tab button").forEach((btn) => {

            btn.addEventListener("click", function () {

              const nameBody = this.dataset.namebody;
              const tabParent = this.closest(".tab");
              const tabContent = tabParent ? tabParent.dataset.tabcontent : null;
          
            //   console.log("data-namebody:", nameBody);
            //   console.log("data-tabcontent (from parent):", tabContent);

          
              const target = document.querySelector(`.tab-body[data-tabcontent="${tabContent}"]`);

              if (!target) return;

                const sameTabButtons = document.querySelectorAll(`.tab[data-tabcontent="${tabContent}"] button`);
                sameTabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const left = btn.offsetLeft;
                const width = btn.offsetWidth;
              
                // ใส่ลง CSS variable ที่ .tab
                tabParent.style.setProperty('--underline-left', `${left}px`);
                tabParent.style.setProperty('--underline-width', `${width}px`);



              // 2. ซ่อน div ทุกตัวภายใน .tab-body
              target.querySelectorAll('.tab-content').forEach(el => {
                el.style.display = 'none';
              });
            
              // 3. แสดง div ที่มี data-namebody ตรงกับ nameBody
              const targetDiv = target.querySelector(`[data-namepage="${nameBody}"]`);
              if (targetDiv) {
                targetDiv.style.display = 'block';
              }

            });
          });


    }
    activeTab(){
        document.querySelectorAll('.tab button').forEach(btn => {
            const btnactive = btn.classList.contains('active');
            if(btnactive){

                const left = btn.offsetLeft;
                const width = btn.offsetWidth;

                const tabParent = btn.closest(".tab");
                tabParent ? tabParent.dataset.tabcontent : null;

                // ใส่ลง CSS variable ที่ .tab
                tabParent.style.setProperty('--underline-left', `${left}px`);
                tabParent.style.setProperty('--underline-width', `${width}px`);
                
            }
            
        });
      }


  
}

class Menuhide {
    constructor({ icon = '' }) {
        // this.name = name;
        this.createMenuhide();
    }

    createMenuhide() {
        document.querySelectorAll('.menu-hide-btn').forEach((menus)=>{
            menus.addEventListener('click',function(){
                let namemenu = menus.getAttribute('data-menuhide');
                if(namemenu){
                    const menuel = document.getElementById(namemenu);
                    if(menuel){
                       if(menuel.classList.contains('menuhide')){
                        menuel.classList.remove('menuhide');
                        setTimeout(() => {
                        menuel.classList.remove('hide-text');
                        }, 300);
                       
                       }else {
                        menuel.classList.add('menuhide');
                        menuel.classList.add('hide-text');
                       }
                       
                    }
                }
            });
            
        });
    }
}

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
      `;
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
      `;


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

const animationDuration = 3000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(animationDuration / frameDuration);
        const easeOutQuad = (t) => t * (2 - t);

        // ฟังก์ชันสำหรับการ run animation
        function animateCountUp(el) {
            let breaktype = el.getAttribute("data-break");
            let frame = 0;

            if (breaktype === 'comma') {
                let rawValue = el.innerHTML.replace(/,/g, '');
                const countTo = parseFloat(rawValue);
                const hasDecimal = rawValue.includes('.');
                const decimalPart = hasDecimal ? rawValue.split('.')[1] : '';
                const digit = decimalPart.length;

                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = countTo * progress;

                    const localeOptions = hasDecimal
                        ? {
                            minimumFractionDigits: digit,
                            maximumFractionDigits: digit,
                        }
                        : {};

                    el.innerHTML = currentCount.toLocaleString('en-US', localeOptions);

                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);

            } else if (breaktype === 'dot') {
                let digit = el.getAttribute("data-digit") || 1;
                const countTo = parseFloat(el.innerHTML.replace(/,/g, ''));
                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = countTo * progress;
                    el.innerHTML = currentCount.toLocaleString('en-US', {
                        minimumFractionDigits: digit,
                        maximumFractionDigits: digit,
                    });
                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);

            } else {
                const countTo = parseInt(el.innerHTML, 10);
                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = Math.round(countTo * progress);
                    el.innerHTML = currentCount;
                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);
            }
        }

        // เริ่มใช้ IntersectionObserver
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp(entry.target); // เริ่ม animation
                    observer.unobserve(entry.target); // ทำครั้งเดียว
                }
            });
        }, { threshold: 0.5 }); // ปรับ threshold ตามต้องการ

        // สมัคร observer ให้ทุก .timer
        document.querySelectorAll('.timer').forEach(el => {
            observer.observe(el);
        });

//nav-bobile

// import Dropdown from "@/pages/docs/dropdown";

document.querySelectorAll(".nav-mobile-icon").forEach((menu) => {
    menu.addEventListener('click', () => {
        document.querySelectorAll(".nav-mobile").forEach((menubox, index) => {
            if (index === 0) {
                console.log(menubox);
                console.log(menubox.classList.contains("nav-show"));

                if (menubox.classList.contains("nav-show")) {
                    menubox.classList.remove("nav-show");
                } else {
                    menubox.classList.add("nav-show");
                }
            }
        });
    });
});

//notification
document.querySelectorAll(".notification-btn").forEach((notification) => {
    notification.addEventListener('click', () => {
        const notiname = notification.getAttribute("data-notification");
        const notibox = document.getElementById(notiname);
        
        if(notibox){
                if(notibox.classList.contains('show-notification')){
                    notibox.classList.remove('show-notification');
                }else {
                    notibox.classList.add('show-notification');
                }
        }

    });
});

document.querySelectorAll(".notification-close").forEach((notificationclose) => {
    notificationclose.addEventListener('click', () => {
            document.querySelectorAll(".notification").forEach((notification) => {

                if(notification.classList.contains('show-notification')){
                    notification.classList.remove('show-notification');
                }
                
            });

    });
});


//modal
document.querySelectorAll('.modal-link').forEach((modaldata)=>{
    modaldata.addEventListener('click', () => {
        let name = modaldata.getAttribute("data-modal");
        let fade = modaldata.getAttribute("data-fade");
        console.log(name);
        
        if(name){
           const position =  modaldata.getAttribute('data-position');
            console.log(position);
            
           if(position){
            const modalbox = document.getElementById(name);
                modalbox.classList.add('modal-slide-show');
                modalbox.classList.add(`modal-slide-${position}`);
                setTimeout(() => {
                modalbox.classList.add(`modal-slide-show-${position}`);
                }, 50);
           }else {
            const modalbox = document.getElementById(name);
            modalbox.style.display = 'block';
                    setTimeout(() => {
                     modalbox.classList.add('show-modal');
                    }, 100);
           }
        //    เปิด fade
           if(fade){
            const body = document.body;
            const html = `<div class="modal-fade" id='fade${name}'></div>`;
            body.insertAdjacentHTML('beforeend', html);
            setTimeout(() => {
                const fadelist = document.getElementById(`fade${name}`);
                    fadelist.classList.add('show-modal-fade');
            }, 50);

        }

          
        }                
    });
});


document.body.addEventListener('click', (event) => {
    const closeButton = event.target.closest('[data-closemodal]');
    if (closeButton) {
        const modalBox = closeButton.closest('.modal-wrap');
        const modalBox_slide = closeButton.closest('.modal-slide-wrap');
                
        if(modalBox){
            modalBox.classList.remove('show-modal');
             setTimeout(() => {
                       modalBox.style.display = ''; 
            }, 300);
        }
        if(modalBox_slide){
            modalBox_slide.classList.remove('modal-slide-show');
            setTimeout(() => {
                modalBox_slide.classList.remove('modal-slide-show-left');
                modalBox_slide.classList.remove('modal-slide-show-right');
            }, 50);
            setTimeout(() => {
                modalBox_slide.classList.remove('modal-slide-left');
                modalBox_slide.classList.remove('modal-slide-right');
            }, 350);
            
        }
        document.querySelectorAll('.modal-fade').forEach((fade)=>{
            fade.classList.remove('show-modal-fade');
            setTimeout(() => {
                fade.remove();
            }, 300);
        });
        
    }
});



// Dropdown




document.querySelectorAll(".dropdown-link").forEach((menu) => {
  menu.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const menucontent = document.getElementById(name);
    menucontent.scrollHeight;
    const Widthmenu = menucontent.scrollWidth;
    const boxwidth = menu.scrollWidth;

    let counts = 0;
    menucontent.querySelectorAll("li").forEach((dropbox, index) => {
      counts += 1;
    });

    if (menu.classList.contains("dropdown-active")) {
      menu.classList.remove("dropdown-active");
      menucontent.classList.remove("dropdown-show");
       menucontent.style.height = "";
      menucontent.style.width = "";
      setTimeout(() => {
      menucontent.classList.remove( "left-0", "right-0");
       
      }, 300);
   
    } else {
      menu.classList.add("dropdown-active");
      menucontent.classList.add("dropdown-show");
      menucontent.style.height = 34 * counts + 20 + "px";

      if (Widthmenu < boxwidth) {
        menucontent.style.width = boxwidth + 20 + "px";
      } else {
        menucontent.style.width = Widthmenu + 20 + "px";
      }

      // ตรวจสอบตำแหน่งของ element
      const rect = menu.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      // ลบ class ก่อนเพิ่มใหม่
      menucontent.classList.remove("left-0", "right-0");

      if (rect.left < 100) {
        // ใกล้ด้านซ้าย
        menucontent.classList.add("left-0");
      } else if (windowWidth - rect.right < 100) {
        // ใกล้ด้านขวา
        menucontent.classList.add("right-0");
      }
    }
  });
});

// menudropdown

document.querySelectorAll(".menu-dropdown").forEach((menu) => {
        const icon = menu.getAttribute("data-icon");
        if(icon){
            if(icon == 'true'){
                menu.classList.add('showicon');
            }else {
                menu.classList.remove('showicon');

            }

        }
      

        menu.addEventListener("click", function () {
            let name = this.getAttribute("data-name"); // หรือ this.dataset.name
            const menucontent = document.getElementById(name);
            const heightmenu = menu.scrollHeight;

            const isOpen = menucontent.classList.contains('show');
            const showicon = menu.classList.contains('showicon');

          

                if (isOpen) {
              
                menucontent.classList.remove('show');
                menu.style.height = '38px';

                if(showicon){
                menu.classList.remove('showiconup');
                }
                } else {
                    menucontent.classList.add('show');
                    menu.style.height = heightmenu + 'px';
                    if(showicon){
                        menu.classList.add('showiconup');
                    }
                }


          
        });
      });



      //slider

       document.querySelectorAll('.slider').forEach((slider) => {            
             const valueDisplay = slider.nextElementSibling;
            const rootStyle = getComputedStyle(document.documentElement);
            const mainColor = rootStyle.getPropertyValue('--main-color').trim();
            const subColor = '#ffffff'; // หรือใช้ CSS var ได้เช่นกัน

            function calcValue() {
                const valuePercentage = (slider.value / slider.max) * 100;
                slider.style.background = `linear-gradient(to right, ${mainColor} ${valuePercentage}%, ${subColor} ${valuePercentage}%)`;
                if (valueDisplay) valueDisplay.textContent = slider.value;
            }

            // เรียกครั้งแรกเพื่อให้มี background ถูกต้องตอนโหลด
            calcValue();

            // ผูก event 'input' เพียงครั้งเดียว
            slider.addEventListener('input', () => {
                calcValue();
            });


        });

const Wacoalui = {
    AlertBox: function (options) {
        return new AlertBox(options);
    },
    Modalbox: function (options) {
        return new Modalbox(options);
    },
    setColor: function (options) {
        return new setColor(options);
    },
    MenuDropdown: function (options) {
        return new MenuDropdown(options);
    },
    SetLoading: function (options) {
        return new SetLoading(options);
    },
    Dropdown: function (options) {
        return new Dropdown(options);
    },
    Tab: function (options) {
        return new Tab(options);
    },
    Loading: function (options) {
        return new Loading(options);
    },
    Notification: function (options) {
        return new Notification(options);
    },
    Loadcss: function (options) {
        return new Loadcss(options);
    },
    Animate: function (options) {
        return new Animate(options);
    },
    Slider: function (options) {
        return new Slider(options);
    },
    Menuhide: function (options) {
        return new Menuhide(options);
    },
     Cookie: function (options) {
        return new Cookie(options);
    }
    
};

export { Wacoalui as default };
