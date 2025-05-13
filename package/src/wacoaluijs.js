
import AlertBox from './alert.js'
import Modalbox from './modal.js'
// import setColor from './setcolor.ts'
import setColor from './setcolor.js'
import MenuDropdown from './menudropdown.js'
import SetLoading from './loading.js'
import Dropdown from './dropdown.js'
import Tab from './tab.js'
import Loading from './loading_page.js'
import Notification from './notification.js'

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
    Loading:function(options) {
        return new Loading(options);
    },
    Notification:function(options){
        return new Notification(options);
    }
    
};

export default Wacoalui;





