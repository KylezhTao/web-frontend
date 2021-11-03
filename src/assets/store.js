import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={//全局数据
    count: 0,
    token: localStorage.getItem('token') ? localStorage.getItem('token'):'',
    userNameStored:""
};
 

export default new Vuex.Store({
	state,
	getters:{    // 监听数据变化的
		getStorage(state){   // 获取本地存储的登录信息
	      if(!state.token){
	        state.token =JSON.parse(localStorage.getItem(key))
	      }
	      return state.token
	    }
	},
	mutations:{
		$_setToken(state, value) { // 设置存储token
	        state.token = value;
	        localStorage.setItem('token', value);
	    },
	    $_removeStorage(state, value){  // 删除token
		      localStorage.removeItem('token');
	    },
	}
})
