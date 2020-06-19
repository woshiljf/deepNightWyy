import Vue from "vue"
import VueRouter from "vue-router"

// 引入组件

import login from '../page/login/index.vue'
// import home from '../page/home.vue'
import dashboard from '../page/dashboard/index.vue'
import notFound from '../page/errorPage/404.vue'
import sub13 from '../page/FCS/sub3.vue'
import sub21 from '../page/menu2/sub1.vue'
import home from '../page/layout/layout.vue'
import mangerInfo from '../page/mangerInfo'

// 要告诉 vue 使用 vueRouter
Vue.use(VueRouter);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const newDeliveryList = resolve => require(['@/page/ODS/DeliveryList/DeliveryList.vue'], resolve)
const newDeliveryDetail = resolve => require(['@/page/ODS/DeliveryList/DeliveryDetail.vue'], resolve)
const newReceiverList = resolve => require(['@/page/ODS/ReceiveList/ReceiveList.vue'], resolve)
const newReceiverDetail = resolve => require(['@/page/ODS/ReceiveList/ReceiveDetail.vue'], resolve)

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
      {
        path: 'sub3',
        component: sub13,
        name: '子菜單三',
        meta: {
          keepAlive: true // 不需要缓存
        },
      }
    ]
  },
  {
    path: '/menu2',
    // component: home,
    component: home,
    name: '菜單二',
    iconCls: 'el-icon-message',
    meta: {
      keepAlive: true // 不需要缓存
    },
    children: [
      {
        path: 'sub1',
        component: sub21,
        name: '配置管理',
        meta: {
          keepAlive: true // 不需要缓存
        },
      }
    ]
  },
  {
    path: '/manger',
    // component: home,
    component: home,
    name: '信息管理',
    iconCls: 'el-icon-message',
    meta: {
      keepAlive: true // 不需要缓存
    },
    children: [
      {
        path: 'mange1',
        component: mangerInfo,
        name: '嘻嘻管理',
        meta: {
          keepAlive: true // 不需要缓存
        },
      }
    ]
  },

  {
    path: '/ODS',
    component: home,
    iconCls: 'el-icon-message',
    name: '订单管理',
    meta: {
      keepAlive: true // 不需要缓存
    },
    children: [
      {
        path: 'DeliveryList',
        component: () => import('@/page/ODS/DeliveryList/DeliveryList'),
        // component: newDeliveryList,
        name: '发货',
        meta: {
          keepAlive: true // 不需要缓存
        }
      },
      {
        path: 'ReceiveList',
        // component: () => import('@/views/ODS/ReceiveList/ReceiveList'),
        component: newReceiverList,
        name: '收获',
        meta: {
          keepAlive: true // 不需要缓存
        },
      },
      {
        path: 'DeliveryList/DeliveryDetail/:id?',
        // component: () => import('@/views/ODS/DeliveryList/DeliveryDetail'),
        component: newDeliveryDetail,
        name: 'DeliveryDetail',
        meta: {
          keepAlive: true // 不需要缓存
        },
        hidden: true
      },
      {
        path: 'ReceiveList/ReceiveDetail/:id?',
        // component: () => import('@/views/ODS/ReceiveList/ReceiveDetail'),
        component: newReceiverDetail,
        name: 'ReceiveDetail',
        meta: {
          keepAlive: true // 不需要缓存
        },
        hidden: true
      }
    ]
  },
  {
    path: '/ODS1',
    component: home,
    iconCls: 'el-icon-message',
    name: '订单管理2',
    meta: {
      keepAlive: true // 不需要缓存
    },
    children: [
      {
        path: 'DeliveryList1',
        component: () => import('@/page/ODS1/DeliveryList/DeliveryList'),
        // component: newDeliveryList,
        name: '发货',
        meta: {
          keepAlive: true // 不需要缓存
        }
      },
      {
        path: 'ReceiveList1',
        component: () => import('@/page/ODS1/ReceiveList/ReceiveList'),
        name: '收获',
        meta: {
          keepAlive: true // 不需要缓存
        },
      },
      {
        path: 'DeliveryList1/DeliveryDetail/:id?',
        component: () => import('@/page/ODS1/DeliveryList/DeliveryDetail'),
        name: 'DeliveryDetail',
        meta: {
          keepAlive: true // 不需要缓存
        },
        hidden: true
      },
      {
        path: 'ReceiveList1/ReceiveDetail/:id?',
        component: () => import('@/page/ODS1/ReceiveList/ReceiveDetail'),
        name: 'ReceiveDetail',
        meta: {
          keepAlive: true // 不需要缓存
        },
        hidden: true
      }
    ]
  },
  {
    path: '/ODS2',
    component: home,
    iconCls: 'el-icon-message',
    name: '订单管理3',
    meta: {
      keepAlive: true // 不需要缓存
    },
    children: [
      {
        path: 'DeliveryList2',
        component: () => import('@/page/ODS2/DeliveryList/DeliveryList'),
        // component: newDeliveryList,
        name: '发货',
        meta: {
          keepAlive: true // 不需要缓存
        }
      },
      {
        path: 'ReceiveList2',
        component: () => import('@/page/ODS2/ReceiveList/ReceiveList'),
        name: '收获',
        meta: {
          keepAlive: true // 不需要缓存
        },
      },
      {
        path: 'DeliveryList2/DeliveryDetail/:id?',
        component: () => import('@/page/ODS/DeliveryList/DeliveryDetail'),
        name: 'DeliveryDetail',
        meta: {
          keepAlive: true // 不需要缓存
        },
        hidden: true
      },
      {
        path: 'ReceiveList2/ReceiveDetail/:id?',
        component: () => import('@/page/ODS2/ReceiveList/ReceiveDetail'),
        name: 'ReceiveDetail',
        meta: {
          keepAlive: true // 不需要缓存
        },
        hidden: true
      }
    ]
  },
  { path: '*', redirect: '/error/404', hidden: true }
]
var router = new VueRouter({
    routes
})
export default router;