<!--  -->
<template>
  <div class="register-container">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-uploader :after-read="afterRead" />
    <van-cell title="用户名" is-link></van-cell>
    <van-cell title="简介" is-link></van-cell>
    <van-cell title="性别" is-link></van-cell>
    <van-cell title="生日" is-link></van-cell>
    <van-cell title="地区" is-link></van-cell>
  </div>
</template>

<script>
export default {
  name: 'PersonalData',
  data () {
    return {
    }
  },

  // components: {},

  // computed: {},

  // mounted: {},

  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
