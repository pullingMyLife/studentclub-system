import {
    setToken,
    setUser,
    setLoginTime,
    logOut
} from '@/utils/cookie_controler';
import userRequest from "@/api/userRequest";
import {
    setStorage,
    clearStorage
} from '@/utils/session_controler';
// getToken getLoginTime  getUser
export default {
    state: {
        userInfo: {
            uid: null,
            username: null
        },
        token: null,
        logtime: null,
    },
    getters: {},
    mutations: {
        sUserInfo(state, payload) { 
            setUser(payload)
            state.userInfo = JSON.parse(payload);
        },
        sLoginTime(state, payload) {
            setLoginTime(payload);
            state.logtime = payload;
        },
        sTk(state, payload) {
            setToken(payload);
            state.token = payload;
        },
        sLogOut(state) {
            state.userInfo.uid = state.userInfo.username = null;
            state.logtime = null;
            state.token = null;
        }
    },
    actions: {
        
        async user_$Login({
            commit
        }, payload) {
            try {
                let {
                    name,
                    psw
                } = payload;
                let inf = await userRequest.login(name, psw);
                if (inf.data.flag) {
                    let userInfo = {
                        name: 'user',
                        content: {
                            //保存到usercookie的内容
                            name: inf.data.username,
                            uid: inf.data.uid,
                            logintime: inf.data.times
                        }

                    };
                    commit('sTk', inf.data.token);
                    setStorage(userInfo);

                }
                return inf;
            } catch (e) {
                console.log("this is a error with the server !!", e);
            }
        }
    },
}