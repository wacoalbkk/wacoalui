
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
        }else{
            icon.innerHTML = `<div class="spinner-basic"></div>`;
        }

        

        div.appendChild(icon);
        document.body.appendChild(div);
        if(this.ScrollLock){
          document.body.classList.add('overflow-hidden');
        }else{
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
            });cd
        }
        }
}



export default Loading;