//二次封装axios
import axios from 'axios';
import {
    Message,
    Loading
} from 'element-ui';

//引入路由设置跳转
import router from '../router/index';

// 加载数据时打开和关闭动效对象
const loading = {
    loadingInstance: null, // Loading实例
    open: function () { // 打开加载
        console.log('加载中', this.loadingInstance)
        if (this.loadingInstance === null) { // 创建单例, 防止切换路由重复加载
            console.log('创建加载实例..')
            this.loadingInstance = Loading.service({
                text: '拼命加载中',
                target: '.main', // 效果显示区域
                background: 'rgba(0, 0, 0, 0.5)' // 加载效果
            })
        }
    },
    close: function () { // 关闭加载
        if (this.loadingInstance !== null) {
            this.loadingInstance.close()
            console.log('结束加载')
        }
        this.loadingInstance = null // 关闭后实例重新赋值null, 下次让它重新创建
    }
}
const request = axios.create({
    baseUrl: '/', //基础路径
    timeout: 3000, //请求超时：如果三秒后没有请求到数据，3s后断开请求
});


// 请求拦截器
request.interceptors.request.use(config => {
    loading.open() // 打开加载效果
    return config
}, error => {
    // 出现异常
    loading.close() // 关闭加载效果
    return Promise.reject(error);
})


request.interceptors.response.use(response => {
    loading.close() // 关闭加载效果
    const resp = response.data
    if (resp.code == 2000) {
        Message({
            message: resp.message,
            type: 'success',
            // duration: 5 * 1000 // 停留时长
            duration: 900
        })
    } else if (resp.code == 3000) {
        Message({
            message: resp.message,
            type: 'warning',
            // duration: 5 * 1000 // 停留时长
            duration: 900
        })
    }
    return response
}, error => {
    loading.close() // 关闭加载效果
    console.log('response error', error.response.status);
    let state = error.response.status;
    if (state == 404) {
        router.push('404');
    } else if (state == 501) {
        router.push('404');
    }
    return Promise.reject(error);
})
export default request;


