import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import './assets/main.css';
import settings from '@/appsettings.json';

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    settings: typeof settings;
  }
}

const app = createApp(App);

app.use(router);
app.config.globalProperties.settings = settings;

app.mount('#app');
