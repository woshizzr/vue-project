import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/less/index.less"
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//注册@element-plus/icons-vue图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import '@/api/mock.js'
import api from './api/api'
import { useAllDataStore } from './stores'
 //getRoutes获得所有路由记录的完整列表。
 //这个方法判断要跳转的路由是否存在
 function isRoute(to){
    return router.getRoutes().filter(item=>item.path===to.path).length>0
 }
 
 router.beforeEach((to, from) => {
      //如果要跳转的不是login,且token不存在(可以通过不存在token判断出用户未登录)
     if(to.path !== '/login'&&!store.state.token){
         //跳转到login
         console.log('//跳转到login')
         return { name: 'login' }
     }
     //如果路由记录不存在
     if(!isRoute(to)){
         //跳转到404界面
         console.log('    //跳转到404界面')

         return {name: "404"}
     }
 })
const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$api = api
app.use(ElementPlus)
app.use(pinia)
//这个动态路由的方法必须要在use(pinia)之后使用，因为这样才可以获取到pinia对象
//必须在use(router)之前使用，因为如果是刷新，useuse(router)后执行完会直接跳转路由，所以需要在他之前执行动态路由方法
const store = useAllDataStore()
store.addMenu(router, "refresh")
app.use(router).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

