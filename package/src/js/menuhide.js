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
                       
                       }else{
                        menuel.classList.add('menuhide');
                        menuel.classList.add('hide-text');
                       }
                       
                    }
                }
            });
            
        });
    }
}

export default Menuhide;
