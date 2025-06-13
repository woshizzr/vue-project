<template>
    <div>mall</div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import * as echarts from "echarts";
// import axios from 'axios'
const { proxy } = getCurrentInstance()
const getImageUrl = (user) => {
    return new URL(`../assets/images/${user}.png`, import.meta.url).href
}
//这个tableData是假数据，等会我们使用axios请求mock数据
const tableData = ref([])
const countData = ref([])
const chartData = ref([])

//observer 接收观察器实例对象
const observer = ref(null)

//这个是折线图和柱状图 两个图表共用的公共配置
const xOptions = reactive({
    // 图例文字颜色
    textStyle: {
        color: "#333",
    },
    legend: {},
    grid: {
        left: "20%",
    },
    // 提示框
    tooltip: {
        trigger: "axis",
    },
    xAxis: {
        type: "category", // 类目轴
        data: [],
        axisLine: {
            lineStyle: {
                color: "#17b3a3",
            },
        },
        axisLabel: {
            interval: 0,
            color: "#333",
        },
    },
    yAxis: [
        {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#17b3a3",
                },
            },
        },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
})

const pieOptions = reactive({
    tooltip: {
        trigger: "item",
    },
    legend: {},
    color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
    ],
    series: []
})


// axios(
//     {
//         url: '/api/home/getTableData',
//         method: 'get'
//     }
// ).then(res => {
//     if (res.data.code === 200) {
//         console.log('res---', res)
//         tableData.value = res.data.data.tableData
//     }
// })
const getCountData = async () => {
    const data = await proxy.$api.getCountData()
    console.log('countData----', data)

    countData.value = data
}
const getTableData = async () => {
    const data = await proxy.$api.getTableData()
    console.log('tableData----', data)
    tableData.value = data
}
const getChartData = async () => {
    const { orderData, userData, videoData } = await proxy.$api.getChartData()
    console.log('chartData----', orderData, userData, videoData)
    //对第一个图表的xAxis和series赋值
    xOptions.xAxis.data = orderData.date
    xOptions.series = Object.keys(orderData.data[0]).map(val => {
        return {
            name: val,
            data: orderData.data.map(item => item[val]),
            type: 'line'
        }
    })
    const oneEchart = echarts.init(proxy.$refs['echart'])
    oneEchart.setOption(xOptions)

    // 第二个表格进行渲染
    // xOptions.xAxis.data = userData.map(item => item.data)
    xOptions.xAxis.data = userData.map((item) => item.date)

    xOptions.series = [
        {
            name: '新增用户',
            data: userData.map(item => item.new),
            type: 'bar'
        },
        {
            name: '活跃用户',
            data: userData.map(item => item.active),
            type: 'bar'
        }
    ]
    const twoEchart = echarts.init(proxy.$refs['userEcharts'])
    twoEchart.setOption(xOptions)


    // 饼状图
    pieOptions.series = [
        {
            data: videoData,
            type: 'pie'
        }
    ]
    const threeEcharts = echarts.init(proxy.$refs['videoEcharts'])
    threeEcharts.setOption(pieOptions)

    // 监听页面的变化
    observer.value = new ResizeObserver((en) => {
        oneEchart.resize()
        twoEchart.resize()
        threeEcharts.resize()
    })

    if (proxy.$refs["echart"]) {
        //则调用监视器的observe方法，监视这个容器的大小
        observer.value.observe(proxy.$refs["echart"]);
    } if (proxy.$refs["userEcharts"]) {
        //则调用监视器的observe方法，监视这个容器的大小
        observer.value.observe(proxy.$refs["userEcharts"]);
    } if (proxy.$refs["videoEcharts"]) {
        //则调用监视器的observe方法，监视这个容器的大小
        observer.value.observe(proxy.$refs["videoEcharts"]);
    }
}
onMounted(() => {
    getTableData()
    getCountData()
    getChartData()

})


const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})


</script>

<style lang="less" scoped>
.home {
    height: 100%;
    overflow: hidden;

    .user {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;

        img {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 40px;

        }

        .user-info {
            p {
                line-height: 40px;
            }

            .user-info-p {
                color: #999;
            }

            .user-info-admin {
                font-size: 35px
            }
        }
    }

    .login-info {
        p {
            line-height: 30px;
            font-size: 14px;
            color: #999;

            span {
                color: #666;
                margin-left: 60px;
            }
        }
    }

    .user-table {
        margin-top: 20px;
    }

    .num {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .el-card {
            width: 32%;
            margin-bottom: 20px;
        }

        .icons {
            width: 80px;
            height: 80px;
            font-size: 30px;
            text-align: center;
            line-height: 80px;
            color: #fff;
        }

        .detail {
            margin-left: 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .num {
                font-size: 30px;
                margin-bottom: 10px
            }

            .txt {
                font-size: 15px;
                text-align: center;
                color: #999;
            }
        }
    }

    .graph {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .el-card {
            width: 48%;
            height: 220px;
        }
    }
}
</style>