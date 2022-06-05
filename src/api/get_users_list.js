import request from '@/utils/request';

// export default{
// getJson(){
// return 
let baseurl = process.env.VUE_APP_BASE_API;
export default {
    getUsersList() {
        request.get(baseurl + "/dashboard/test_api/api/userListSQL.php",{
        }).then(res => {
            console.log(res.data);
        })
    }
}