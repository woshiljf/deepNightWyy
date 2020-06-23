import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import tagsRoute from './modules/tagsRoute'
import user from './modules/user'
import {getters} from './getters'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
      common,
      tagsRoute,
      user
  },
  getters
});

export default store