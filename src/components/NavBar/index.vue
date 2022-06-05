<template>
  <div class="navbar">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
      <!-- <el-menu-item index="2">
        <i class="el-icon-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-shopping-cart-full"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-shopping-bag-1"></i>
        <span slot="title">商铺管理</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: true,
      associationST:["","","",""],
      menuList: [
        // {
        //   path: '/home/bannerctr',
        //   icon: 'el-icon-s-home',
        //   title:'轮播图管理'               //首页嵌套的问题。
        // },
        {
          path: '/home/users',
          icon: 'el-icon-user',
          title:'用户管理'
        },
        {
          path: '/home/goods',
          icon: 'el-icon-goods',
          title:'社团管理'
        },
        {
          path: '/home/good_Lists',
          icon: 'el-icon-shopping-cart-full',
          title:'校名单管理'
        },
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: rgb(102, 102, 102);
  width: auto;
  position: absolute;
  top: 60px;
  bottom: 0;
  text-align:left;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>