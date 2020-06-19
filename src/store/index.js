import Vue from 'vue';
import Vuex from 'vuex';
import common from './modules/common';
import test from './modules/test'
import user from './modules/user'
import {getters} from './getters'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
      common,
      test,
      user
  },
  getters
});

export default store