<template>
  <div>

    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      点我
    </el-button>

    <div class="box">
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        <span>我来啦!</span>
      </el-drawer>

    </div>
  </div>
</template>

<script>
export default {

  data () {
    return {
      drawer: false,
      direction: 'ltr',
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
    },
    handleClick () {

      console.log('执行了啊')
      this.drawer = true


    }
  }

}
</script>

<style>
</style>