<template>
  <div>
    <Header></Header>
    <NavBar></NavBar>
    <Main></Main>
    <div class="tips">
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import NavBar from "@/components/NavBar";
import Main from "@/components/Main";
export default {
  data() {
    return {
      userList: [],
    };
  },

  components: {
    NavBar,
    Header,
    Main,
  },

  methods: {
    alertInf() {
        this.$alert('首页正在修改中，已注释显示区，请点击菜单栏进行操作', '公告', {
          confirmButtonText: '确定'
        });
      }
  },
  created() {
    this.alertInf();
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.tips {
  position: absolute;
  right: 50px;
  top: 150px;
  width: 300px;
  height: auto;
  background-color: rgb(241, 241, 241);
  opacity: .6;

  display: inline-block;
  margin: 0 0.5rem;
  animation: bounce; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 8s; /* don't forget to set a duration! */
}
.tips img{
  width: 300px;
  height: 400px;
  
}
</style>