<template>
  <div>
    <Link></Link>
    <div class="formBox">
      <!-- ------------------------------------------------------------------------------------ -->
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="text-align: left"
      >
        <el-form-item>
          <el-input
            v-model="formInline.user"
            placeholder="输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formInline.sex" placeholder="性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" icon="el-icon-search"
            >查询</el-button
          >
          <el-button
            type="primary"
            @click="resInput"
            icon="el-icon-refresh-left"
            >重置</el-button
          >
          <el-button
            type="primary"
            @click="addUser"
            icon="el-icon-circle-plus-outline"
            >新增</el-button
          >
          <!-- -------------------------------------------------------------------- -->
          <!-- 公共弹窗 -->
          <el-dialog
            :title="dialogTitle"
            :visible.sync="dialogFormVisible"
            :before-close="handleClose"
            width="550px"
          >
            <el-form
              :inline="true"
              class="demo-form-inline"
              style="text-align: left"
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="150px"
            >
              <el-form-item label="账号" prop="acount">
                <el-input v-model="ruleForm.acount"></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select
                  v-model="ruleForm.sex"
                  placeholder="提交后不可更改！！！"
                  class="test"
                  prop="sex"
                >
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="出生日期" required prop="birthday">
                <el-date-picker
                  type="date"
                  :placeholder="birthdayTXT"
                  format="yyyy年MM月DD日"
                  value-format="yyyy-MM-dd"
                  v-model="ruleForm.birthday"
                  class="test"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="家庭住址" prop="address">
                <el-select
                  v-model="ruleForm.address"
                  placeholder="请选择地址"
                  class="test"
                >
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
              </el-form-item>
              <!--  -->
              <el-form-item :label="headphotoTitle">
                <div
                  class=""
                  style="
                    display: inline-block;
                    width: 211px;
                    overflow: hidden;
                    box-sizing: border-box;
                  "
                >
                  <el-upload
                    class="avatar-uploader"
                    ref="upload"
                    action="/dev-api/upload/headphoto"
                    list-type="picture-card"
                    :auto-upload="true"
                    :show-file-list="true"
                    :limit="2"
                    :on-change="handleChange"
                    :on-success="uploadSuccess"
                    :on-error="uploadError"
                    :before-upload="beforeAvatarUpload"
                    :file-list="fileList"
                    name="avatar"
                  >
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closedailog">取 消</el-button>
              <el-button type="primary" @click="submitForm(dialogTitle)"
                >提 交</el-button
              >
            </div>
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据表格 -->
    <div class="formTableBox">
      <el-table :data="tableData" style="width: 100%" max-height="500">
        <el-table-column fixed type="index" label="序号" width="80">
        </el-table-column>
        <el-table-column prop="acount" label="账号" width="120">
        </el-table-column>
        <el-table-column prop="name" label="真实姓名" width="120">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="120"> </el-table-column>
        <el-table-column prop="phone" label="手机" width="150">
        </el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="150">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="200">
        </el-table-column>
        <el-table-column label="头像" width="100px">
          <template slot-scope="scope">
            <img
              :src="scope.row.pic"
              alt=""
              style="width: 50px; height: 50px"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="editUser(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="delUser(scope.row)"
              >删除</el-button
            >

          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="currentPageBox">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="allNum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
