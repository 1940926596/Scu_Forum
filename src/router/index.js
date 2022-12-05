import Vue from 'vue'
import Router from 'vue-router'
import userLogin from "../components/UserLogin/userLogin";
import home from "../components/home";
import userPage from "../components/userPage";
import marginStep from "../components/Margin/marginStep";
import userLogin1 from "../components/UserLogin/userLogin1";
import page from "../components/Pages/page";
import pageOne from "../components/Pages/pageOne";

Vue.use(Router)

export default new Router({
  routes: [
    //login 登录
    //register  注册
    {
      path:'/pageOne',
      component:pageOne
    },
    {
      path: '/',
      component: home
    }, {
      path: '/login',
      component: userLogin
    },
    {
      path: '/userLogin1',
      component: userLogin
    },
    {
      path: '/register',
      component: userLogin1
    },
    {
      path: '/userPage',
      component: userPage
    }, {
      path: '/step',
      component: marginStep
    }, {
      path: '/page/:id',
      name:'page',
      component:page
    }
  ]
})
