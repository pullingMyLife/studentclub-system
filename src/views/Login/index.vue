<template>
  <div id="login_box">
    <div class="bgImg"></div>
    <div class="inf_box">
      <h2>大时代会员管理系统</h2>
      <el-form
          :model="ruleForm"
          :rules="rules"
          label-position="right"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="passwd">
          <el-input v-model="ruleForm.passwd" type="password"></el-input>
        </el-form-item>
        <el-form-item class="log_btn">
          <el-checkbox
              class="keep"
              v-model="ruleForm.checked"
              @click.native="keep($event)"
          >7天免登录
          </el-checkbox
          >
          <el-button type="primary" @click="submitForm('ruleForm')"
          >立即登录
          </el-button
          >
          <el-button @click="resetForm('ruleForm')">点我切换到注册页</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import userRequest from "@/api/userRequest";
import {setToken, setUser, setLoginTime} from "@/utils/cookie_controler";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        passwd: "",
        checked: false,
      },
      rules: {
        name: [
          {required: true, message: "账号不能为空", trigger: "blur"},
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        passwd: [
          {required: true, message: "密码不能为空", trigger: "blur"},
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
      // this.$refs[formName].validate( (valid) => {
        console.log(valid);
        if (valid) {
          try {
            //条件符合正则，加密密码
            console.log('kaishidenglu')
            let psw = this.$md5(this.ruleForm.passwd);
            let name = this.ruleForm.name;
            let msg = await this.$store.dispatch('user_$Login',{name,psw});
            console.log('一调用登录方法',msg);
            console.log(this.$store.state.user.userInfo,this.$store.state.user.token);
            this.$router.push("/home");
          } catch (e) {
            console.log(e);
            return false;
          }
        }
      });
    },
    resetForm(formName) {
      this.$router.push("regist");
    },

    //
    keep(ev) {
      if (ev.target.tagName == "INPUT") return;
      if (!this.ruleForm.checked) {
        this.$message({
          message: "请不要在公共场合使用此功能",
          type: "warning",
        });
      }
    },
  },
  created() {
    if (this.$route.query.name) {
      this.ruleForm.name = this.$route.query.name;
    }
  },
};
</script>
<style>
h2 {
  margin-bottom: 20px;
}

#login_box {
  padding-top: 200px;
  box-sizing: border-box;
  /* width: 100vh; */
  height: 100vh;
}

#login_box .bgImg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -200;
  background-size: cover;
  background-color: #6d8de6;
}

#login_box .inf_box {
  padding: 20px;
  margin: 0 auto;
  width: 350px;
  height: auto;
  /* position:absolute ; */
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.12);
}

#login_box .inf_box .demo-ruleForm .keep {
  margin: 0;
  padding: 0;
  width: 100%;
  text-align: left;
  float: left;
}
</style>
