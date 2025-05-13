class Notification {

    constructor() {
        this.createNotification();
    }

    createNotification() {
       
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


    }
}



export default Notification;

