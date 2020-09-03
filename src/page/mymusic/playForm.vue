<template>
  <div class="myMusic-container">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-header style="height: auto">
        <div class="lrc">
          <span>{{ geci }}</span>
        </div>
      </el-header>

      <el-main style="text-align: center">
        <div>
          <hr style="color: red" />
        </div>
        <!-- <button @click="testClick">点我一下</button> -->
        <div>
          <el-button type="primary" @click="getComment">获取歌曲评论</el-button>
        </div>

        <div class="commentBox">
          <el-card class="box-card" v-for="item in singComment" :key="item.user.userId">
            <div class="img">
              <img :src="item.user.avatarUrl" alt="" style="width: 120px;height: 120px" />
            </div>
            <div class="comment">
              <p>{{ item.user.nickname }}</p>
              <span>{{ item.content }}</span>
              <p>{{ item.time | formatDate(item.time) }}</p>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { get } from "../../utils/request";
export default {
  data () {
    return {
      id: this.$route.params.id,
      geci: "",
      singComment: []
    };
  },
  watch: {
    // 监听路由变化
    $route: function (to, from) {

      console.log('route变化');

    }



  },

  filters: {
    formatDate: function (time) {
      var now = new Date(time);
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      var hour = now.getHours(); //返回日期中的小时数（0到23）
      var minute = now.getMinutes(); //返回日期中的分钟数（0到59）
      var second = now.getSeconds(); //返回日期中的秒数（0到59）
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    }
  },
  methods: {
    getComment () {
      console.log("执行了吗");
      var params = {
        id: this.$route.params.id,
        limit: 20
      };
      get("api/comment/music", params).then(res => {
        this.singComment = res.data.comments;
      });
    }
  },
  // 组件导航钩子

  beforeRouteEnter (to, from, next) {
    console.log("adfsfsdfsdf");
    next(vm => {
      console.log("歌曲id", vm.$route.params.id);
      var params = {
        id: vm.$route.params.id
      };
      get("api/lyric", params)
        .then(res => {
          console.log(res);
          vm.geci = res.data.lrc.lyric;
        })
        .catch(e => {
          console.log(e);
        })
        .finally(e => { });
    });
  }
};
</script>

<style scoped>
.myMusic-container {
  padding: 0 200px;
}
.coverImgurl {
  width: 50px;
  height: 50px;
}

.lrc {
  text-align: center;
  line-height: 50px;
}
.img,
.comment {
  float: left;
  margin-right: 10px;
}
</style>
