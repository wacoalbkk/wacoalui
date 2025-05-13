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
            const heightmenu = menucontent.scrollHeight;
            const Widthmenu = menucontent.scrollWidth;
            const boxwidth = menu.scrollWidth;
           
            let counts = 0;
            menucontent.querySelectorAll('li').forEach((dropbox,index) => {
                counts = counts +1;
            })

     
            

            
            console.log(boxwidth);
            console.log(Widthmenu);
            
            // const isOpen = menucontent.classList.contains('show');
            // const showicon = menu.classList.contains('showicon');

          
            if(menu.classList.contains('dropdown-active')){
                menu.classList.remove('dropdown-active');
                menucontent.classList.remove('dropdown-show');
                menucontent.style.height = '';
                menucontent.style.width = '';

            }else{
                menu.classList.add('dropdown-active');
                menucontent.classList.add('dropdown-show');
                menucontent.style.height = ((34 * counts)+20)+'px';

                if(Widthmenu < boxwidth ){
                    menucontent.style.width = (boxwidth + 20)+'px';

                }else{
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


export default Dropdown;

