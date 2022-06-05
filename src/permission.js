import router from '@/router';
import {
    getToken
} from '@/utils/cookie_controler';
import userRequest from '@/api/userRequest';
//权限校验的流程 ***
router.beforeEach(async (to, from, next) => {
    console.log(to);
    if (to.meta.permission) { //true   拦截
        console.log(2222)
        try {
            let token = getToken();
            if (token) {
                let p = await userRequest.checkToken(token);
                console.log(p);
                if (p.data.flag) {
                    //校验通过
                    next();
                } else {
                    next('/login');
                }
            } else {
                //没有token
                next('/login');
            }
        } catch (e) {
            next('/login');
        }
    } else { 
        console.log(to.meta.permission,from);
        try {
            let token = getToken();
            console.log(token, "000");
            if (token == undefined) { 
                console.log("token不存在，允许下一步");
                next();
            } else { 
                let p = await userRequest.checkToken(token);
                if (p.data.flag) {
                    next();
                } else {
                    next(); //否则继续登录
                }
            }
        } catch (e) {
            console.log("token不存在，为undefined，让用户继续登录");
            next(); //继续登录
        };
    }
});