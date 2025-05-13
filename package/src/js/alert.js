
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
        let icon = `alert-${this.type}`;

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

        `
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

const Wacoalui = {
    AlertBox: function (options) {
        return new AlertBox(options);
    }
};


export default AlertBox;

