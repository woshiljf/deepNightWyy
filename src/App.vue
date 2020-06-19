<template>
<div id="app" @mousemove="moveEvent" @click="moveEvent">
    <router-view></router-view>
</div>
</template>

<script>
export default{
  name: 'App',
  data() {
    return {
      isRouterAlive: true,
      timmer: null
    }
  },
  created() {
    this.moveEvent()
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    moveEvent() {
      // 只要鼠标在页面活动，清除计时器，重新计时
      const path = ['/login']
      if (document.URL.indexOf(path) === -1) {
        // 如果不是登录页面的话页面停止进行30分钟后清空session
        clearTimeout(this.timmer)
        this.init()
      }
    },
    init() {
      this.timmer = setTimeout(() => {
        // 清除session
        sessionStorage.removeItem('sessionData')
        sessionStorage.clear()
        // 跳往登录页面
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push('/login')
          this.$store.commit('clearRouters')
          this.$notify({
            title: '错误',
            message: '登录超时,请重新登录',
            type: 'error',
            duration: 2000
          })
          location.reload()
        })
      }, 1000*60*30) // 设置半小时返回登录页
    }
  }
}
</script>
<style lang="scss">
@import "./assets/css/index.scss";
body {
    margin: 0;
    padding: 0;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    overflow: scroll;
    overflow-y: hidden;
}

#app {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}

.el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
}

.el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
}

.toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0;
    .el-form-item {
        margin-bottom: 10px;
    }
}

</style>