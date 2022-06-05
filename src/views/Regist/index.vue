<template>
  <div id="login_box">
    <div class="inf_box">
       <h2>大时代会员管理系统-注册</h2>
          <el-form :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="right"
        label-width="90px"
        class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passwd">
            <el-input v-model="ruleForm.passwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
          </el-form-item>
        </el-form>
        <p @click="resetForm">已有账号？点击跳转到登录页</p>
    </div>

  </div>
</template>

<script>
import userRequest from '@/api/userRequest';  
// import { response } from 'express';
  export default {
    data() {
      return {
        ruleForm: {
          inf : null,
          name: '',
          passwd: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
          ],
          passwd: [
            { required: true, message: '轻输入密码', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        let psw = this.$md5(this.ruleForm.passwd); //md5单向加密密码

        this.$refs[formName].validate(async  valid => {
          try{
            if (valid) {
            //发送axios
              this.inf = await userRequest.regist(this.ruleForm.name,psw);
              console.log(this.inf);
              // alert(this.inf.data.message);
              this.$message({
                message: "注册成功，正在为您跳转到登录页",
                type: "success",
              });
              this.$router.push({
                path: "/login",
                query : {name : this.ruleForm.name}
              })
            } else {
              this.$message({
                message: "注册失败",
                type: "warning",
              });
              return false;
            }
          }catch(e){
            this.$message({
                message: "服务器错误，请稍后再试",
                type: "warning",
              });
            console.log(e);
          }
        });
      },
      resetForm() {
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
p{
  font-size: 8px;
  text-align: right;
  color: rgb(150, 146, 146);
  cursor: pointer;
}
#login_box {
  padding-top: 200px;
  box-sizing: border-box;
  /* width: 100vh; */
  height: 100vh;
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
}
</style>