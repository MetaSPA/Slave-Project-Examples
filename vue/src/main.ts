import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { bootstrap } from '@metaspa/module';

Vue.config.productionTip = false;
bootstrap({
    namespace: 'TestVue',
    modules: {App, router, store},
});
