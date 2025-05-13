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

        }else{
            document.querySelectorAll(".load_wrap").forEach((load,index) => {
                load.classList.remove('load_show');

            });
        }
    }
}



export default Loading;

