/* 
    用户注册模块
        *   获取得到的数据，记得现在前端那里写好正则，符合了再传入请求中
        *   写Ajax请求地址（就像测试的那样）
        *   查看结果
*/
import request from '@/utils/request';
let baseurl = process.env.VUE_APP_BASE_API;

export default {
    //验证用户名是否存在
    checkname(username) {
        return request.get(baseurl + '/user/checkname', {
            paramse: {
                username
            }
        });
    },

    //注册请求
    regist(username, psw) {
        return request.post(baseurl + '/user/regist', {
            username,
            psw
        });
    },

    //登录请求
    login(username, psw) { //md5密码
        return request.get(baseurl + '/user/login', {
            params: {
                username,
                psw
            }
        });
    },

    //修改用户信息或密码或全改请求 -- 可通过参数判断，控制操控语句 -- 只修改密码，就先检查原密码
    //改密码不等于该用户信息！！两者的重要程度是区分开来的！！！
    editpsw(username, psw, uid) { //md5
        //传入用户名和密码确认，再修改
        // console.log(psw); //有形参没实参就是undefined  声明未赋值，如果是not defined就是未声明
        return request.put(baseurl + '/user/changepsw/' + uid, {
            username,
            psw
        })
    },

    //校验token,get请求
    checkToken(token) {
        return request.get(baseurl + '/user/verify', {
            params:{
                token
            }
        });
    },

    //用户管理的搜索功能
    getUserInfo(pages,pagesize,userInfo) {
        // console.log(pages,pagesize,userInfo)  这里的userInfo是个对象，去后端在看看是字符串还是对象
        return request.get(baseurl + '/user/userInfo',{
            params:{
                pages : pages || 1,
                pagesize : pagesize || 10,
                userInfo //是个对象，装的是搜索内容
            }
        })
    },

    //用户管理的添加用户功能
    // addUser(acount,name,sex,phone,birthday,address){
    //     // console.log(pages,pagesize,userInfo)  这里的userInfo是个对象，去后端在看看是字符串还是对象
    //     // 未被使用的声明过的变量等于undefined
    //     //在这里传过去的参数 ，方式不同书写的格式也有区分
    //     console.log(acount,name,sex,phone,birthday,address)
    //     return request.post(baseurl + '/user/adduser',{
    //             acount,name,sex,phone,birthday,address
    //     })
    // },
    // 上面是传参数的，改成传表单数据的
    addUser(form){
        return request({
            method : 'POST',
            url : baseurl + "user/adduser",
            headers: { "Content-Type" : "multipart/form-data" }, //post请求的不同处！
            data : form
        })
    },

    //用户管理中表格的编辑功能
    // editeUser(uid,acount,name,sex,phone,birthday,address, pic){
    //     return request.put(baseurl + '/user/editeUser',{
    //         uid,acount,name,sex,phone,birthday,address, pic
    //     });
    // },
    editeUser(form){
        return request({
            method : 'put',
            url : baseurl + "/user/editeUser",
            headers: { "Content-Type" : "multipart/form-data" },
            data : form
        })
    },

    //用户管理中表格的删除功能 的  上传头像功能
    addHeadPhoto(form){
        return request({          //request.get方式要会，request()自定义方式也要会。
            method : 'post',
            url : baseurl + "/upload/headphoto",
            // headers : {Access-Control-Allow-Origin: *},
            processData: false, //这两个是百度后说upload跟multer这一块需要特殊设置的，未清楚用意
            contentType: false,
            data : form //这个就是创建的formdata对象。
        })
    },

    //用户管理中表格的删除功能
    deleteUser(uid){
        // console.log(uid); //7
        return request.delete(baseurl + `user/deleteuser/${uid}`);
    },

    //搜索uid信息
    selectUID(uid){
        return request.get(baseurl + `/user/serchuser/${uid}`);
    },

    //请求设置session接口
    test() {
        return request(
            {
                method: 'POST',
                url: baseurl + "/user/test",
                // data: obj
            }
        );
    },

    //请求检查session接口
    test2() {
        return request(
            {
                method: 'POST',
                url: baseurl + "/user/test2",
                // data: obj
            }
        );
    }
};