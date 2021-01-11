import axios from 'axios'

//这个request是一个Promise
export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // instance.interceptors.request.use(config => {
  //   return config
  // },err => {
  //   console.log(err);
  // }
  // )
  return instance(config)

}


