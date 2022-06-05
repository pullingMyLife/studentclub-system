<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  }
}
</script>

<style>
@import url('../public/reset.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:16px;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
#app .addInput {
  width: 250px !important;
  margin-bottom: 15px;
}
/* 以下是上传头像的正方形框的样式， */
/* 上传按钮 和 显示图片的 ul 框 */
#app .el-upload--picture-card {
  width:100px;
  height:100px;
  line-height: 100px;
}
/* 渲染上去的 li */
#app .el-upload-list__item {
  overflow: hidden;
  width: 100px !important;
  height: 100px !important;
  line-height: 100px !important;
}
/* 渲染上去的 img */
#app .el-upload-list__item-thumbnail {
  border-radius: 6px;;
  width: 102px !important;
  height: 102px !important;
  line-height: 102px !important;
}
</style>
