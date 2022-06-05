<template>


</template>

<script>
import Link from "@/components/Link";
import userRequest from "@/api/userRequest";
import cookie_controler from "@/utils/cookie_controler";
let baseurl = process.env.VUE_APP_BASE_API;
export default {
  data() {
    return {
      fileList: [],
      numberValidateForm: {
          age: ''
        }
    };
  },
  methods: {
    async test(){
      try {
        let inf = await userRequest.test();
        console.log(inf)
      }catch (e) {
        console.log(e)
      }
    },
    async test2(){
      try {
        let inf = await userRequest.test2();
        console.log(inf)
      }catch (e) {
        console.log(e)
      }
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
     // 上传文件函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleAvatarSuccess(file) {
      console.log(file);
    },
  },
  created() {
  }
};
</script>

<style scoped>
.avatar-uploader {
  width: auto;
  height: 110px;
  line-height: 100px;
  padding: 2px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.avatar-uploader .el-upload {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
/* 渲染后的 ul  此处无效*/
/* .avatar-uploader .el-upload .el-upload--picture-card {
  overflow: hidden;
  background-color: green;
  width: 100px !important;
  height: 100px !important;
  line-height: 100px !important;
} */

/* 渲染后的图片 li 此处无效*/
/* .avatar-uploader .el-upload .el-upload--picture-card .el-upload-list__item{
  width: 100px !important;height: 100px !important;
} */

.avatar-uploader-icon {
  font-size: 16px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>