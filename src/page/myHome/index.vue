<template>
  <div class="myMusic-container">
    <div
      style="height: auto; border-left: 1px solid #eee;border-right: 1px solid #eee;"
      class="container-content"
    >
      <div class="content-left">
        <div style="height: auto">
          <div class="playListTitle">
            <div class="imagcover">
              <img
                :src="myProfile.profile.avatarUrl"
                alt=""
                style="width: 270px;heigth: 260px"
              />
            </div>
            <div class="description">
              <div class="con play-title">
                <span class="nametitle">{{ myProfile.profile.nickname }}</span>
              </div>

              <div class="con creator">
                <span>创建时间</span>
                <span
                  >{{
                    myProfile.createTime | formatDate(myProfile.createTime)
                  }}创建</span
                >
              </div>

              <div class="con button">
                <el-button type="danger"
                  >动态：{{ myProfile.profile.eventCount }}</el-button
                >
                <el-button type="danger"
                  >关注：{{ myProfile.profile.follows }}</el-button
                >
                <el-button type="danger"
                  >粉丝：{{ myProfile.profile.followeds }}</el-button
                >
              </div>
              <div class="con tag">
                <span>个人介绍</span>
                <el-button
                  round
                  size="mini"
                  v-for="(item, i) in playListInfo.playListTags"
                  :key="i"
                  >{{ item }}
                </el-button>
              </div>
              <div class=" con dec-content">
                <p>{{ myProfile.profile.signature }}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="table-title"
          style="width: 100%;   display: flex;
             justify-content: space-between;margin-top: 20px"
        ></div>
        <div class="playListTable">
          <el-table
            :data="dataSongs"
            stripe
            style="width: 100%"
            ref="playList"
            highlight-current-row
            :header-cell-style="{
              background: '#333',
              color: 'white',
              padding: '1px 0',
              height: '50px'
            }"
          >
            <el-table-column type="index" width="50" :index="indexMethod">
            </el-table-column>
            <el-table-column label="听歌">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  :type="scope.$index === buttonIndex ? 'goon' : 'default'"
                  @click="handleEdit(scope.$index, scope.row);"
                  :loading="scope.$index === index"
                  >播放
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="歌曲标题" width="180">
              <template slot-scope="scope">
                <router-link
                  :to="{ name: 'singInfo', params: { id: scope.row.id } }"
                >
                  <span class="singName">{{ scope.row.title }}</span>
                </router-link>
              </template>
            </el-table-column>
            <el-table-column prop="time" label="时长" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.time | formMin(scope.row.time) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="singer" label="歌手"> </el-table-column>
            <el-table-column prop="zj" label="专辑"> </el-table-column>
          </el-table>
        </div>

        <div>
          <div style="margin-top: 20px">
            <span class="comment-title" style="font-size: 25px">评论</span>
            <span class="comment-title" style="color:"
              >共 <span style="color: red">{{ total }}</span> 条评论</span
            >
            <div class="hr"></div>
          </div>
          <!-- <button @click="testClick">点我一下</button> -->

          <div class="commentBox">
            <div class="writeComment">
              <el-card class="box-card">
                <div class="commentText">
                  <div class="img">
                    <img
                      :src="userImg"
                      alt=""
                      style="width: 50px;height: 50px"
                    />
                  </div>
                  <div class="my-comment">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="评论"
                      v-model="textarea"
                      style="width: 100%"
                    >
                    </el-input>
                    <div class="commentclick">
                      <el-button
                        type="primary"
                        size="mini"
                        @click="submitMyComment"
                        >评论</el-button
                      >
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
            <el-card class="box-card">
              <div class="pagination">
                <el-pagination
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  :page-sizes="[10, 20, 30, 40, 50]"
                  @size-change="sizeChange"
                  @next-click="nextClick"
                  @current-change="currentChange"
                >
                </el-pagination>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get } from "@/utils/request";
import { getSimPlaysings, submitComment } from "@/api/listenSing";
import { getUserInfo } from "@/api/userlikesings";
import { mapState } from "vuex";

