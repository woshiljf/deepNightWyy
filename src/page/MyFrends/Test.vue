<template>
  <div class="box">
    <h1>我是一个BOX+==={{value}}</h1>
    <button @click="fn">点我</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '开不了口'
    }
  },
  props: {
    value: {
      type: String
    }
  },
  created () {


  },
  mounted () {

    this.$busEvent.$on('handleTest', msg => {

      console.log(msg)


    })
  },
  methods: {
    fn () {
      console.log('我');
      this.value = '子组件改变了值'
    },


  }

}
</script>

<style>
</style>