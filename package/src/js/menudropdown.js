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


    }
}

// ปิดเมื่อกด ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.getElementById("custom-alert")?.classList.remove("show");
    }
});


export default MenuDropdown;

