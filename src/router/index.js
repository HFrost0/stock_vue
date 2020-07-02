import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/stocks'
  },
  {
    path: '/stocks',
    name: 'Stocks',
    meta: {
      title: '股票列表'
    },
    component: () => import('../views/Stocks')
  },
  {
    path: '/stock_detail',
    name: 'StockDetail',
    meta: {
      title: '股票详情'
    },
    component: () => import('../views/StockDetail')
  },
  {
    path: '/stock_daily',
    name: 'StockDaily',
    meta: {
      title: '每日指标'
    },
    component: () => import('../views/StockDaily')
  },
  {
    path: '/shares',
    name: 'Shares',
    meta: {
      title: '分红'
    },
    component: () => import('../views/Shares')
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
