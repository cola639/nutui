import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '@/sites/assets/styles/reset.scss';
import '@/sites/assets/styles/md-style.scss';
import DemoBlock from './components/demo-block';
import IconDemo from './components/IconDemo.vue';
import { Hover } from './directive/hover/hover';

import { isMobile } from '@/sites/assets/util';
import '@nutui/icons-vue/dist/style_icon.css';
if (isMobile) {
  const url = location.hash.replace('/component', '');
  location.replace('demo.html' + url);
}

createApp(App)
  .directive('hover', Hover)
  .component('demo-block', DemoBlock)
  .component('icon-demo', IconDemo)
  .use(router)
  .mount('#doc');
