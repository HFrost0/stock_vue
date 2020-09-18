import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/stocks'
  },
  {
    path: '/authenticate',
    name: 'Authenticate',
    meta: {
      title: '用户登录'
    },
    component:()=> import('../views/Authenticate')
  },
  {
    path: '/test',
    name: 'Test',
    meta:{
      title: 'test'
    },
    component:()=>import('../views/Test')
  },
  {
    path: '/stocks',
    name: 'Stocks',
    meta: {
      title: '股票列表',
    },
    component: () => import('../views/Stocks')
  },
  {
    path: '/stock_detail',
    name: 'StockDetail',
    meta: {
      navShow: true,
      title: '股票详情',
    },
    component: () => import('../views/StockDetail')
  },
  {
    path: '/shares',
    name: 'Shares',
    meta: {
      title: '分红',
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
  // redirect to login page if user is not logged in and trying to access a restricted page
  const authPages = ['/test', ]
  const authRequired = authPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/authenticate')
  }
  next()
  document.title = to.matched[0].meta.title
}))
//全局，后置钩子
router.afterEach(((to, from) => {
  // console.log('后置钩子');
}))

export default router
