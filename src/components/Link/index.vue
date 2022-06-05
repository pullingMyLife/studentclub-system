<template>
  <div>
    <div class="mianbaoxie shadow">
        <el-breadcrumb separator-class="el-icon-arrow-right" >
          <el-breadcrumb-item class="line" :to="{ path: 'users' }">{{ $route.meta.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  methods: {}
}
</script>

<style scoped>
.shadow {
	position: relative;
	/* max-width: 270px; */
	box-shadow: 0px 1px 4px rgba(0,0,0,0.3),
				0px 0px 20px rgba(0,0,0,0.1) inset;
}

.shadow::before,
.shadow::after {
   content:"";
   position:absolute;
   z-index:-1;
}

.shadow::before,
.shadow::after {
   content:"";
   position:absolute;
   z-index:-1;
   bottom:15px;
   left:10px;
   width:50%;
   height:20%;
}

.shadow::before,
.shadow::after {
   content:"";
   position:absolute;
   z-index:-1;
   bottom:15px;
   left:10px;
   width:50%;
   height:20%;
   box-shadow:0 15px 10px rgba(0, 0, 0, 0.7);
   transform:rotate(-3deg);
}

.shadow::after{
   right:10px;
   left:auto;
   transform:rotate(3deg);
 }
.mianbaoxie{
  width: 98%;
  height: auto;
  box-sizing: border-box;
  padding: 10px;
  margin: 0px 0 16px 0px;
  /* box-shadow: 0px 1px 7px 0px; */
  border-radius: 6px;
}
.line{
  padding-left: 10px;
  border-left: 4px solid rgb(34, 179, 106);
}
</style>