import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css';
import appsettings from '@/appsettings.json';

const app = createApp(App);

app.use(router);
app.config.globalProperties.settings = appsettings

app.mount('#app');
