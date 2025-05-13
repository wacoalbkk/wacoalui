



class setColor{
    maincolor: string;
    subcolor: string;
    maintextcolor: string;
    subtextcolor: string;
    bodycolor: string;
    autoTheme: boolean;

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
          
            setThemeBasedOnTime()
            // อัพเดททุกๆ 10 นาที (600000 ms) เพื่อให้ตรวจสอบเวลาซ้ำ
            setInterval(setThemeBasedOnTime, 600000);
        }else{
            document.documentElement.style.setProperty('--body-color', this.bodycolor);
        }
    }
}




export default setColor;
