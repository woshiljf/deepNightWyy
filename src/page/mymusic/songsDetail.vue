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

        <div class="songsList">
          <div>
            <span>歌曲列表</span>
            <span>播放次数</span>
          </div>
          <hr />
          <div>
            <el-table :data="datalist" stripe style="width: 100%">
              <el-table-column type="index" width="50" :index="indexMethod">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" :loading="scope.$index===index">播放
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
import { nowListenMusic } from '../../api/listenSing'
export default {

  data () {
    return {
      singInformation: '',
      index: '',
      drawer: false
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
    }
  },
  methods: {
    indexMethod (index) {
      return index * 1;
    },
    handleEdit (index, row) {

      this.index = index
      nowListenMusic(row.id).then(response => {

        this.index = ''

        console.log('大海沟', response);


      }).catch(e => {

        console.log(e);
      })
    },
    playHandle () {
      console.log('播放歌曲');
      console.log(this.$store.state.common.playStats);
      this.$store.commit('SET_PLAYSTATS', true)
      // setTimeout(() => {
      //   this.$store.commit('SET_PLAYSTATS', false)
      // }, 2000)

    }
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
</style>