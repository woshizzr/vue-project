import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs"
import { createRouter, createWebHashHistory } from "vue-router"
const routes = [
    {
        path: '/',
        name: "main",
        component: () => import("@/views/Main.vue"),
        redirect: '/home',
        children: [
            // {
            //     path: 'home',
            //     name: 'home',
            //     component: () => import('@/views/Home.vue')
            // },
            // {
            //     path: 'user',
            //     name: 'user',
            //     component: () => import('@/views/User.vue')
            // },
            // //下面三个是新添加的路由 登陆xiaoxiao没有mall但是还会匹配上 这时候就需要动态路由
            // {
            //     path: 'mall',
            //     name: 'mall',
            //     component: () => import('@/views/Mall.vue')
            // },
            // {
            //     path: 'page1',
            //     name: 'page1',
            //     component: () => import('@/views/Page1.vue')
            // },
            // {
            //     path: 'page2',
            //     name: 'page2',
            //     component: () => import('@/views/Page2.vue')
            // },

        ]
    },
    //注意这个是一级路由，不是放到之前的children中
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    //也是一级路由
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router