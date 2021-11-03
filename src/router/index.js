import Vue from 'vue'
import VueRouter from 'vue-router'

//导入组件
import Content from '../components/Content'
import Main from '../components/Main'
import Edit from '../components/Edit'
import Statistics from '../components/Statistics'


import Editor from '../components/Editor/Editor'
import Confirm from '../components/Editor/Confirm'
//安装路由
Vue.use(VueRouter);

//配置导出路由

export default new VueRouter({
  routes:[
  {
    //路由路径
    path:'/content',
    name:'content',
    //跳转组件
    component:Content
  },
  {
    path:'/main',
    name:'main',
    component:Main
  },
  {
    path:'/edit',
    name:'edit',
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
  },
    component:Edit,//嵌套路由
    children:[
      {path:'/editor/editor',component:Editor},
      {path:'/editor/confirm',component:Confirm}
    ]
  },
  {
    path:'/statistics',
    name:'statistics',
    component:Statistics
  },
]
});
