const MyTest = {
    state: {
        nums: 0,
        name: "小狗",
        love: "篮球"
    },

    // mutations 主要的作用是对state的状态进行修改的,不能直接修改state的属性值
    mutations: {
        addNums(state, n) {
            state.nums += n;
        },

        changeName(state, name) {
            state.name = name;
        },

        changeLove(state, love) {
            state.love = love;
        }
    },
    // 主要处理一些异步请求，请求回来的数据，重新改变state的属性，在经过mutations来改变
    actions: {
        // 函数的第一个变量维context
        changeNumsTime(context, playLoad) {
            setTimeout(() => {
                context.commit("addNums", playLoad.num);
            }, 3000);
        },
        changeNameTime({ commit, state }, name) {
            console.log("这是state实例吗", commit);

            setTimeout(() => {
                commit("changeName", name);
            }, 3000);
        }
    },

    //相当于vue中的computed，主要是响应数据，在数据被使用时，做一层包装，或者过滤
    getters: {
        nameLove2: function(state, getters, rootState) {
            console.log("我是根节点的状态", rootState);
            return state.nums + "喜欢" + state.love;
        },

        // 可以使得getters返回一个函数

        getMoneny: state => n => {
            return state.name + "有" + n + "这么多钱";
        }
    }
};

export default MyTest;