import Vue from "vue"
import VueRouter from "vue-router"

// 引入组件

import login from '../page/login/index.vue'
// import home from '../page/home.vue'
import dashboard from '../page/dashboard/index.vue'
import notFound from '../page/errorPage/404.vue'

import home from '../page/layout/layout.vue'


// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let routes = [
  {
    path: "/",
    redirect: 'dashboard',
    hidden: true
  },
  {
    path: '/login',
    component: login,
    name: 'login',
    hidden: true
  },
  {
    path: '/error',
    component: home,
    name: 'notFound',
    redirect: 'noredirect',
    hidden: true,
    children: [
      {
        path: '404',
        component: notFound,
        name: 'Page404',
        meta: { keepAlive: true }// 不需要缓存 }
      }
    ]
  },
  {
    path: 'dashboard',
    component: home,
    single: true,
    name: '宝唯首页',
    meta: {
      keepAlive: true // 不需要缓存
    },
    iconCls: 'el-icon-s-home', //图标样式class
    children: [
      {
        path: '/dashboard',
        name: '宝唯首页',
        component: dashboard,
        meta: {
          keepAlive: true // 不需要缓存
        },
      }
    ]
  },
  {
    path: '/oms',
    // component: home,
    component: home,
    // single: true,
    name: 'OMS订单',
    meta: {
      keepAlive: true // 不需要缓存
    },
    iconCls: 'el-icon-shopping-cart-full', //图标样式class
    children: [
      {
        path: 'omsOrderUpdate',
        name: '订单更新',
        component: () =>import('../page/OMS/omsOrderUpdate'),
        meta: {
          keepAlive: true // 不需要缓存
        },
      },
      {
        path: 'omsStatusUpdate',
        name: '任务状态更新',
        component: () =>import('../page/OMS/omsStatusUpdate'),
        meta: {
          keepAlive: true // 不需要缓存
        },
      },
      {
        path: 'omsReturnUpdate',
        name: '退货单更新',
        component: () =>import('../page/OMS/omsReturnGoods'),
        meta: {
          keepAlive: true // 不需要缓存
        },
      },
      {
        path: 'omsOrderDetail',
        name: '订单明细更新',
        component: () =>import('../page/OMS/omsDetailUpdate.vue'),
        meta: {
          keepAlive: true
        },
      },
      {
        path: 'omsReturnDetailUpdate',
        name: '退货单明细更新',
        component: () =>import('../page/OMS/omsReturnDetail.vue'),
        meta: {
          keepAlive: true
        },
      },
    ]
  },
  {
    path: '/FCS',
    // component: home,
    component: home,
    name: 'FCS订单',
    meta: {
      keepAlive: true // 不需要缓存
    },
    iconCls: 'el-icon-message', //图标样式class
    children: [
      {
        path: 'compensate',
        component: () =>import('../page/FCS/FCSCompensate.vue'),
        name: 'FCS补偿推送恒康',
        meta: {
          keepAlive: true // 不需要缓存
        },
      },
      {
        path: 'orderHandle',
        component: () =>import('../page/FCS/FCSOrderHandle.vue'),
        name: 'FCS订单补偿处理',
        meta: {
          keepAlive: true // 不需要缓存
        },
        iconCls: 'el-icon-message', //图标样式class
      },

    ]
  },

  { path: '*', redirect: '/error/404', hidden: true }
]
var router = new VueRouter({
    routes
})
export default router;