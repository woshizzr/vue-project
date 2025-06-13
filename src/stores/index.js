import { defineStore } from "pinia";
import { ref, watch } from "vue";

function initState() {
    return {
        isCollapse: false,
        //tags固定有一个home标签
        tags: [
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
        menuList: [],
        token: "",
        routeList: []

    }
}
export const useAllDataStore = defineStore('allData', () => {

    const state = ref(initState())
    watch(state, (newObj) => {
        if (!newObj.token) return
        localStorage.setItem('store', JSON.stringify(newObj))
    }, { deep: true })
    function selectMenu(val) {
        if (val.name === 'home') {
            state.value.currentMenu = null

        } else {
            state.value.currentMenu = val
            let index = state.value.tags.findIndex(item => item.name === val.name)
            index === -1 ? state.value.tags.push(val) : ''
        }
    }
    function updateTags(tag) {
        //找到要删除的tab索引，使用splice方法删除
        let index = state.value.tags.findIndex(item => item.name === tag.name)
        state.value.tags.splice(index, 1)
    }
    function updateMenuList(val) {
        state.value.menuList = val
    }
    //需要传递router对象进来
    function addMenu(router, type) {
        if (type === 'refresh') {
            if (JSON.parse(localStorage.getItem('store'))) {
                state.value = JSON.parse(localStorage.getItem('store'))
                state.value.routeList = []
            } else {
                return
            }
        }

        const menu = state.value.menuList
        //这里**代表0或多个文件夹，*代表文件。就是把views下的文件全部导入
        const module = import.meta.glob('../views/**/*.vue')
        //这个是菜单格式化后的路由数组
        const routeArr = []
        //格式化菜单路由
        menu.forEach(item => {
            //如果菜单有children
            if (item.children) {
                //把children遍历格式化
                item.children.forEach(val => {
                    let url = `../views/${val.url}.vue`
                    //这里通过url取出对应的组件
                    val.component = module[url]
                })
                //需要注意的是我们只需要为item.children中的菜单添加路由，所以我们把它解构出来
                routeArr.push(...item.children)
            } else {
                let url = `../views/${item.url}.vue`
                item.component = module[url]
                routeArr.push(item)
            }
        })
        state.value.routeList = []

        let routers = router.getRoutes()
        routers.forEach(item => {
            if (item.name === 'main' || item.name === 'login' || item.name == '404') {
                return
            } else {
                router.removeRoute(item.name)
            }
        })
        //遍历routeArr
        routeArr.forEach(item => {
            //addRoute方法会返回一个函数，执行这个函数会把这个路由删除
            //这里我们把每一次router.addRoute添加路由的返回值收集起来，放到state中的routeList
            //addRoute第一个参数要添加子路由的路由name，第二个是一个路由记录
            state.value.routeList.push(router.addRoute("main", item))
        })

    }
    function clearn() {
        //把保存的删除路由方法都执行一遍
        state.value.routeList.forEach(item => {
            if (item) item()
        })
        //重置state的数据
        state.value = initState()
        //删除本地缓存，因为这个clearn方法是用户退出执行的
        localStorage.removeItem('store')


    }

    return { state, selectMenu, updateTags, updateMenuList, addMenu, clearn }
})

