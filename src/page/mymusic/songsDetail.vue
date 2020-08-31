<template>
  <div class="songs-container">
    <div>
      <div>
        <div class="songs-title">
          <div class="imgshow description">
            <img :src="imgUrl" alt="歌单图片" class="songsImg" style="width:260px;height:260px">
          </div>
          <div class="songsDescription description">
            <h2>{{songsTitle}}</h2>
            <h4>
              <img src="" alt="">
              <span>2015-01-01 创建</span>
            </h4>
            <el-button type="primary" @click="playHandle">播放</el-button>
            <el-button type="success">收藏</el-button>
            <el-button type="info">分享</el-button>
            <el-button type="warning">下载</el-button>
            <el-button type="danger">评论</el-button>

            <p>{{songsDescription}}</p>

          </div>

        </div>
      </div>
      <div>

        <div class="songsList" v-loading="tableloading">
          <div>
            <span>歌曲列表</span>
            <span>播放次数</span>
          </div>
          <hr />
          <div>
            <el-table :data="datalist" stripe style="width: 100%" ref="playList" highlight-current-row
              :header-cell-style="{background: '#333', color: 'white', padding: '1px 0',height: '50px'}">
              <el-table-column type="index" width="50" :index="indexMethod">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" :type="scope.$index===buttonIndex ?'goon': 'default'"
                    @click="handleEdit(scope.$index, scope.row)" :loading="scope.$index===index">播放
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="歌曲标题" width="180">
              </el-table-column>
              <el-table-column prop="time" label="时长" width="180">
              </el-table-column>
              <el-table-column prop="singer" label="歌手">
              </el-table-column>
              <el-table-column prop="zj" label="专辑">
              </el-table-column>
            </el-table>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { get } from '../../utils/request'
import { Select } from 'element-ui'
import { mapState } from 'vuex'
export default {

  data () {
    return {
      singInformation: '',
      index: '',
      drawer: false,
      flag: true,
      selectedArr: {},
      showColor: 0
    }
  },
  props: {
    datalist: {
      type: Array,
      default: function () {
        return []
      }
    },
    id: {
      type: Number,
      default: function () {
        return 0
      }
    },
    imgUrl: {
      type: String,
      default: () => {
        return ''
      }
    },
    songsDescription: {
      type: String,
      default: () => {
        return ''
      }
    },
    songsTitle: {
      type: String,
      default: () => {
        return ''
      }
    },
    tableloading: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  methods: {
    indexMethod (index) {
      return index * 1;
    },
    handleEdit (index, row) {
      this.index = index
      var params = {
        id: row.id
      }
      // this.currentRow = row;
      // 修改当前的播放歌曲id
      this.showColor = 1
      this.$store.commit('changeNowPlayId', row.id)
      this.$store.commit('changePlayButtonIndex', index)
      this.$store.commit('changeShowOrHidden', true)
      get('api/song/url', params).then(res => {
        this.index = ''
        var url = res.data.data[0].url
        if (url !== null) {
          this.$store.commit('changePlayurl', url)
        } else {
          this.$message({
            message: '穷人听不起，要会员的。。。',
            type: 'warning'
          });
        }
      }).catch(e => {
        console.log(e);
      }).finally(e => {

      })

      if (this.flag) {
        var temp = []
        this.datalist.forEach(item => temp.push(item.id))
        this.$store.commit('changePlayList', temp)
        this.flag = false
      }
    },
    playHandle () {
      this.$store.commit('SET_PLAYSTATS', true)
    },
  },
  watch: {
    datalist: function () {
      this.index = ''
      this.flag = true
      this.$store.commit('changePlayButtonIndex', '')
    },
  },
  computed: {
    ...mapState({
      buttonIndex: state => state.myTest.playButtonIndex
    })

  },
  mounted () {

  }

}
</script>

<style scoped>
.songsImg {
  width: 260px;
  height: 260px;
}
.songs-container {
  width: 100%;
  height: 100%;
}
.songs-title {
  display: flex;
  justify-content: space-around;
}
.description {
  margin-left: 10px;
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
</style>