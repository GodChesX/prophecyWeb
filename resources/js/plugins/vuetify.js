// import Vue from 'vue';

// // import Vuetify, {
// //     VApp,
// //     VAppBar,
// //     VNavigationDrawer,
// //     VToolbar,
// //     VContainer,
// //     VContent,
// //     VCard,
// //     VCardTitle,
// // } from 'vuetify/lib';
// import Vuetify from 'vuetify/lib'
// Vue.use(Vuetify
//     // , {
//     // components: {
//     //     VApp,
//     //     VAppBar,
//     //     VNavigationDrawer,
//     //     VToolbar,
//     //     VContainer,
//     //     VContent,
//     //     VCard,
//     //     VCardTitle
//     // }
//     // }
// )

// const opts = {};

// export default new Vuetify(opts);
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css';
Vue.use(Vuetify)
Vue.use(Loading)

const opts = {}

export default new Vuetify(opts)
