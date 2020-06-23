// 可以把所有的模块中getters单独拿出来放在一块
export const getters = {
    useRouter:state=>state.tagsRoute.routeArr,
    token: state=>state.user.token
}