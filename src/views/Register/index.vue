<!--  -->
<template>
  <div class="register-container">
    <van-nav-bar
      class="app-nav-bar"
      title="注册"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="register-text">
      <h5>欢迎注册~闲情逸致</h5>
      <p>明月别枝惊鹊，清风半夜鸣蝉</p>
    </div>
    <van-cell-group>
      <van-field
        v-model="user.tellphone"
        clearable
        icon-prefix="iconfont"
        left-icon="iconfont iconshouji"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.name"
        clearable
        left-icon="user-circle-o"
        placeholder="昵称"
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
        placeholder="请设置密码"
      />
      <van-field
        v-model="user.newPassword"
        type="password"
        icon-prefix="iconfont"
        left-icon="iconfont iconlock"
        placeholder="请重新输入密码"
      />
    </van-cell-group>
    <div class="register-btn-warp">
      <van-button
        class="register-btn"
        color="#00CED1"
        round
        block
      > 注册
      </van-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'registerIndex',
  data () {
    return {
      user: {
        tellphone: '',
        name: '',
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
<style lang='less' scoped>
  .register-container {
    .register-text{
      padding:16px;
      h5 {
        margin: 0.25rem 0;
      }
      p {
        color: #747483;
        font-size:12px;
      }
    }
    .register-btn-warp {
      padding:16px
    }
  }
</style>
