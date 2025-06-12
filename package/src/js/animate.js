class Animate {
    constructor({ icon = '' }) {
        // this.name = name;
        this.createAnimate();
    }

    createAnimate() {
        const animationDuration = 3000;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(animationDuration / frameDuration);
        const easeOutQuad = (t) => t * (2 - t);

        // ฟังก์ชันสำหรับการ run animation
        function animateCountUp(el) {
            let breaktype = el.getAttribute("data-break");
            let frame = 0;

            if (breaktype === 'comma') {
                let rawValue = el.innerHTML.replace(/,/g, '');
                const countTo = parseFloat(rawValue);
                const hasDecimal = rawValue.includes('.');
                const decimalPart = hasDecimal ? rawValue.split('.')[1] : '';
                const digit = decimalPart.length;

                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = countTo * progress;

                    const localeOptions = hasDecimal
                        ? {
                            minimumFractionDigits: digit,
                            maximumFractionDigits: digit,
                        }
                        : {};

                    el.innerHTML = currentCount.toLocaleString('en-US', localeOptions);

                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);

            } else if (breaktype === 'dot') {
                let digit = el.getAttribute("data-digit") || 1;
                const countTo = parseFloat(el.innerHTML.replace(/,/g, ''));
                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = countTo * progress;
                    el.innerHTML = currentCount.toLocaleString('en-US', {
                        minimumFractionDigits: digit,
                        maximumFractionDigits: digit,
                    });
                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);

            } else {
                const countTo = parseInt(el.innerHTML, 10);
                const counter = setInterval(() => {
                    frame++;
                    const progress = easeOutQuad(frame / totalFrames);
                    const currentCount = Math.round(countTo * progress);
                    el.innerHTML = currentCount;
                    if (frame === totalFrames) {
                        clearInterval(counter);
                    }
                }, frameDuration);
            }
        }

        // เริ่มใช้ IntersectionObserver
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCountUp(entry.target); // เริ่ม animation
                    observer.unobserve(entry.target); // ทำครั้งเดียว
                }
            });
        }, { threshold: 0.5 }); // ปรับ threshold ตามต้องการ

        // สมัคร observer ให้ทุก .timer
        document.querySelectorAll('.timer').forEach(el => {
            observer.observe(el);
        });

        // console.log(countupEls);


        // countupEls.forEach(animateCountUp);
    }
}

export default Animate;
