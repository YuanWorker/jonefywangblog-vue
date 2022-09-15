import axios from 'axios'
import ElementUI from "element-ui";
import router from './router'
import store from './store'

axios.defaults.baseURL = "http://localhost:8081"

//前置拦截
axios.interceptors.request.use(config => {
    return config
})

axios.interceptors.response.use(response => {
    let res = response.data;

    if (res.code === 200){
        return response
    } else {
        ElementUI.Message.error("密码输入错误，请重试", { duration : 3 * 1000})
        return Promise.reject( response.data.msg )
    }
  },
    error => {
        console.log(error)
        if (error.response.data){
            error.message = error.response.data.msg
        }

        if (error === 401){
            store.commit("REMOVE_INFO")
            router.push("/login")
        }

        ElementUI.Message.error(error.message, { duration : 3 * 1000})
        return Promise.reject(error)
    }
)
