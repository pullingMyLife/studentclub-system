<template>
  <div class="header">
    <!-- 左侧图片 -->
    <a href="###">
      <!-- <img src="../../../../public/favicon.png" alt=""> -->
      <img class="logo" src="@/assets/favicon.png" alt=""/>
      <span class="titel">findwo后台管理系统</span>
    </a>
    <span class="tips"
    >欢迎回来[<i style="font-style:normal;color:red">超级管理员 {{
        username
      }}</i>]，您上次登录的时间为：{{ logtime }}</span
    >
    <!-- 下拉菜单 -->
    <div class="btn_down">
      <el-dropdown
          trigger="click"
          dropdown_inf="bottom-start"
          placement="bottom"
          @command="handleCommand"
      >
        <span class="el-dropdown-link"> 设置<i class=""></i> </span>
        <el-dropdown-menu class="dropdown_inf" slot="dropdown">
          <el-dropdown-item command="edit"
          >修改密码
          </el-dropdown-item
          >
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 对话框el-dialog  el-form el-form-item el-input-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="550px">
      <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
      >
        <el-form-item
            label="旧密码"
            :label-width="formLabelWidth"
            prop="oldpsw"
        >
          <el-input
              v-model="ruleForm.oldpsw"
              autocomplete="off"
              placeholder="“请输入旧密码”"
              style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item
            label="新密码"
            :label-width="formLabelWidth"
            prop="newpsw"
        >
          <el-input
              v-model="ruleForm.newpsw"
              autocomplete="off"
              placeholder="“请输入新密码”"
              style="width: 300px"
              type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
            label="确认新密码"
            :label-width="formLabelWidth"
            prop="checkpsw"
        >
          <el-input
              v-model="ruleForm.checkpsw"
              autocomplete="off"
              placeholder="请再次输入新密码"
              style="width: 300px"
              type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editpsw()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapState,mapActions,mapMutations} from 'vuex';
import {getUser, logOut, getLoginTime} from "@/utils/cookie_controler";
import userRequest from "@/api/userRequest";
import {getStorage} from '@/utils/session_controler';

export default {
  data() {
    var validatePsw = (rule, value, callback) => {
      let psw = this.$md5(this.ruleForm.oldpsw);
      let {username,uid} = this.$store.state.user.userInfo;
      console.log('检查站好和uid：',username, uid);
      console.log('检查站好和token：',this.$store.state.user.token);
      console.log('检查站好和loginTime：',this.$store.state.user.logtime);
      let msg = this.$store.dispatch('user_$Login',{username,psw}); // return了一个请求结果出来，看看能不能用
      console.log(msg,'return a inf now')
    };
    var validateCheck = (rule, value, callback) => {
      //value：表单的密码
      let newpsw = this.ruleForm.newpsw;
      // let checkpsw = this.ruleForm.checkpsw;
      if (newpsw === value) {
        // console.log('yes');
        callback();
      } else {
        callback(new Error("两次输入的密码不匹配"));
      }
    };

    return {
      username:null,
      logtime: getLoginTime(),
      dialogFormVisible: false, //对话框显影控制
      ruleForm: {
        oldpsw: "",
        newpsw: "",
        checkpsw: "",
        delivery: false,
      },
      formLabelWidth: "150px", //对话框面板宽度
      rules: {
        oldpsw: [
          {required: true, message: "旧密码不能为空", trigger: "blur"},
          // { min: 8, max: 13, message: "长度在 8 到 13 个字符", trigger: "blur" },
          {validator: validatePsw, trigger: "blur"},
        ],
        newpsw: [
          {required: true, message: "新密码不能为空", trigger: "blur"},
          {
            min: 8,
            max: 13,
            message: "长度在 8 到 13 个字符",
            trigger: "blur",
          },
        ],
        checkpsw: [
          {required: true, message: "新密码不能为空", trigger: "blur"},
          {
            min: 8,
            max: 13,
            message: "长度在 8 到 13 个字符",
            trigger: "blur",
          },
          {validator: validateCheck, trigger: "blur"},
        ],
      },
    };
  },

  components: {},

  methods: {
    //重置内容和正则的方法
    resInput() {
      this.formInline.user = this.formInline.sex = "";
      // this.onSubmit();
    },

    //获取cookie的user信息
    getUserInf() {
      let ucookie = getUser();
      // console.log(ucookie);
    },

    //退出的功能流程
    logoutFUN() {
      //调用删除cookie信息的方法
      logOut();
      //删除后返回到登录页
      this.$router.push("/login");
      this.$message({
        message: "退出成功",
        type: "success",
        duration: 800,
      });
    },

    //退出功能
    handleCommand(command) {
      //参数就是你写的item属性
      // this.$message(command); //反馈
      // console.log(command);
      if (command == "edit") {
        //修改密码
        alert("修改成功后将会退出登录。");
        this.dialogFormVisible = true; //对话框显影控制
      } else if (command == "logout") {
        this.logoutFUN();
      }
    },

    //dialog的确定功能
    editpsw() {
      this.$refs.ruleForm.validate(async (res) => {
        console.log(res, 111);
        try {
          if (res) {
            let psw = this.$md5(this.ruleForm.checkpsw);
            console.log(psw, 222);
            let inf = await userRequest.editpsw(
                this.data.username,
                psw,
                this.data.uid
            );
            console.log(inf, 555);
            //放回成功结果
            if (inf.data.flag) {
              alert(inf.data.message);
              this.logoutFUN();
            }
          }
        } catch (e) {
          this.$message({
            message: e,
            type: "warring",
            duration: 0,
          });
        }
      });
    },
  },
  computed : {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  //   ...mapState("user",{
  //  userInfo: state => state.userInfo
  // }),
  },
  mounted() {
    let {name,uid,logintime} = getStorage({ name: 'user' });
    this.username = name;
    this.logtime = logintime;
  },
  created() {
    let userInf = getUser(); //
    // console.log(userInf); //{"username":"1234","uid":124}
    this.data = JSON.parse(userInf);
  },
};
</script>

<style scoped>
.el-dialog .el-form .el-form-item .el-input {
  width: 250px !important;
}

.header {
  box-sizing: border-box;
  background-color: rgb(36, 36, 36);
  /* width: 100%; */
  height: 60px;
  text-align: left;
  line-height: 60px;
  padding-left: 20px;
  padding-right: 50px;
}

.tips {
  color: rgb(199, 199, 199);
  font-size: 16px;
  position: relative;
  right: -48%;
}

.titel {
  color: #fff;
}

.logo {
  width: 30px;
  height: 30px;
  margin-top: 15px;
  float: left;
  margin-right: 10px;
  /* background-image: url('../../assets/favicon.ico'); */
}

.btn_down {
  float: right;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.dropdown_inf {
  box-sizing: border-box;
  padding: 5px;
}
</style>
