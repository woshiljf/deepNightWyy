<template>
  <div class="dashboard">
    <div class="dash-container">
      <div class="menu">
        <el-menu class="el-menu-demo" mode="horizontal" @select="() => {}" background-color="#C20C0C" text-color="#fff"
          active-text-color="#cccccc">
          <el-menu-item index="1">推荐</el-menu-item>
          <el-menu-item index="2">排行榜</el-menu-item>
          <el-menu-item index="3">歌单</el-menu-item>
          <el-menu-item index="4">主播电台</el-menu-item>
          <el-menu-item index="5">歌手</el-menu-item>
          <el-menu-item index="6">新碟上架</el-menu-item>
        </el-menu>
      </div>
      <div class="lunbotumain">
        <div class="lunbotu">
          <el-carousel :interval="5000" arrow="always" class="carousel">
            <el-carousel-item v-for="item in imgurl" :key="item.imgageUrl">
              <img :src="item.imageUrl" :alt="item.typeTitle" @click="
                  gotoHomeSong(item.targetId, item.targetType, item.typeTitle);
                " />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="main-content">
        <div class="suggestion-sing">
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="热门推荐" name="1"></el-tab-pane>
              <el-tab-pane label="华语" name="2"></el-tab-pane>
              <el-tab-pane label="流行" name="3"></el-tab-pane>
              <el-tab-pane label="摇滚" name="4"></el-tab-pane>
              <el-tab-pane label="民谣" name="5"></el-tab-pane>
              <el-tab-pane label="电子" name="6"></el-tab-pane>
              <el-tab-pane class="more" label="更多" name="7" style="position: absolute;right: 0"></el-tab-pane>
            </el-tabs>
          </div>

          <div class="hot-sug">
            <div>
              <ul class="sugImg">
                <li class="sug-sings" v-for="item in personData" :key="item.id">
                  <div class="sug-class" @click="goToPlayList(item.id);">
                    <img :src="item.picUrl" alt="" />
                    <div>
                      <span> {{ item.name }} </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="newAblum-container">
            <div class="title">
              <span class="newAblum">新碟上架</span>
              <span class="more">更多</span>
            </div>

            <div class="diside">
              <hr style="color: red " />
            </div>

            <div class="ablumcontent">
              <ul class="ablum-li">
                <li v-for="item in newalbums" :key="item.id" class="img-li">
                  <img :src="item.picUrl" alt="" />
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getHomePage,
  gerPersona,
  getNewAlbum,
  getTop
} from "../../api/homepage";
import { getHomeLubo } from "../../api/getHomeLubotu";
import { getuserplaylist } from "../../api/userlikesings";
export default {
  data () {
    return {
      userName: "",
      imgurl: [],
      singinfo: null,
      creatives: [],
      activeName: "0",
      styleSuggestion: [],
      personData: [],
      newalbums: [],

    };
  },
  created () {
    this.getHomeInfor();
    this.getHome();
    this.getPersonList();
    this.getnewAb();
    var user = sessionStorage.getItem("userId");
    if (user) {
      user = JSON.parse(user);
      this.userId = user.userId || "";
    }
    this.getplaylist(this.userId);
  },
  methods: {
    getHomeInfor () {
      getHomePage()
        .then(res => {
          this.singinfo = res.data.data.blocks;
          this.creatives = res.data.data.blocks[0].creatives;
          this.styleSuggestion = res.data.data.blocks[2];
        })
        .catch(e => { });
    },
    // 获取歌单列表
    getplaylist (userId) {
      // console.log('dahaigou');
      var dataPlayList = sessionStorage.getItem("dataList");
      if (dataPlayList) {
        return;
      } else {
        getuserplaylist(userId).then(response => {
          var data = response.data.playlist;
          sessionStorage.setItem("dataList", JSON.stringify({ data }));
        });
      }
    },
    getHome () {
      getHomeLubo().then(res => {
        this.imgurl = res.data.banners;
      });
    },
    getPersonList () {
      gerPersona().then(res => {
        this.personData = res.data.result.slice(0, 12);
      });
    },
    getnewAb () {
      getNewAlbum(20, 0).then(res => {
        // this.newalbums = res.data.album.slice(0, 10);
        this.newalbums = res.data.weekData.slice(0, 10);
      });
    },
    goToPlayList (sId) {
      // 解决歌单页面跳转无法请求得问题
      this.$store.commit("changePlayListId", sId);
      this.$router.push({
        name: "playlist",
        params: {
          id: sId
        }
      });
    },
    gotoHomeSong (id, type, title) {
      this.$router.push({
        name: "homePlay",
        query: {
          targetId: id,
          targetType: type,
          typeTitle: title
        }
      });
    },

    handleClick () {
      console.log("a");
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  }
};
</script>
<style scoped>
ul {
  padding: 0;
  margin: 0;
}
.dashboard {
  overflow-y: scroll;
  height: 1200px;
  width: 100%;
  color: #fff;
  min-width: 1420px;

  /* margin: 0 200px; */
}
.more {
  right: 0;
}
.el-menu-demo {
  color: #fff;
}
.suggestion-title {
  height: 40px;
  padding: 0;
}
.el-tabs__nav {
  width: 100%;
}
#tab-7 {
  position: absolute !important;
  right: 0;
}
.main-content {
  width: 100%;
  height: auto;
  /* border: 1px solid #ccc; */
}
.suggestion-sing {
  margin: 0 200px;
  /* border: 1px solid #ccc; */
  height: 100%;
  float: left;
}
.lunbotumain {
  width: 100%;
  text-align: center;
}
.lunbotu {
  padding: 0 150px;
  width: 100%;
  height: auto;
  /* border-bottom: 1px solid #333; */
  background-color: #1e131d;
}
.hot-sug {
  width: 100%;
  margin-bottom: 15px;
  overflow: hidden;
}

.hot-sug ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sug {
  float: left;
}
.sugImg li {
  float: left;
}
.sug-sings {
  width: 150px;
  height: 200px;
  /* border: 1px solid #000; */
  width: 15%;
  margin-left: 18px;
  margin-bottom: 5px;
}
.sug-sings img {
  width: 150px;
  height: 150px;
}
.image {
  width: 140px;
  height: 140px;
}
.el-main {
  padding: 0;
  margin-top: -19px;
  padding: 0 150px;
}
.el-menu--horizontal > .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.menu {
  padding-left: 300px;
  background-color: #c20c0c;
}
.el-card {
}

/* 新碟上架部分 */
.title {
  display: flex;
  justify-content: space-between;
  padding: 0px 5px;
}
.newAblum {
  color: #333;
  font-size: 20px;
  font-weight: bold;
}
.more {
  color: red;
  cursor: pointer;
}
.ablum-li {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.img-li {
  width: 200px;
  height: 200px;
  list-style: none;

  margin-bottom: 5px;
}
.img-li img {
  width: 100%;
  height: 100%;
}
</style>
