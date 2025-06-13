<template>
    <el-aside :width="width">
        <h3>管理系统</h3>
        <el-menu :collapse-transition="false" :collapse="isCollapse" :default-active="activeMenu">
            <el-menu-item index="2" v-for="item in noChildren" :index="item.path" :key="item.path"
                @click="handleMenu(item)">
                <component class="icons" :is="item.icon"></component>
                <span>{{ item.label }}</span>
            </el-menu-item>
            <el-sub-menu index="1" v-for="item in hasChildren" :index="item.path" :key="item.path">
                <template #title>
                    <component class="icons" :is="item.icon"></component>
                    <span>{{ item.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(subItem, subIndex) in item.children" :index="subItem.path"
                        @click="handleMenu(subItem)" :key="subItem.path">
                        <component class="icons" :is="subItem.icon"></component>
                        <span>{{ subItem.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>

            </el-sub-menu>
        </el-menu>

    </el-aside>
</template>

<script setup>
import { it } from 'element-plus/es/locales.mjs'
import { ref, computed } from 'vue'
import { useAllDataStore } from '../stores'
import { useRoute, useRouter } from 'vue-router'

// const list = ref([
//     {
//         path: '/home',
//         name: 'home',
//         label: '首页',
//         icon: 'house',
//         url: 'Home'
//     },
//     {
//         path: '/mall',
//         name: 'mall',
//         label: '商品管理',
//         icon: 'video-play',
//         url: 'Mall'
//     },
//     {
//         path: '/user',
//         name: 'user',
//         label: '用户管理',
//         icon: 'user',
//         url: 'User'
//     },
//     {
//         path: 'other',
//         label: '其他',
//         icon: 'location',
//         children: [
//             {
//                 path: '/page1',
//                 name: 'page1',
//                 label: '页面1',
//                 icon: 'setting',
//                 url: 'Page1'
//             },
//             {
//                 path: '/page2',
//                 name: 'page2',
//                 label: '页面2',
//                 icon: 'setting',
//                 url: 'Page2'
//             }
//         ]
//     }
// ])
const list = computed(() => store.state.menuList)

const hasChildren = computed(() => list.value.filter(item => item.children))
const noChildren = computed(() => list.value.filter(item => !item.children))
const store = useAllDataStore()
const isCollapse = computed(() => store.state.isCollapse)
const width = computed(() => isCollapse.value ? '64px' : '180px')
// const width=computed(()=>store.state.isCollapse?'64px':'180px')
const router = useRouter()
const route = useRoute()
const activeMenu = computed(() => route.path)
console.log('routeeeeee----', route.path, 'activeMenu', activeMenu.value)

console.log('router---', router)
const handleMenu = (item) => {
    router.push(item.path)
    store.selectMenu(item)
}
</script>

<style lang="less" scoped>
.icons {
    width: 18px;
    height: 18px;
    margin-right: 5px;
}

.el-menu {
    border-right: none;

    h3 {
        line-height: 48px;
        text-align: center;
        color: #04006e;
    }
}

.el-aside {
    background-color: #c1bffc;
    height: 100%;
}
</style>