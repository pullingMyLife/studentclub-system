//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
//第三方库需要use一下才能用
Vue.use(VueRouter)
//引用login页面
// import Login from '@/view/login.vue'; //这个名字如果不是index就需要写完整
import Login from '@/views/Login';
import Regist from '@/views/Regist';
import Home from '@/views/Home';
import Users from '@/views/Users';
import Goods from '@/views/Goods';
import Good_Lists from '@/views/Good_Lists';
import Shops from '@/views/Shops';
import NotFound from '@/views/404';
import HPage from '@/views/HPage';
//定义routes路由的集合，数组类型
const routes = [
    //单个路由均为对象类型，path代表的是路径，component代表组件
    {
        path: '/',
        redirect: '/home/users',
        meta:{
            permission : true,
        }
    },
    {
        path: '/login',
        component: Login,
        meta:{
            permission : false,
        }
    },
    {
        path: '/home',
        component: Home,
        meta:{
            permission : true,
        },
        children: [
            {
                path: 'hpage',
                component: HPage,
                meta:{
                    permission : true,
                }
            },
            {
                path: 'users',
                component: Users,
                meta:{
                    permission : true,
                    title : '用户管理'
                }
            },
            {
                path: 'goods',
                component: Goods,
                meta:{
                    permission : true,
                    title : '社团管理'
                }
            },
            {
                path: 'good_lists',
                component: Good_Lists,
                meta:{
                    permission : true,
                    title : '校名单管理'
                }
            },
            // {
            //     path: 'shops',
            //     component: Shops,
            //     meta:{
            //         permission : true,
            //         title : '商铺管理'
            //     }
            // },
        ]
    },
    {
        path: '/regist',
        component: Regist,
        meta:{
            permission : false,
        }
    },
    {
        path: '/404',
        name: '404',
        component: NotFound,
        meta:{
            permission : false,
        }
    },
];

//实例化VueRouter并将routes添加进去
const router = new VueRouter({
    //ES6简写，等于routes：routes
    mode : 'history',
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router;