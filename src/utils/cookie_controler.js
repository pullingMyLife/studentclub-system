//本次的tokenkey 和 userkey的字段
let tokenkey = 'bigsun-mms-token';
let userkey = 'bigsun-user';
let timekey =  'bigsun-login-time';

function setCookie(key, value,iDay){
    var now = new Date();
    if(iDay){
        now.setDate(now.getDate() + iDay); //iDay 5 天后失效， -1立即失效
        document.cookie = key + '=' + value + ';expires=' + now + ';path=/'; 
    }else{
        document.cookie = key + '=' + value + ';path=/'; 
    }
};



//获取cookie
function getCookie(key){
    var str = document.cookie; //name=zhenhai; psw=12345
    var arr = str.split("; ");
    for(var ele of arr){
        var arr2 = ele.split('='); //[name,zhenhai]
        if(key == arr2[0]){
            // console.log(arr2[1]);
            return arr2[1];
        }
    }
};


//删除cookie
function removeCookie(key) {
    setCookie(key,'',-1); //把cookie的有效期设置为过去，即失效
};

//设置token的cookie
export function setToken(val,days){ 
    setCookie(tokenkey,val,days);
};

//设置user信息的cookie
export function setUser(val,days) {
    //val : 设置的内容 ，days：天数
    // console.log(userkey,999);
    setCookie(userkey,val,days);    
}

//设置登录时间的cookie setLoginTime
export function setLoginTime(val,days){
    setCookie(timekey,val,days)
}

//获取
export function getToken() {
    return getCookie(tokenkey);
}
export function getUser() {
    return getCookie(userkey);
}
export function getLoginTime() {
    return getCookie(timekey);
}

// 删除 -- 退出账号的时候全部都要删除
export function logOut() {
    removeCookie(tokenkey);
    removeCookie(userkey);
}
