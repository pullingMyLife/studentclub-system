<template>
  <div class="main">
    <router-view></router-view>
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
.main{
    position:absolute;
    top:60px;
    left: 250px;
    right: 0;
    bottom: 0;
    background-color: rgb(255, 255, 255);
    padding: 16px;
    box-sizing: border-box;
}   
</style>