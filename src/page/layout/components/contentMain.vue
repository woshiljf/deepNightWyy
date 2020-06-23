<template>
  <div class="contentMain">
    <el-col :span="24" class="main">
      <!-- sidebar, 左侧菜单栏 -->
      <aside :class="'menu-expanded'">
        <!--导航菜单, 三层嵌套结构-->
       <el-menu :default-active="$route.path" ref="bigmenu" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" unique-opened router>
          <div v-for="(item,index) in $router.options.routes" :key="item.path">
              <template  v-if="!item.hidden && checkContains(item.name)">
                <!-- 单页面判断 -->
                <el-submenu :index="index+''" v-if="!item.single">
                  <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                   <div v-for="child in item.children" :key="child.path">
                      <template  :index="item.path +'/'+ child.path"  v-if="!child.hidden && checkContains(child.name)">
                        <el-menu-item v-if="!child.children" @click="addRouter(child, item.path +'/'+ child.path)" :index="item.path +'/'+ child.path">{{child.name}}</el-menu-item>
                        <el-submenu v-else  :index="item.path +'/'+ child.path">
                          <template slot="title">{{ child.name }}</template>
                         <el-menu-item v-for="sonChild in child.children" :key="sonChild.path" @click="addRouter(sonChild, item.path +'/'+ child.path + '/' + sonChild.path)" :index="item.path +'/'+ child.path + '/' + sonChild.path">{{ sonChild.name }}</el-menu-item>
                      </el-submenu>
                     </template>
                   </div>
                </el-submenu>
                <el-menu-item v-else v-for="child in item.children" :index="child.path" :key="child.path" @click="addRouter(child)">
                 <!--菜单图标 -->
                 <i :class="item.iconCls"></i>
                 <!-- 菜单标题 -->
                 <span slot="title">{{ child.name }}</span>
                 <!-- 前端路由跳转 -->
                 <router-link :to="child.path">
                 </router-link>
                </el-menu-item>
         </template>
          </div>
       </el-menu>
     </aside>
     <!-- 右侧内容区域 -->
     <section class="content-container">
       <div class="grid-content bg-purple-light">
         <el-row class="nav-tabs">
          <el-col :span="24">
            <div @click="changeRouter(index)" v-for="(option, index) in useRouter" class="cus-tab-box" :class="activepath==option.path?'activeTab':''" :key="option.path">
              <span>{{option.name}}</span>
              <span @click.stop="useRouter.length!=1 && removeTab(index)"><i class="fa fa-times close-icon" aria-hidden="true"></i></span>
            </div>
          </el-col>
         </el-row>
         <el-col :span="24" class="content-wrapper">
           <transition name="fade-transform" mode="out-in">
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
           </transition>
         </el-col>
       </div>
     </section>
   </el-col>
  </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
  name: 'Content',
  components: {
  },
  data() {
    return {
      arry: this.$store.state.tagsRoute.routeArr,
      activepath: '',
    }
  },
  watch: {
    $route(to, from) {
      this.activepath = to.path
    }
  },
  created(){
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
  },
  computed: {
    ...mapGetters(['useRouter'])
  },
  created(){
    
  },
  mounted(){
    //首次添加router
    this.activepath = this.$router.history.current.path
    this.addRouters(this.$router.history.current)
  },
  methods: {
    ...mapMutations(['addRouters']),
    changeRouter(index) {
      this.$router.push(this.arry[index].path);
    },
    removeTab(index) {
      this.arry.splice(index, 1);
      if (index == 0) {
        this.$router.push(this.arry[0].path);
      } else {
        this.$router.push(this.arry[index - 1].path);
      }
      sessionStorage.setItem("tabData", JSON.stringify(this.arry));
    },
        // 检查树结构是否包含当前节点
    checkContains(name) {
      return true;
      // return this.treeArry.includes(name);
    },
        // 往tab页添加router
    addRouter(data, path) {
      const obj = Object.assign({}, data)
      if (path) {
        obj.path = path
      }
      let flag = true;
      for (let i = 0; i < this.arry.length; i++) {
        if (this.arry[i].path == obj.path) {
          flag = false;
          return
        }
      }
      if (flag) {
        this.arry.push(obj);
      }
      flag = true
      // sessionStorage.setItem("tabData", JSON.stringify(this.arry))
    },
  }
}
</script>
<style scoped lang="scss">
@import "../../../assets/css/them.scss";
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 50px;
    line-height: 50px;
    background: $globalColor;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
      }
    }
    .logo {
      height: 50px;
      font-size: 22px;
      padding-left: 20px;
      border-color: $borderColor;
      border-right-width: 1px;
      border-right-style: solid;
    }
    .logo-width {
      text-align: right;
      width: 180px;
      color: $baseColor;
      .logo-img {
        display: inline-block;
        width: 40px;
        height: 40px;
        margin-top: 5px;
        background-image: url("../../../assets/img/element-ui.svg");
        background-size: cover;
      }
      .logo-title {
        display: inline-block;
        line-height: 50px;
        width: 100px;
        height: 50px;
      }
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 50px;
    bottom: 0;
    overflow: hidden;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 60px;
        background: $globalColor;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 180px;
      width: 230px;
      z-index: 100;
    }
    .single-menu {
      height: 40px;
      line-height: 40px;
      padding-left: 45px;
      color: #fff;
      background-color: $baseColor;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .nav-tabs {
        font-size: 12px;
        border-bottom: 1px solid #e4e7ed;
        .cus-tab-box {
          display: inline-block;
          margin: 5px 0px 5px 5px;
          padding: 3px 10px;
          border: 1px solid #ccc;
          border-radius: 2px;
          cursor: pointer;
        }
        .activeTab {
          background-color: $baseColor;
          color: #fff;
          border-color: #fff;
        }
        .close-icon {
          transform: rotate(0deg);
          transition: transform 1s;
        }
        .close-icon:hover {
          transform: rotate(180deg);
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
  .breadcrumb-container {
    margin-top: 20px;
    margin-left: 20px;
  }
}
</style>