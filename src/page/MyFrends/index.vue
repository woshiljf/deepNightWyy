<template>
  <div>

    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      点我打开
    </el-button>

    <input type="text" v-model="name">
    <button @click="handle">带你玩</button>
    <h1>{{msg}}</h1>
    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" :modal="false" :modal-append-to-body="true"
      style="z-index: -1200">
      <span>我来啦!</span>
    </el-drawer>
    <test v-model="name" ref="test"></test>
  </div>
</template>
<script>

import { mapState, mapGetters, mapMutations } from 'vuex'
import Test from './Test'
export default {
  components: {
    Test
  },

  data () {
    return {
      msg: '我的名字',
      name: '小猪',
      mySport: '',
      newName: this.$store.state.myTest.name,
      drawer: false,
    }
  },

  // computed: mapState({

  //   myName: state => state.myTest.name,
  //   myLove: state => state.myTest.love

  // }),
  // computed: {

  //   getMsg: function () {
  //     return this.msg
  //   },
  //   ...mapState({
  //     myName: state => state.myTest.name,
  //     myLove: state => state.myTest.love,
  //     getNums: state => state.myTest.nums
  //   })

  // },

  computed: {
    // 使用扩展运算发，直接将所需要的getters属性添加到computed当中
    //  另取其他的名字，使用对象的形式
    // ...mapGetters({
    //   // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
    //   doneCount: 'doneTodosCount'
    // })
    ...mapGetters([
      'nameLove'
    ])


  },


  methods: {
    btnTest () {

      var storeName = this.$store.state.myTest.name
      console.log(storeName);
      console.log(this.myName + 'xxxx');

      this.$store.commit('changeLove', '妹子')

      this.mySport = this.$store.getters.nameLove
      console.log(this.mySport);
      setTimeout(() => {
        this.$store.commit('changeLove', '牛技术')
        this.mySport = this.$store.getters.nameLove
      }, 1000)


      var a = this.$store.getters.nameLove2
      this.$store.dispatch('changeNameTime', '我不是王思聪')


      this.$store.dispatch({
        type: 'changeNumsTime',
        num: 1500
      })



      // getters返回一个函数，将来在做数据过滤的时候可以用得着
      var moneny = this.$store.getters.getMoneny(1000)
      console.log(moneny);
      this.newName = storeName
      this.changeMynam('萧十一郎')








    },
    ...mapMutations({

      changeMynam: 'changeName'

    }),
    handle () {
      this.$busEvent.$emit('handleTest', '测试小狗')
    }
  }

}
</script>
<style  scoped>
</style>