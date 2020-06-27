import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '股票们'
    },
    component: () => import('../views/Home')
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

//全局守卫修改标题,前置钩子
router.beforeEach(((to, from, next) => {
  //从from跳转到to
  document.title = to.matched[0].meta.title
  next()
}))
//全局，后置钩子
router.afterEach(((to, from) => {
  // console.log('后置钩子');
}))

export default router
