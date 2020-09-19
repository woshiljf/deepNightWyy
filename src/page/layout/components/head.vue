<template>
  <div class="container-header">
    <div class="header">
      <div class="logo" :class="'logo-width'">
        <img src="../../../assets/img/1186871.png" alt="" class="imglogo" />
        <span class="logo-title">深夜网抑云音乐</span>
      </div>

      <div class="navmenue">
        <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#333333" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item index="1" @click="findMusic"> 发现音乐 </el-menu-item>
          <el-menu-item index="2" @click="myMusicHandle">我的音乐
          </el-menu-item>
          <el-menu-item index="3" @click="frendsHandle">朋友</el-menu-item>
          <el-menu-item index="4" @click="shopHandle"> 视频 </el-menu-item>
          <el-menu-item index="5" @click="musicPersonHandle">音乐人</el-menu-item>
          <el-menu-item index="6" @click="happyTime">快乐一下</el-menu-item>
        </el-menu>
      </div>
      <div>
        <div class="search">
          <input type="text" class="search-box" v-model="searchKewords" placeholder="音乐/视频/电台/用户"
            @keyup.enter="handlekey();" />
        </div>
        <!-- 搜索面板开始 -->

        <!-- 搜索面板结束 -->

        <div class="user-center">
          <el-button type="primary" round>创作者中心</el-button>
        </div>
      </div>
      <div class="userinfo">
        <img :src="userImg" alt="" class="imgamure" />
        <span class="name"> {{ sysUserName }}</span>
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner el-icon-caret-bottom"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="{path:'/myHome'}">我的主页</router-link>
            </el-dropdown-item>
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>我等级</el-dropdown-item>
            <el-dropdown-item>VIP会员</el-dropdown-item>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item>实名认证</el-dropdown-item>
            <el-dropdown-item divided @click.native="logoutFun">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapState } from "vuex";
import { getSearchSug, getCloundSearch } from "@/api/searchApi";
import SearchDash from "./searchDash";
export default {
  name: "Head",

  data () {
    return {
      sysName: "网抑云音乐",
      sysUserName: "",
      treeArry: [],
      arry: [],
      activeIndex2: "1",
      searchKewords: "",
      searchFlag: true,
      searchSongs: [],
      searchAlbums: [],
      searchArtists: [],
      order: [],
      isStranger: true,
      userImg: ''
    };
  },
  computed: {
    // ...mapState({
    //   userImg: state => state.user.userAvatarUrl,
    // })
  },
  watch: {
    searchKewords: function (newText, oldText) {
      this.getSearchContent(newText);
    }
  },

  mounted () {

    var user = sessionStorage.getItem("user");
    var isStranger = sessionStorage.getItem("stranger")
    this.isStranger = JSON.parse(isStranger).iSstranger
    this.userImg = JSON.parse(sessionStorage.getItem("userImage")).userImage
    if (user) {
      user = JSON.parse(user);
      this.sysUserName = user.loginName || "";
    }
  },
  methods: {
    logoutFun: function () {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            sessionStorage.removeItem("user");
            _this.$router.push("/login");
            // 退出清空router
            this.$store.commit("clearRouters");
          });
        })
        .catch(() => { });
    },
    myMusicHandle () {

      var isStranger = sessionStorage.getItem("stranger")
      this.isStranger = JSON.parse(isStranger).iSstranger

      if (this.isStranger == true) {
        this.$message({
          message: "你没有登录少年",
          type: "warning",
          duration: 2 * 1000
        });
        this.$router.push({ path: "/gotoLogin" });
      } else {
        this.$router.push({ path: "/mymusic" });
      }
    },
    findMusic () {
      this.$router.push({ path: "/" });
    },
    frendsHandle () {
      var isStranger = sessionStorage.getItem("stranger")
      this.isStranger = JSON.parse(isStranger).iSstranger
      if (this.isStranger == true) {
        this.$message({
          message: "你没有登录少年,先去登录一下",
          type: "warning",
          duration: 2 * 1000
        });
        this.$router.push({ path: "/gotoLogin" });
      } else {
        this.$router.push({ path: "/myfrends" });
      }
    },
    shopHandle () {
      this.$router.push({ path: "/shopcity" });
    },
    musicPersonHandle () {
      this.$router.push({ path: "/musicPerson" });
    },

    handleSelect () { },

    happyTime () {


      console.log('fdsf')
      this.$router.push({ path: "/happyTime" });


    },
    handlekey (e) {
      if (this.searchKewords == "") {
        return;
      }
      var obj = {
        searchSongs: [],
        searchAlbums: [],
        searchArtists: [],
        order: [],
        isShow: false
      };
      this.$store.commit("changeSearchInfo", obj);
      var p = {
        keywords: this.searchKewords
      };
      getCloundSearch(p)
        .then(res => {
          res.data.result.keywords = this.searchKewords;
          this.$store.commit("changeSearchOutCome", res.data.result);

          this.$router.push({ path: "/searchDash" });
        })
        .catch(err => {
          console.log(err);
        })
        .finally(e => {
          this.$router.push({ path: "/searchDash" });
        });
    },
    // 搜索数据开始
    getSearchContent (text) {
      if (text == "") {
        var obj = {
          searchSongs: [],
          searchAlbums: [],
          searchArtists: [],
          order: [],
          isShow: false
        };
        this.$store.commit("changeSearchInfo", obj);
        return;
      }
      this.searchFlag = true;
      getSearchSug(text).then(res => {
        if (Object.keys(res.data.result).length == 0) {
          return;
        }
        // 保存数据
        var searchSongs = res.data.result.songs;
        var searchAlbums = res.data.result.albums;
        var searchArtists = res.data.result.artists;
        var order = res.data.result.order;
        var obj = {
          searchSongs,
          searchAlbums,
          searchArtists,
          order,
          isShow: this.searchFlag
        };
        // 点击到确认到搜索界面可以看到搜索关键字
        this.$store.commit("changeSearchInfo", obj);
      });
    }
  },
  created () {
    if (this.userName) {
      this.sysUserName = this.userName;
    } else {
      this.sysUserName = "admin";
    }
  }
};
</script>
<style scoped>
.container-header {
  height: 70px;
  min-width: 1420px;
  width: 100%;
  background-color: #333;
  position: relative;
  text-align: center;
  line-height: 70px;
  overflow: auto;
}
.header {
  /* width: 1000px; */
  /* overflow: auto; */
}
.logo {
  position: absolute;
  left: 50px;
}
.imglogo {
  width: 55px;
  vertical-align: middle;
}
.imgamure {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  vertical-align: middle;
}
.navmenue {
  position: absolute;
  left: 300px;
  /* width: 100%; */
}
.logo-title {
  font-size: 20px;
  color: aliceblue;
}
.search {
  position: absolute;
  left: 820px;
  z-index: 10;
}
.search-box {
  width: 250px;
  height: 45px;
  border-radius: 25px;
  padding-left: 25px;
  outline: none;
}
.userinfo {
  position: absolute;
  left: 85%;
  color: #fff;
}
.user-center {
  position: absolute;
  left: 1080px;
}
.el-button--primary {
  color: #fff;
  background-color: #333;
  border-color: #ccc;
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 70px;
  line-height: 70px;
}
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 70px;
  line-height: 70px;
}
.outcome {
  position: absolute;
  top: 20px;
  left: 500px;
  z-index: 1000;
}
</style>
