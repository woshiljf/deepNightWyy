<template>
  <div>
    <el-button
      @click="drawer = true;"
      type="primary"
      style="margin-left: 16px;"
    >
      点我
    </el-button>

    <div class="box">
      <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false">
        <span>我来啦!</span>
      </el-drawer>
    </div>
    <div class="demo-image__preview">
      <h1>abd</h1>
      <el-image
        style="width: 100px; height: 100px"
        :src="url"
        :preview-src-list="srcList"
      >
      </el-image>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "ltr",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ]
    };
  },

  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$store.commit("SET_PLAYSTATS", false);

          done();
        })
        .catch(_ => {});
    },
    handleClick() {
      console.log("执行了啊");
      this.drawer = true;
    }
  }
};
</script>

<style></style>
