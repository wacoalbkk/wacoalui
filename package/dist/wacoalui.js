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
            closeButton.addEventListener('click', () => {
                this.closeAlert(alertdata);
                if(this.fade != 0){
                    alertfade[0].remove();
                }

            });
        }


        if(this.buttonApprove){
            const okButton = alertdata.querySelector('.alert-btn-true');
            okButton.addEventListener('click', () => {
                this.resolve();  // ทำให้ .then() ทำงาน
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
                    modalbox.classList.add('show-modal');
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

class Dropdown {


    constructor({ icon = ""}) {
        // this.name = name;
        this.createDropdown();
    }  

    createDropdown(){
 

    document.querySelectorAll(".dropdown-link").forEach((menu) => {
      
        menu.addEventListener("click", function () {

            console.log(menu);
            
            
            const name = this.getAttribute("data-name"); // หรือ this.dataset.name
            const menucontent = document.getElementById(name);
            menucontent.scrollHeight;
            const Widthmenu = menucontent.scrollWidth;
            const boxwidth = menu.scrollWidth;
           
            let counts = 0;
            menucontent.querySelectorAll('li').forEach((dropbox,index) => {
                counts = counts +1;
            });

     
            

            
            console.log(boxwidth);
            console.log(Widthmenu);
            
            // const isOpen = menucontent.classList.contains('show');
            // const showicon = menu.classList.contains('showicon');

          
            if(menu.classList.contains('dropdown-active')){
                menu.classList.remove('dropdown-active');
                menucontent.classList.remove('dropdown-show');
                menucontent.style.height = '';
                menucontent.style.width = '';

            }else {
                menu.classList.add('dropdown-active');
                menucontent.classList.add('dropdown-show');
                menucontent.style.height = ((34 * counts)+20)+'px';

                if(Widthmenu < boxwidth ){
                    menucontent.style.width = (boxwidth + 20)+'px';

                }else {
                    menucontent.style.width = (Widthmenu + 20)+'px';

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

class Loading {

    constructor({show = ""}) {
        this.show = show || false;
        this.createLoading();
    }

    createLoading() {
       
        if(this.show){
            document.querySelectorAll(".load_wrap").forEach((load,index) => {
                if(index == 0){
                    load.classList.add('load_show');
                }
            });

        }else {
            document.querySelectorAll(".load_wrap").forEach((load,index) => {
                load.classList.remove('load_show');

            });
        }
    }
}

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

//nav-bobile

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
            modalbox.classList.add('show-modal');
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
    Loading:function(options) {
        return new Loading(options);
    },
    Notification:function(options){
        return new Notification(options);
    }
    ,Loadcss:function(options){
      return new Loadcss(options);
    }
    
};

export { Wacoalui as default };
