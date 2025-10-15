import AlertBox from './js/alert.js';
import Modalbox from './js/modal.js';
// import setColor from './setcolor.ts'
import Animate from './js/animate.js';
import Dropdown from './js/dropdown.js';
import Loadcss from './js/loadcss.js';
import SetLoading from './js/loading.js';
import Loading from './js/loading_page.js';
import MenuDropdown from './js/menudropdown.js';
import Notification from './js/notification.js';
import setColor from './js/setcolor.js';
import Slider  from './js/slide.js';
import Tab from './js/tab.js';
import Menuhide from './js/menuhide.js';
import Cookie from './js/cookie.js';

import './animate_main.js';
import './wacoal_main.js';

const Wacoalui = {
    AlertBox: function (options) {
        return new AlertBox(options);
    },
    Modalbox: function (options) {
        return new Modalbox(options);
    },
    setColor: function (options) {
        return new setColor(options);
    },
    MenuDropdown: function (options) {
        return new MenuDropdown(options);
    },
    SetLoading: function (options) {
        return new SetLoading(options);
    },
    Dropdown: function (options) {
        return new Dropdown(options);
    },
    Tab: function (options) {
        return new Tab(options);
    },
    Loading: function (options) {
        return new Loading(options);
    },
    Notification: function (options) {
        return new Notification(options);
    },
    Loadcss: function (options) {
        return new Loadcss(options);
    },
    Animate: function (options) {
        return new Animate(options);
    },
    Slider: function (options) {
        return new Slider(options);
    },
    Menuhide: function (options) {
        return new Menuhide(options);
    },
     Cookie: function (options) {
        return new Cookie(options);
    }
    
};

export default Wacoalui;
