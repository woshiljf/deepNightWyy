<template>
  <div class="container-header">
    <div class="header">
      <div class="logo" :class="'logo-width'">
        <img src="../../../assets/img/1186871.png" alt="" class="imglogo">
        <span class="logo-title">网抑云音乐</span>
      </div>
      <div class="navmenue">

        <el-drawer title="我是标题" :visible="playmuisc" :with-header="false" direction='btt'>
          <span>我来啦!</span>
          <div class="btn-audio">
            <audio id="mp3Btn" controls>
              <source
                src="http://m7.music.126.net/20200819230302/58ddb369275707d676c5dd952630238f/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
                type="audio/mpeg" />
            </audio>
          </div>

        </el-drawer>
      </div>

    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
// import Audio from '../../../components/audio'
export default {
  name: 'Head',
  components: {
    // Audio
  },
  data () {
    return {
      sysName: '网抑云音乐',
      sysUserName: '',
      treeArry: [],
      arry: [],
      drawer: false
    }
  },
  props: {

    playmuisc: {
      type: Boolean,
      default: () => { return false }
    }


  },
  computed: {
    ...mapGetters(["username", "password", "treeData"])
  },
  mounted () {

  },
  methods: {


  },
  created () {

  },
}
</script>
<style scoped>
.container-header {
  height: 70px;
  width: 100%;
  background-color: #333;
  position: relative;
  text-align: center;
  line-height: 70px;
  overflow: auto;
  z-index: 1000;
  position: fixed;
  bottom: 0;
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
  left: 350px;
  /* width: 100%; */
}
.logo-title {
  font-size: 20px;
  color: aliceblue;
}
.search {
  position: absolute;
  left: 900px;
}
.search-box {
  width: 200px;
  height: 45px;
  border-radius: 25px;
  padding-left: 25px;
  outline: none;
}
.userinfo {
  position: absolute;
  left: 90%;
  color: #fff;
}
.user-center {
  position: absolute;
  left: 1120px;
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
.myaudio {
  /* background-color: #333; */
}
.btn-audio {
  width: 186px;
  height: 186px;
}
</style>