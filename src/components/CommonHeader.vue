<template>
    <div class="header">
        <div class="l-content">
            <el-button size="small" @click="handleCollapse">
                <component class="icons" is="menu"></component>
            </el-button>
            <el-breadcrumb separator="/" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <!-- if判断一定要加-->
                <el-breadcrumb-item v-if="current" :to="current.path">{{
                    current.label
                }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img :src="getImageUrl('user')" class="user">
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>个人中心</el-dropdown-item>
                        <el-dropdown-item @click="handleLoginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAllDataStore } from '../stores'
import { useRouter } from 'vue-router'
const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href
}

const store = useAllDataStore()
const router = useRouter()
const handleCollapse = () => {
    store.state.isCollapse = !store.state.isCollapse
}
const handleLoginOut = () => {
    //执行重置方法
    store.clearn()

    router.push("/login")
}
const current = computed(() => store.state.currentMenu)
</script>

<style lang="less" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #333;
}

.icons {
    width: 20px;
    height: 20px;

}

.l-content {
    display: flex;
    align-items: center;

    .el-button {
        margin-right: 20px;
    }
}

.r-content {
    .user {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
}

:deep(.bread span) {
    color: #fff !important;
    cursor: pointer !important;
}
</style>