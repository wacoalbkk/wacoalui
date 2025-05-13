
import AlertBox from './js/alert.js'
import Modalbox from './js/modal.js'
// import setColor from './setcolor.ts'
import setColor from './js/setcolor.js'
import MenuDropdown from './js/menudropdown.js'
import SetLoading from './js/loading.js'
import Dropdown from './js/dropdown.js'
import Tab from './js/tab.js'
import Loading from './js/loading_page.js'
import Notification from './js/notification.js'
import Loadcss from './js/loadcss.js'


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
    ,Loadcss:function(options){
      return new Loadcss(options);
    }
    
};

export default Wacoalui;





