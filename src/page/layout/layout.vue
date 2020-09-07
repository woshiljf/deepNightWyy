<template lang="html">
<div class="home-container">
  <el-row class="container">
    <head-bar />
    <search-dash ref="searchDash" 
    :search-songs="searchSongs"
    :search-artists="searchArtists"
    :search-albums="searchAlbums"
    v-show="isShow" />
    <content-main />
    <foot-bar/>
 </el-row>

</div>
</template>
<script>
import HeadBar from './components/head'
import ContentMain from './components/contentMain'
import FootBar from './components/footerBar'
import { mapGetters, mapState } from 'vuex'
import SearchDash from './components/searchDash'

export default {
  name: 'Layout',
  components: {
    HeadBar,
    ContentMain,
    FootBar,
    SearchDash
  },
  data () {
    return {
      isShow: false,
      searchSongs: [],
      searchArtists: [],
      searchAlbums: []
    }
  },
  created () {
    // 获取useCode
    // this.getUserCode()
  },
  computed: {
    ...mapState({
      SearchData: state => state.myTest.searchInfo
    })
  },
  watch: {
    SearchData: function (newV, oldV) {
      console.log('执行了吗')
      this.isShow = this.SearchData.isShow
      console.log('显示', this.isShow)
      this.searchSongs = this.SearchData.searchSongs
      this.searchArtists = this.SearchData.searchArtists
      this.searchAlbums = this.SearchData.searchAlbums
    }
  },


  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.$store.commit('SET_PLAYSTATS', false)

          done();
        })
        .catch(_ => { });
    }
  }
}
</script>
<style scoped lang="scss">
</style>