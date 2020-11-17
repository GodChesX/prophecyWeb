import './bootstrap';
import Vue from 'vue';
import vuetify from '@/js/plugins/vuetify';
// import Vuetify from 'vuetify';
// import Vuetify from 'vuetify/lib'
import Routes from '@/js/routes.js';

import App from '@/js/views/App';

import Toast from "vue-easy-toast";
import BeeGridTable from "beegridtable";
import BeeLocale from "beegridtable/src/locale"; //default English
import 'beegridtable/dist/styles/beegridtable.css';

Vue.use(BeeGridTable, {
    locale: BeeLocale,
    capture: true,
});
Vue.config.productionTip = false;
// Vue.use(Vuetify);
Vue.use(Toast);
const app = new Vue({
    el: '#app',
    vuetify,
    router: Routes,
    render: h => h(App)
});

export default app;
