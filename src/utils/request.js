import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'
const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  // config 就是发送请求时携带的数据，包成一个对象（猜测）**********
  // 后台会根据此数据的内容进行后续逻辑处理 ************
  function (config) {
    // 在发送请求之前做些什么
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  // response 会拿到后台返回的数据 ************
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    if (response.data.code === 0) {
      // 成功
      return response
    }
    // 处理业务失败，给错误提示，抛出错误
    ElMessage.error(response.data.message || '服务异常')
    return Promise.reject(response.data)
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    // 错误特殊情况 => 401 权限不足 或 token过期 => 拦截到登录
    if (error.response?.status === 401) {
      router.push('/login')
    }
    // 错误的默认情况 => 只要给提示
    ElMessage.error(error.response.data.message || '服务异常')
    return Promise.reject(error)
  }
)

export default instance
export { baseURL }
