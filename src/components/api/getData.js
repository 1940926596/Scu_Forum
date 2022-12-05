import axios from "axios";

import store from "../../store/index"


/**
 * 登陆
 */

export const isLogin = () => {
  console.log(777777)
  return new Promise((resolve, reject)=>{
    axios.get("http://43.143.211.83:8080/getUserCookie").then((response) => {
      console.log(response.data)
      store.commit('setForum_user_cookie',response.data)
      console.log(store.state.user.cookie)
      if (response.data !== "no cookie") {
        store.state.user.forum_user_email=store.state.user.cookie
        store.state.user.isUserActive=true
        axios.get("http://43.143.211.83:8080/forum_oneUser_email_list?forum_user_email=" + store.state.user.forum_user_email).then((response) =>{
          store.state.user.forum_user_id=response.data[0].forum_id
          store.state.user.forum_user_pwd=response.data[0].forum_pwd
          store.state.user.forum_user_name=response.data[0].forum_name
          resolve('success')
        })
      }
      else{
        store.state.user.isUserActive=false
        store.state.user.forum_user_email=''
        resolve('err')
      }
    }).catch((err)=>{
      console.log(err)
      //阻塞
      reject('err')
    })
  })
  console.log(99999)
}

export const logout = () => axios.get("http://43.143.211.83:8080/forum_logout")

export const login = (forum_email, forum_pwd) => axios.get("http://43.143.211.83:8080/forum_login?forum_email=" + forum_email + "&forum_pwd=" + forum_pwd)

export const test=()=>(console.log("hello"))

export const fun=function(){

}
