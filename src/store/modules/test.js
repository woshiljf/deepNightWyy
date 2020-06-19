const test = {
    state: {
        count:0,
        routeArr: [],
        dataArr: []
    },
    mutations:{
      add(state){
          state.count++
      },
      addn(state, n){
          state.count+=n
      },
      // 添加router
      addRouters(state, route) {
        //   防止重复添加route
        var path = route.path
        for (const route of state.routeArr) {
            if(path===route.path){
                return
            }  
        }
        state.routeArr.push(route)
      },
      // 退出清空wrouter
      clearRouters(state) {
        state.routeArr = []
      },
      changeMsg(state, msg) {
        state.msg = msg
      }
    },
    // actions 不修改数据，只做异步的操作，数据的修改在mutations中
    // 在组件中使用dispatch的方法调用
    actions: {
        addasync({commit}){
            setTimeout(()=>{
                commit('add')
            },1000)
        },
        change(context) {
            console.log(context)
            // 可以修改state，但是不推荐
            context.state.count++
        }

    },
}
export default test