import vue from 'vue'
import Vuex from 'vuex'
import {isLogin,logout} from "../components/api/getData";

vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    user:{
      test:"lallaa",
      forum_user_id: '',
      forum_user_name: '',
      forum_user_pwd: '',
      forum_user_email:'',
      cookie:'',
      isUserActive:false
    }
  },
  mutations: {
    init: function (state) {
      state.user.forum_user_id = ''
      state.user.forum_user_name = ''
      state.user.forum_user_pwd = ''
      state.user.forum_user_email = ''
    },
    setForum_user_id:function (state,forum_user_id){
      state.user.forum_user_id =forum_user_id
    },
    setForum_user_cookie:function (state,cookie){
      state.user.cookie =cookie
    },
    setForum_user_name:function (state,forum_user_name){
      state.user.forum_user_name =forum_user_name
    },
    setForum_user_pwd:function (state,forum_user_pwd){
      state.user.forum_user_pwd =forum_user_pwd
    },
    setForum_user_email:function (state,forum_user_email){
      state.user.forum_user_email =forum_user_email
    }
  }

})

export default store
