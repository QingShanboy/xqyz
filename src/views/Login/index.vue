<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="login-text">
      <h5>欢迎登录~闲情逸致</h5>
      <p>行到水穷处，坐看云起时</p>
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
        v-model="user.password"
        v-if="isPwBtn"
        type="password"
        icon-prefix="iconfont"
        left-icon="iconfont iconlock"
        placeholder="请输入密码"
      >
      </van-field>
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
    </van-cell-group>
    <div class="login-btn-warp">
      <van-button
        class="login-btn"
        color="#00CED1"
        round
        block
      > 登录
      </van-button>
    <div class="login-pw">
      <van-button
        class="login-pw-code"
        color="#00CED1"
        plain
        @click="switchBtn"
      > {{pwCode}}
      </van-button>
      <van-button
        v-text="pwReg"
        class="login-pw-regist"
        color="#00CED1"
        @click="registBtn"
        plain
      >{{pwReg}}
      </van-button>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        tellphone: '',
        code: '',
        password: ''
      },
      isPwBtn: false,
      pwCode: '密码登录',
      pwReg: '用户注册'
    }
  },
  methods: {
    switchBtn () {
      this.isPwBtn = !this.isPwBtn
      this.pwCode = this.isPwBtn ? '短信登录' : '密码登录'
      this.pwReg = this.isPwBtn ? '忘记密码' : '用户注册'
    },
    registBtn () {
      if (this.isPwBtn) {
        this.$router.push('/Forget')
      } else {
        this.$router.push('/Register')
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .login-container {
    .login-text{
      padding:16px;
      h5 {
        margin: 0.25rem 0;
      }
      p {
        color: #747483;
        font-size:12px;
      }
    }
    .login-btn-warp {
      padding:16px
    }
    .login-pw {
      position: relative;
      margin-top: 40px;
      .login-pw-code{
        background: #f5f7f9;
        border: 0
      }
      .login-pw-regist{
        position: absolute;
        right : 0;
        background: #f5f7f9;
        border: 0
      }
    }
  }
</style>
