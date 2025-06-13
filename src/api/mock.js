import Mock from 'mockjs'
import homeApi from './mockData/home'
import userApi from './mockData/user'

// 拦截路径 方法 制造假数据
import permissionApi from './mockData/permission.js'

Mock.mock(/permission\/getMenu/, "post", permissionApi.getMenu)
Mock.mock('/api\/home\/getTableData', 'get', homeApi.getTableData)
Mock.mock('/home\/getChartData/', "get", homeApi.getChartData)

Mock.mock(/user\/getUserData/, "get", userApi.getUserList)
Mock.mock(/user\/deleteUser/, "get", userApi.deleteUser)
Mock.mock(/user\/addUser/, "post", userApi.createUser)
Mock.mock(/user\/editUser/, "post", userApi.updateUser)


