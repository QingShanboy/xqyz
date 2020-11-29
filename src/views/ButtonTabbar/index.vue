<!--  -->
<template>
  <div class="">
    <router-view />
    <van-tabbar v-model="active" route>
        <van-tabbar-item icon="wap-home-o"  to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="like-o"  to="/Leisure">闲情</van-tabbar-item>
        <van-tabbar-item icon="video-o"  to="/Video">视频</van-tabbar-item>
        <van-tabbar-item icon="user-o"  to="/My">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'bottonTabbar',
  data () {
    return {
      active: 0
    }
  },

  // components: {},

  // computed: {},

  // mounted: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
