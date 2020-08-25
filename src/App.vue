<template>
  <div
    id="app"
    @mousemove="moveEvent"
    @click="moveEvent"
    @mouseenter="browerPlayEnter"
  >
    <router-view></router-view>

    <div class="playMusic" @mousemove="playMove" v-if="flase">
      <el-drawer
        title="我是标题"
        :visible.sync="playStats"
        :with-header="false"
        direction="btt"
        :modal="false"
        :modal-append-to-body="false"
        size="10%"
      >
        <div class="btn-audio">
          <audio id="mp3Btn" controls>
            <source
              src="http://m7.music.126.net/20200819230302/58ddb369275707d676c5dd952630238f/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
              type="audio/mpeg"
            />
          </audio>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  data() {
    return {
      isRouterAlive: true,
      timmer: null,
      playStats: playStats,
      timeId: null,
    };
  },
  created() {
    this.moveEvent();
  },
  computed: {
    ...mapGetters(["playStats"]),
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    moveEvent() {
      // 只要鼠标在页面活动，清除计时器，重新计时
      const path = ["/login"];
      if (document.URL.indexOf(path) === -1) {
        // 如果不是登录页面的话页面停止进行30分钟后清空session
        clearTimeout(this.timmer);
        this.init();
      }
    },
    init() {
      this.timmer = setTimeout(() => {
        // 清除session
        sessionStorage.removeItem("sessionData");
        sessionStorage.clear();
        // 跳往登录页面
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push("/login");
          this.$store.commit("clearRouters");
          this.$notify({
            title: "错误",
            message: "登录超时,请重新登录",
            type: "error",
            duration: 2000,
          });
          location.reload();
        });
      }, 1000 * 60 * 30); // 设置半小时返回登录页
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          this.$store.commit("SET_PLAYSTATS", false);

          done();
        })
        .catch((_) => {});
    },
    playMove() {
      clearTimeout(this.timeId);
      this.$store.commit("SET_PLAYSTATS", true);
      this.startTime();
    },
    startTime() {
      this.timeId = setTimeout(() => {
        this.$store.commit("SET_PLAYSTATS", false);
      }, 1000);
    },

    browerPlayEnter() {
      this.$store.commit("SET_PLAYSTATS", true);
    },
  },
};
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
  min-width: 1200px;
  // min-height: 1000px;
  background: #f5f5f5;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  overflow: auto;
}

#app {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-drawer__body {
  background-color: #333;
}
#mp3Btn {
  background-color: #444;
}
</style>
