// 可以把所有的模块中getters单独拿出来放在一块
export const getters = {
    show(state){
        return '当前的数据为'+state.test.count

    },
    useRouter:state=>state.test.routeArr,
    token: state=>state.user.token
}