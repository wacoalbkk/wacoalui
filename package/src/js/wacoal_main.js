

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
        })
        
    }
});


