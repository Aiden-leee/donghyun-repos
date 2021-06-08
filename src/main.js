import Vue from 'vue';
import App from './App.vue';
import store from '@/store/';
import router from '@/routes/';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
require('@/assets/css/style.min.css');
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.config.productionTip = false;

new Vue({
	render: h => h(App),
	store,
	router,
}).$mount('#app');
