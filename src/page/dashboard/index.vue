
Skip to content
Pull requests
Issues
Marketplace
Explore
@woshiljf
woshiljf /
deepNightWyy

1
1

    0

Code
<template>
  <div class="dashboard">
    <el-container class="dash-container">
      <el-header class="suggestion-title">
        <div class="menu">
          <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
            background-color="#C20C0C" text-color="#fff" active-text-color="#cccccc">
            <el-menu-item index="1">推荐</el-menu-item>
            <el-menu-item index="2">排行榜</el-menu-item>
            <el-menu-item index="3">歌单</el-menu-item>
            <el-menu-item index="4">主播电台</el-menu-item>
            <el-menu-item index="5">歌手</el-menu-item>
            <el-menu-item index="6">新碟上架</el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main class="main-content">
        <div class="lunbotu">
          <el-carousel :interval="5000" arrow="always" class="carousel">
            <el-carousel-item v-for="item in imgurl" :key="item.url">
              <img :src="item.imgurl" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="suggestion-sing">
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="热门推荐" name="1"></el-tab-pane>
              <el-tab-pane label="华语" name="2"></el-tab-pane>
              <el-tab-pane label="流行" name="3"></el-tab-pane>
              <el-tab-pane label="摇滚" name="4"></el-tab-pane>
              <el-tab-pane label="民谣" name="5"></el-tab-pane>
              <el-tab-pane label="电子" name="6"></el-tab-pane>
              <el-tab-pane label="更多" name="7">
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="hot-sug">
            <el-row>
              <ul>
                <li class="sug-sings" v-for="item in creatives" :key="item">
                  <img :src="item.uiElement.image.imageUrl" alt="">
                  <div>
                    <span>
                      {{item.uiElement.mainTitle.title}}
                    </span>
                  </div>

                </li>
              </ul>
            </el-row>
          </div>
        </div>

        <div class="suggestion-sing">
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="styleSuggestion.uiElement.mainTitle.title" name="1"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="hot-sug">
            <el-row>
              <ul>
                <li class="sug-sings" v-for="item in styleSuggestion.creatives[0].resources" :key="item">
                  <img :src="item.uiElement.image.imageUrl" alt="">
                  <div>
                    <span>
                      {{item.uiElement.mainTitle.title}}
                    </span>
                  </div>

                </li>
              </ul>
            </el-row>
          </div>
        </div>

      </el-main>

    </el-container>

  </div>
</template>
<script>
import imgurl from '../../../static/lunbotu.json'
import { getHomePage } from '../../api/homepage'
import { getuserplaylist } from '../../api/userlikesings'
export default {
  data () {
    return {
      userName: '',
      imgurl: imgurl.data,
      singinfo: null,
      creatives: [],
      styleSuggestion: []
    }
  },
  created () {
    this.getHomeInfor()
    var user = sessionStorage.getItem("userId");
    if (user) {
      user = JSON.parse(user);
      this.userId = user.userId || "";
    }
    this.getplaylist(this.userId)
  },
  methods: {
    getHomeInfor () {
      getHomePage().then(res => {
        this.singinfo = res.data.data.blocks
        this.creatives = res.data.data.blocks[0].creatives
        this.styleSuggestion = res.data.data.blocks[2]
        console.log(this.creatives);
      }).catch(e => {
      })
    },
    // 获取歌单列表
    getplaylist (userId) {
      // console.log('dahaigou');
      var dataPlayList = sessionStorage.getItem("dataList")
      if (dataPlayList) {
        return
      } else {
        getuserplaylist(userId).then(response => {
          var data = response.data.playlist
          sessionStorage.setItem("dataList", JSON.stringify({ data }))
        })
      }
    },
  }
}
</script>
<style scoped>
.dashboard {
  text-align: center;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
  /* margin: 0 200px; */
}
.suggestion-title {
  height: 40px;
  padding: 0;
}
.main-content {
  padding: 0;
}
.hot-sug ul {
  list-style: none;
}
.sug-sings {
  width: 150px;
  height: 200px;
  border: 1px solid #000;
  margin-left: 5px;
  float: left;
}
.sug-sings img {
  width: 100%;
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
</style>

