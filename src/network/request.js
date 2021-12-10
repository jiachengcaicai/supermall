import axios from 'axios'

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1 请求拦截
  instance.interceptors.request.use(
    config => {
      // console.log(config);
      // 在这可以做一些拦截后做的事
      // 1.比如config中的一些信息不符合服务器的要求，进行装饰
      // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
      // 3.某些网络请求（比如登录（token）），必须携带一些特殊的信息

      // 拦截之后需要返回
      return config
    },
    err => {
      console.log(err);
    }
  )

  // 2.2 响应拦截
  instance.interceptors.response.use(
    res => {
      // console.log(res)
      // 这里可以对返回的结果做一些加工
      // 接口返回的数据对象中，有用的数据在data中
      return res.data
    },
    err => {
      console.log(err);
    }
  )

  // 3.发送真正的网络请求，返回结果是promise
  return instance(config)
}
