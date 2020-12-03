<template>
    <div class="forget-container">
    <van-nav-bar
      class="app-nav-bar"
      title="重置密码"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-field
        v-model="user.tellphone"
        clearable
        icon-prefix="iconfont"
        left-icon="iconfont iconshouji"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="iconfont"
        left-icon="iconfont iconyanzhengma"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="small" color="#00CED1" plain>发送验证码</van-button>
        </template>
      </van-field>
      <van-field
        v-model="user.password"
        type="password"
        icon-prefix="iconfont"
        left-icon="iconfont iconlock"
        placeholder="请设置新密码"
      />
      <van-field
        v-model="user.newPassword"
        type="password"
        icon-prefix="iconfont"
        left-icon="iconfont iconlock"
        placeholder="请重新输入新密码"
      />
    </van-cell-group>
    <div class="forget-btn-warp">
      <van-button
        class="forget-btn"
        color="#00CED1"
        round
        block
      > 重置密码
      </van-button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'forgerIndex',
  data () {
    return {
      user: {
        tellphone: '',
        code: '',
        password: '',
        newPassword: ''
      }
    }
  },
  methods: {
    switchBtn () {
      this.isPwBtn = !this.isPwBtn
    }
  }
}
</script>

<style scoped lang="less">
  .forget-container {
    .forget-btn-warp {
      padding:16px
    }
  }
</style>