//引入组件
import Link from "@/components/Link";
import userRequest from "@/api/userRequest";
import commont from "@/utils/commont";
export default {
  data() {
    // birthday的自定义校验
    var validatePass = (rule, value, callback) => {
      if (this.birthdayTXT === "请选择您的生日") {
        //打开的是新增页面
        if (value === "") {
          callback(new Error("出生日期不能为空"));
        } else {
          callback(); //通过
        }
      } else {
        if (value === "") {
          callback(new Error("出生日期不能为空"));
        } else {
          callback();
        }
      }
    };
    return {
      // 上传头像的headers
      headers: { "Content-Type": false, processData: false },
      fileList: [],
      // 上传好的图片，把放回信息存在这里控制下面的执行，
      isPicOk: null,
      //dailog里面的提交表单
      dialogTitle: "",
      ruleForm: {
        uid: "",
        acount: "",
        name: "",
        sex: "",
        birthday: "",
        address: "",
        phone: "",
        pic: "", // 头像是在upload组件请求的接口中处理好存入数据库的了，因此这里提交的内容里不用pic
      },
      headphotoTitle: "", //上传图片还是更改头像看入口
      birthdayTXT: "请选择您的生日", //这个是暂存数据库的生日字段的
      //新增表单验证规则
      rules: {
        acount: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        passwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        region: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birthday: [
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        phone: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "手机格式为11个字符", trigger: "blur" },
        ],
        address: [
          { required: true, message: "请选择居住地址", trigger: "blur" },
        ],
      },
      //上传头像upload的数据
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      // 查询表单
      formInline: {
        user: "",
        sex: "",
      },

      // 表格数据
      tableData: [],
      // 分页数据
      pages: 1, //当前页
      allNum: null, //总条数
      pagesize: 10, //每页条数

      //新增数据的表格
      dialogFormVisible: false,
      formLabelWidth: "160px",
    };
  },

  components: {
    Link,
  },

  methods: {
    //新增用户的确定按钮：form表单
    submitForm(title) {
      this.$refs.ruleForm.validate(async (valid) => {
        console.log(this.ruleForm.birthday, typeof this.ruleForm.birthday); //之前那个东西就因为没看到这个直接白写
        if (valid) {
          let inf = null;
          let form = new FormData();
          console.log(form, "检查form数据");
          console.log(
            this.ruleForm.pic,
            "检查form预备存的pic数据，图片手动上传后就执行"
          );
          form.append("uid", this.ruleForm.uid);
          form.append("acount", this.ruleForm.acount);
          form.append("name", this.ruleForm.name);
          form.append("sex", this.ruleForm.sex);
          form.append("phone", this.ruleForm.phone);
          form.append("birthday", this.ruleForm.birthday);
          form.append("address", this.ruleForm.address);
          form.append("pic", this.ruleForm.pic); //这里存的已经是数据库的绝对路径了

          if (title == "添加用户") {
            console.log(title);
            this.headphotoTitle = "上传头像";
            inf = await userRequest.addUser(form);
            console.log(inf);
          } else {
            //修改页面
            this.headphotoTitle = "修改头像";
            inf = await userRequest.editeUser(form);
            console.log(inf);
          }
          console.log(inf, "检查inf");
          this.onSubmit();
          this.closedailog();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    closedailog() {
      this.dialogFormVisible = false;
      this.resetForm();
    },

    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.birthdayTXT = "请选择您的生日";
    },
    handleChange(file, fileList) {
      if (fileList.length == 2) {
        fileList.splice(0, 1);
      }
    },
    //上传成功
    uploadSuccess(response, file, fileList) {
      console.log(response, "上传结果");
      if (response.flag) {
        this.ruleForm.pic = response.url;
        console.log(this.ruleForm.pic, "上传成功执行");
      }
    },
    // 上传失败
    uploadError(error, file, fileList) {
      console.log(error, "上传失败");
    },
    // 头像的上传函数
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'; 
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if ( !isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG / PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG || isPNG && isLt2M; 
    },

    //对话框的靠×按钮
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
      this.resetForm();
    },
    // 查询表单方法
    async onSubmit() {
      let userInfo = {
        acount: this.formInline.user.trim(),
        sex: this.formInline.sex.trim(),
      };
      try {
        let inf = await userRequest.getUserInfo(
          this.pages,
          this.pagesize,
          userInfo
        );
        
        this.allNum = inf.data.allArr;
        this.tableData = inf.data.data;
        this.pagesize = inf.data.pagesize * 1;
      } catch (e) {
        console.log(e);
      }
    },
    addUser() {
      this.dialogTitle = "添加用户";
      this.headphotoTitle = "上传头像";
      this.dialogFormVisible = true;
      // this.resetForm();
    },
    //重置第一行输入框
    resInput() {
      this.formInline.user = this.formInline.sex = "";
    },

    // 表格的删除功能：
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //表格的编辑功能
    async editUser(row) {
      this.dialogTitle = "修改信息";
      this.headphotoTitle = "更换头像";
      try {
        console.log(row.uid);
        console.log(row);//这个就是这个人的整行信息了
        this.dialogFormVisible = true;
        console.log(row.acount, 9898);
        for (var key in this.ruleForm) {
          if (key == "birthday") {
            this.ruleForm.birthday = this.birthdayTXT = row[key];
            continue;
          } else {
            this.ruleForm[key] = row[key];
          }
        }
        console.log(this.ruleForm, "更新好的表");
      } catch (e) {
        console.log(e, "eisdfisodh");
      }
    },
    //删除用户的方法
    async delUser(row) {
      try {
        let as = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        let inf = await userRequest.deleteUser(row.uid);
        console.log(inf);
        //删除后再调用刷新
        this.onSubmit();
      }catch (e) {
        this.$message({
            type: 'info',
            message: '已取消删除'
          });
      }
    },

    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pages = 1;
      this.onSubmit(); //选择页数后需要重新发起请求
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pages = val;
      this.onSubmit(); //选择这个页数后发请求，
    },
  },

  created() {
    this.onSubmit();
  },
};
</script>

<style scoped>
/* upload样式 */
.css_upload {
  width: 100px;
  height: 100px;
}
.test {
  box-sizing: border-box;
  width: 215.2px;
}
.formTableBox {
  text-align: center;
  margin-bottom: 4px;
}
.el-dialog .el-form-item {
  /* width: 260px; */
  margin-bottom: 26px;
}

/* 上传头像组件的样式 */
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
.avatar-uploader-icon {
  font-size: 16px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
</style>
