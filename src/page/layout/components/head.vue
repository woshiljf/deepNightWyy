<template>
  <div class="head">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="'logo-width'">
        <el-col class="logo-img"></el-col>
        <el-col class="logo-title">{{sysName}}</el-col>
      </el-col>
      <el-col :span="10" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="4" class="userinfo">
        {{ sysUserName }}
          <el-dropdown trigger="hover">
              <span class="el-dropdown-link userinfo-inner el-icon-caret-bottom"></span>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>我的消息</el-dropdown-item>
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
      </el-col>
    </el-col>     
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'Head',
  data() {
    return{
      sysName: '系统管理',
      sysUserName: '' ,
      treeArry: [],
      arry: []
    }
  },
  computed: {
    ...mapGetters(["username", "password", "treeData"])
  },
  mounted() {
    var user = sessionStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.loginName || "";
    }
  },
  methods: {
    logoutFun: function() {
      var _this = this
      this.$confirm("确认退出吗?", "提示", {
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('LogOut').then(()=>{
            sessionStorage.removeItem("user")
            _this.$router.push("/login")
          // 退出清空router
            this.$store.commit('clearRouters')
          })
        })
        .catch(() => {})
    },
  },
  created() {
    if (this.userName) {
      this.sysUserName = this.userName
    } else {
      this.sysUserName = "admin";
    }
  },
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