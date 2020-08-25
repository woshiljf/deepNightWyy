<template lang="html">
<div class="home-container">
  <el-row class="container">
    <head-bar />
    <content-main />
 </el-row>
<!-- <foot-bar v-if="playStats" :playmuisc="playStats" /> -->
</div>
</template>
<script>
import HeadBar from './components/head'
import ContentMain from './components/contentMain'
import FootBar from './components/footerBar'
import { mapGetters } from 'vuex'
export default {
  name: 'Layout',
  components: {
    HeadBar,
    ContentMain,
    FootBar
  },
  data () {
    return {
      playStats: playStats
    }
  },
  created () {
    // 获取useCode
    // this.getUserCode()
  },
  computed: {
    ...mapGetters(["playStats"])

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