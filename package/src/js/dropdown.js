class Dropdown {


    constructor({ icon = "" }) {
        // this.name = name;
        this.createDropdown();
    }

    createDropdown() {


        document.querySelectorAll(".dropdown-link").forEach((menu) => {
            menu.addEventListener("click", function () {
                const name = this.getAttribute("data-name");
                const menucontent = document.getElementById(name);
                const heightmenu = menucontent.scrollHeight;
                const Widthmenu = menucontent.scrollWidth;
                const boxwidth = menu.scrollWidth;

                let counts = 0;
                menucontent.querySelectorAll("li").forEach((dropbox, index) => {
                    counts += 1;
                });

                if (menu.classList.contains("dropdown-active")) {
                    menu.classList.remove("dropdown-active");
                    menucontent.classList.remove("dropdown-show");
                    menucontent.style.height = "";
                    menucontent.style.width = "";
                    setTimeout(() => {
                        menucontent.classList.remove("left-0", "right-0");

                    }, 300);

                } else {
                    menu.classList.add("dropdown-active");
                    menucontent.classList.add("dropdown-show");
                    menucontent.style.height = 34 * counts + 20 + "px";

                    if (Widthmenu < boxwidth) {
                        menucontent.style.width = boxwidth + 20 + "px";
                    } else {
                        menucontent.style.width = Widthmenu + 20 + "px";
                    }

                    // ตรวจสอบตำแหน่งของ element
                    const rect = menu.getBoundingClientRect();
                    const windowWidth = window.innerWidth;

                    // ลบ class ก่อนเพิ่มใหม่
                    menucontent.classList.remove("left-0", "right-0");

                    if (rect.left < 100) {
                        // ใกล้ด้านซ้าย
                        menucontent.classList.add("left-0");
                    } else if (windowWidth - rect.right < 100) {
                        // ใกล้ด้านขวา
                        menucontent.classList.add("right-0");
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

