

class Slider {
    constructor({}) {
        this.createSlider();
    }

    createSlider() {
        document.querySelectorAll('.slider').forEach((slider) => {            
             const valueDisplay = slider.nextElementSibling;
            const rootStyle = getComputedStyle(document.documentElement);
            const mainColor = rootStyle.getPropertyValue('--main-color').trim();
            const subColor = '#ffffff'; // หรือใช้ CSS var ได้เช่นกัน

            function calcValue() {
                const valuePercentage = (slider.value / slider.max) * 100;
                slider.style.background = `linear-gradient(to right, ${mainColor} ${valuePercentage}%, ${subColor} ${valuePercentage}%)`;
                if (valueDisplay) valueDisplay.textContent = slider.value;
            }

            // เรียกครั้งแรกเพื่อให้มี background ถูกต้องตอนโหลด
            calcValue();

            // ผูก event 'input' เพียงครั้งเดียว
            slider.addEventListener('input', () => {
                calcValue();
            });


        });
      

    }
}

export default Slider;

