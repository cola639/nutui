import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Index from './views/Index.vue';

/* doc.md */
const pagesRouter: Array<RouteRecordRaw> = [];
const modulesPage = import.meta.glob('/src/packages/__VUE/**/doc.md');
for (const path in modulesPage) {
  const name = (/packages\/__VUE\/(.*)\/doc.md/.exec(path) as any[])[1];
  pagesRouter.push({
    path: '/zh-CN/component/' + name,
    component: modulesPage[path]
  });
}
console.log('🚀 >> doc pagesRouter:', pagesRouter);

/* doc.en-US.md */
const pagesEnRouter: Array<RouteRecordRaw> = [];
const modulesEnPage = import.meta.glob('/src/packages/__VUE/**/doc.en-US.md');
for (const path in modulesEnPage) {
  const name = (/packages\/__VUE\/(.*)\/doc.en-US.md/.exec(path) as any[])[1];
  pagesEnRouter.push({
    path: '/en-US/component/' + name,
    component: modulesEnPage[path]
  });
}
console.log('🚀 >> doc.en Router:', pagesEnRouter);

/* doc.taro.md */
const modulesPageTaro = import.meta.glob('/src/packages/__VUE/**/*.taro.md');
for (const path in modulesPageTaro) {
  const name = (/packages\/__VUE\/(.*)\/doc.taro.md/.exec(path) as any[])[1];
  pagesRouter.push({
    path: `/zh-CN/component/${name}-taro`,
    component: modulesPageTaro[path]
  });
  pagesEnRouter.push({
    path: `/en-US/component/${name}-taro`,
    component: modulesPageTaro[path]
  });
}
console.log('🚀 >> doc.taro.pagesEnRouter:', pagesEnRouter);

const routes: Array<RouteRecordRaw> = [
  {
    path: '/zh-CN',
    name: '/zh-CN',
    component: Index,
    children: pagesRouter
  },
  {
    path: '/en-US',
    name: '/en-US',
    component: Index,
    children: pagesEnRouter
  }
];
routes.push({
  name: 'notFound',
  path: '/:path(.*)+',
  redirect: {
    path: '/zh-CN/component/button'
  }
});

console.log('🚀 >> routes:', routes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      const id = to.hash.split('#')[1];
      const ele = document.getElementById(id);
      setTimeout(() => {
        ele && ele.scrollIntoView(true);
      });
    }
  }
});
router.afterEach(() => {
  window.scrollTo(0, 0);
});
export default router;