export default {
  name: "singInfo",
  data() {
    return {
      id: this.$route.params.id,
      index: "",
      flag: true,
      showColor: 0,
      singComment: [],
      total: 0,
      pageSize: 10,
      offset: 1,
      comentLoading: false,
      currentLineNum: 0,
      playing: true,
      simiPlayList: [],
      simiPlaysongs: [],
      loadIndex: 0,
      textarea: "",
      textarea2: "",
      commentIndex: 0,
      dataSongs: [],
      creatorInfo: {
        cAvatarUrl: "",
        cNickName: ""
      },
      // 歌单信息
      playListInfo: {
        trackCount: 0, //歌单曲目数量
        playCount: 0, // 播放次数
        createTime: 0, // 创建时间
        playListTags: [], // 歌单标签
        description: "", // 歌单描述
        coverImgUrl: "", //歌单图片
        nameTitle: "" // 歌单名字标题
      },
      songsId: 0,

      myProfile: null
    };
  },
  computed: {
    ...mapState({
      userImg: state => state.user.userAvatarUrl,
      buttonIndex: state => state.myTest.playButtonIndex,
      playListId: state => state.myTest.playListId
    })
  },
  filters: {
    formatDate: function(time) {
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
    },
    formMin: function(time) {
      var t = new Date(time);
      var m = t.getMinutes();
      var s = t.getSeconds();
      m = m > 9 ? m : "0" + m;
      s = s > 9 ? s : "0" + s;
      return m + ":" + s;
    }
  },
  created() {},
  mounted() {
    this.songsId = this.playListId;
    // this.getComment();
    // this.getPlaylist();
    // this.getRelatedList();
    this.getUserData();
  },

  watch: {
    datalist: function() {
      this.index = "";
      this.flag = true;
    },
    $route: function(to, from) {
      console.log("路由变化了");
    }
  },

  methods: {
    indexMethod(index) {
      return index * 1 + 1;
    },
    getComment() {
      var params = {
        id: this.playListId,
        limit: this.pageSize,
        offset: this.offset
      };
      this.comentLoading = true;
      get("api/comment/playlist", params).then(res => {
        // console.log('下一页开始', res);
        this.comentLoading = false;
        this.singComment = [];
        this.singComment = res.data.comments;
        this.total = res.data.total;
      });
    },
    getPlaylist() {
      var params = {
        id: this.playListId
      };
      get("api/playlist/detail", params)
        .then(response => {
          // console.log("歌单", response);

          this.handlePlayListInfo(response.data);
        })
        .catch(e => {
          console.log(e);
        })
        .finally(e => {});
    },
    handlePlayListInfo(songList) {
      var dataSongs = songList.playlist.tracks;
      var songsLength = songList.playlist.tracks.length;
      this.creatorInfo = {
        cNickName: songList.playlist.creator.nickname,
        cAvatarUrl: songList.playlist.creator.avatarUrl
      };
      this.playListInfo = {
        trackCount: songsLength, //歌单曲目数量
        playCount: songList.playlist.playCount, // 播放次数
        createTime: songList.playlist.createTime, // 创建时间
        playListTags: songList.playlist.tags, // 歌单标签
        description: songList.playlist.description, // 歌单描述
        coverImgUrl: songList.playlist.coverImgUrl, //歌单图片
        nameTitle: songList.playlist.name // 歌单名字标题
      };
      this.show(dataSongs);
    },
    show(data) {
      var dataList = [];
      for (let i = 0; i < data.length; i++) {
        var obj = {};
        obj.title = data[i].name;
        obj.singer = data[i].ar[0].name;
        obj.zj = data[i].al.name;
        obj.time = data[i].dt;
        obj.id = data[i].id;
        dataList.push(obj);
      }

      this.dataSongs = dataList;
      // console.log("处理的数据", this.dataSongs);
    },

    getUserData() {
      // /user/detail
      var myId = sessionStorage.getItem("userId");
      var params = {
        uid: JSON.parse(myId).userId
      };
      get("api/user/detail", params).then(res => {
        console.log("我的信息", res);
        this.myProfile = res.data;
      });
    },

    sizeChange(data) {
      this.pageSize = data;
      this.getComment();
    },
    nextClick(p) {
      this.offset = p;
      // 下一页
      this.flag = false;
      this.getComment();
    },
    currentChange(p) {
      if (this.flag) {
        this.offset = p;
        this.getComment();
      }
      this.flag = true;
    },
    // 获取包含正在播放歌曲的歌单
    getRelatedList() {
      var params = this.playListId;
      Promise.all([getRelatedPlayList(params)]).then(res => {
        this.simiPlayList = res[0].data.playlists;
      });
    },
    playSong(songid) {
      this.$store.commit("changePlayListId", songid);
      this.id = songid;
      this.getComment();
      this.getPlaylist();
      this.getRelatedList();
    },
    commentHandle(params) {
      if (params.content == "") {
        this.$message({
          type: "warning",
          message: "输入点内容吧"
        });
        return;
      }

      submitComment(params)
        .then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "评论成功"
            });
            this.textarea = "";
            this.textarea2 = "";
            this.commentIndex = 0;
          }
        })
        .catch(err => {
          console.log("评论失败", err);
          this.$message({
            type: "warning",
            message: "暂时不能评论"
          });

          this.textarea = "";
          this.textarea2 = "";
          this.commentIndex = 0;
        });
    },
    anwserHandle(commentId) {
      this.commentIndex = commentId;
    },
    submitMyComment() {
      var params = {
        id: this.id,
        content: this.textarea
      };
      this.commentHandle(params);
    },
    answerMyComment(commentId) {
      var params = {
        t: 2,
        id: this.id,
        content: this.textarea2,
        commentId: commentId
      };
      this.commentHandle(params);
    },

    // 播放歌曲的操作
    handleEdit(index, row) {
      this.songid = row.id;
      this.index = index;
      var params = {
        id: row.id
      };
      // this.currentRow = row;
      // 修改当前的播放歌曲id
      this.showColor = 1;
      this.$store.commit("changeNowPlayId", row.id);
      this.$store.commit("changePlayButtonIndex", index);
      this.$store.commit("changeShowOrHidden", true);
      get("api/song/url", params)
        .then(res => {
          this.index = "";
          var url = res.data.data[0].url;
          if (url !== null) {
            this.$store.commit("changePlayurl", url);
          } else {
            this.$message({
              message: "穷人听不起，要会员的。。。",
              type: "warning"
            });
          }
        })
        .catch(e => {
          console.log(e);
        })
        .finally(e => {});

      if (this.flag) {
        var temp = [];
        this.dataSongs.forEach(item => temp.push(item.id));
        this.$store.commit("changePlayList", temp);
        this.flag = false;
      }

      // 获取相似歌曲的歌单链表
      // this.getsimiList();
    },
    playHandle() {
      this.$store.commit("SET_PLAYSTATS", true);
    }
  },
  // 组件导航钩子
  beforeRouteEnter(to, from, next) {
    next(vm => {
      var preplayListId = vm.$store.state.myTest.prePlayListId;
      var curPlayListId = vm.$store.state.myTest.playListId;
      // 单曲播放得歌单和前一个歌单不一样，清楚播放记录按钮。
      if (preplayListId !== curPlayListId) {
        vm.$store.commit("changePlayButtonIndex", "");
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("changePrePlayListId", this.songsId);
    next();
  }
};
</script>

<style scoped>
.myMusic-container {
  padding: 0 200px;
  height: auto;
  justify-content: space-between;
  min-width: 1420px;
  padding-bottom: 80px;
}
.coverImgurl {
  width: 50px;
  height: 50px;
}

.playListTitle {
  display: flex;
}
.con {
  margin-bottom: 15px;
}
.imagcover {
  margin-right: 15px;
}
.nametitle {
  font-size: 20px;
}

.hr {
  background-color: red;
  width: 100%;
  height: 3px;
}
.box-card {
  margin-bottom: 5px;
}
.commentBox {
  text-align: start;
}
.img {
  float: left;
  margin-right: 10px;
}
.pagination {
  float: right;
  padding-bottom: 20px;
}
.current {
  /* float: left; */
  color: red;
}
.container-content {
  display: flex;
}

.content-left {
  width: 100%;
  padding: 20px 15px;
  border-right: 1px solid #ccc;
}
.singName:hover {
  text-decoration: underline;
}

.content-right {
  height: auto;
  width: 340px;
  padding: 0 20px;
}
.commentText {
  display: flex;
}
.my-comment {
  flex: 1;
}
.commentclick {
  margin-left: 5px;
  margin-top: 15px;
}
.anwser {
  float: right;
}
.el-button--goon.is-active,
.el-button--goon:active {
  background: #20b2aa;
  border-color: #20b2aa;
  color: #fff;
}
.el-table__body tr.hover-row > td {
  background-color: #333 !important;
}
.el-button--goon {
  background: red;
  border-color: #48d1cc;
  color: #fff;
}
.relatedS:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
