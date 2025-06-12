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

        
    }

   
}

// ปิดเมื่อกด ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.getElementById("custom-alert")?.classList.remove("show");
    }
});

export default Modalbox;

