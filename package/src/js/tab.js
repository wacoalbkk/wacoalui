class Tab {
    constructor({ icon = ""}) {
        // this.name = name;
        this.createTab();

        setTimeout(() => {
            this.activeTab();
          }, 0);
        // alert('test')
    }  

    createTab(){
        
        document.querySelectorAll(".tab button").forEach((btn) => {

            btn.addEventListener("click", function () {

              const nameBody = this.dataset.namebody;
              const tabParent = this.closest(".tab");
              const tabContent = tabParent ? tabParent.dataset.tabcontent : null;
          
            //   console.log("data-namebody:", nameBody);
            //   console.log("data-tabcontent (from parent):", tabContent);

            
         


              const target = document.querySelector(`.tab-body[data-tabcontent="${tabContent}"]`);

              if (!target) return;

                const sameTabButtons = document.querySelectorAll(`.tab[data-tabcontent="${tabContent}"] button`);
                sameTabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const left = btn.offsetLeft;
                const width = btn.offsetWidth;
              
                // ใส่ลง CSS variable ที่ .tab
                tabParent.style.setProperty('--underline-left', `${left}px`);
                tabParent.style.setProperty('--underline-width', `${width}px`);



              // 2. ซ่อน div ทุกตัวภายใน .tab-body
              target.querySelectorAll('.tab-content').forEach(el => {
                el.style.display = 'none';
              });
            
              // 3. แสดง div ที่มี data-namebody ตรงกับ nameBody
              const targetDiv = target.querySelector(`[data-namepage="${nameBody}"]`);
              if (targetDiv) {
                targetDiv.style.display = 'block';
              }

            });
          });


    }
    activeTab(){
        document.querySelectorAll('.tab button').forEach(btn => {
            const btnactive = btn.classList.contains('active');
            if(btnactive){

                const left = btn.offsetLeft;
                const width = btn.offsetWidth;

                const tabParent = btn.closest(".tab");
                const tabContent = tabParent ? tabParent.dataset.tabcontent : null;

                // ใส่ลง CSS variable ที่ .tab
                tabParent.style.setProperty('--underline-left', `${left}px`);
                tabParent.style.setProperty('--underline-width', `${width}px`);
                
            }
            
        });
      }


  
}






export default Tab;

