

//nav-bobile

import Dropdown from "@/pages/docs/dropdown";

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
                }else{
                    notibox.classList.add('show-notification');
                }
        }

    });
})

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
           }else{
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
        })
        
    }
});



// Dropdown




document.querySelectorAll(".dropdown-link").forEach((menu) => {
  menu.addEventListener("click", function () {
    const name = this.getAttribute("data-name");
    const menucontent = document.getElementById(name);
    const heightmenu = menucontent.scrollHeight;
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
            }else{
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