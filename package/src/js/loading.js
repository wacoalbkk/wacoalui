class SetLoading {

    constructor({ MaincolorLoading = "", SubcolorLoading = "", colorLoading2 = "", colorLoading3 = "", colorLoading4 = "", EventpageLoad = "" }) {
        this.MaincolorLoading = MaincolorLoading || '#2c2c2c';
        this.SubcolorLoading = SubcolorLoading || '#dbdcef';
        this.colorLoading2 = colorLoading2 || '#ff4545';
        this.colorLoading3 = colorLoading3 || '#ffbf47';
        this.colorLoading4 = colorLoading4 || '#a6ff7c';
        this.EventpageLoad = EventpageLoad || 'false';
        this.createSetLoading();
    }

    createSetLoading() {
        // Set custom CSS properties for colors
        document.documentElement.style.setProperty('--main-loading-color', this.MaincolorLoading);
        document.documentElement.style.setProperty('--sub-loading-color', this.SubcolorLoading);
        document.documentElement.style.setProperty('--loading-color-2', this.colorLoading2);
        document.documentElement.style.setProperty('--loading-color-3', this.colorLoading3);
        document.documentElement.style.setProperty('--loading-color-4', this.colorLoading4);

        // If EventpageLoad is true, show a loading page
        if (this.EventpageLoad === 'true') {
            const htmlload = `<div class='loadpage loadshow' id="loadpage">
            <div class="spinner-cube">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                </div>
                </div>`;
            const body = document.body;
            body.insertAdjacentHTML('afterbegin', htmlload);

            window.addEventListener("load", function () {
                const loadpage = document.getElementById('loadpage');
                loadpage.classList.remove('loadshow');

                setTimeout(() => {
                    loadpage.remove();
                }, 300);
            });
          
        }
    }
}



export default SetLoading;

