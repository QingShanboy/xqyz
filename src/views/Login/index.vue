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
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
    >
      <van-field
        v-model="user.name"
        v-if="isPwBtn"
        clearable
        center
        icon-prefix="iconfont"
        left-icon="iconfont iconshouji"
        placeholder="请输入用户名或手机号"
        name="mobile"
        :rules="fromRules.userName"
      />
      <van-field
        v-else
        v-model="user.tellphone"
        clearable
        center
        icon-prefix="iconfont"
        left-icon="iconfont iconshouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="fromRules.tellphone"
      />
      <van-field
        v-model="user.password"
        v-if="isPwBtn"
        center
        type="password"
        icon-prefix="iconfont"
        left-icon="iconfont iconlock"
        placeholder="请输入密码"
      >
      </van-field>
      <van-field
        v-model="user.code"
        v-if="isPwBtn"
        clearable
        center
        icon-prefix="iconfont"
        left-icon="iconfont iconyanzhengma"
        placeholder="请输入验证码"
        name="codes"
        :rules="fromRules.code"
      >
        <template #button>
          <van-button
            size="small"
            color="#00CED1"
            plain
            @click.prevent="getCaptchas"
          >
          <div v-html="svg"></div>
          </van-button>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        v-else
        clearable
        center
        icon-prefix="iconfont"
        left-icon="iconfont iconyanzhengma"
        placeholder="请输入验证码"
        name="codes"
        :rules="fromRules.code"
      >
        <template #button>
          <van-count-down
            v-if="isCountDown"
            :time="5 * 60 * 1000"
            format="mm:ss s"/>
          <van-button
            v-else
            size="small"
            color="#00CED1"
            plain
            @click.prevent="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-warp">
      <van-button
        class="login-btn"
        color="#00CED1"
        round
        block
      > 登录
      </van-button>
      </div>
    </van-form >
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
</template>
<script>
import { getLogin } from '@/api/login'
// import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        name: '',
        tellphone: '',
        code: '',
        password: ''
      },
      svg: '',
      sid: '',
      isPwBtn: false,
      pwCode: '密码登录',
      pwReg: '用户注册',
      fromRules: {
        userName: [
          { required: true, message: '请输入用户名' }
        ],
        tellphone: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误，请重新输入' }
        ],
        code: [
          { required: true, message: '请输入验证码' }
        ]
      },
      isCountDown: false
    }
  },
  mounted () {
    // if (localStorage.getItem('sid')) {
    //   debugger
    //   this.sid = localStorage.getItem('sid')
    // } else {
    //   this.sid = uuidv4()
    //   debugger
    //   localStorage.setItem('sid', this.sid)
    // }
    // this.$store.commit('SET_SID', this.sid)
    this.getCaptchas()
  },
  methods: {
    async onLogin () {
      // Toast.loading({
      //   message: '登录中...',
      //   forbidClick: true,
      //   duration: 0
      // })
      const sid = this.$store.state.user.sid
      this.user.sid = sid
      // await getLogin(this.user).then(res => {
      //   if (res.code === 200) {
      //     this.$store.commit('SET_TOKEN', res.token)
      //     Toast.success('登录成功')
      //   } else {
      //     Toast.fail(`登录失败${res.status}${res.message}`)
      //   }
      // })
      try {
        const res = await getLogin(this.user)
        console.log(res)
        if (res.code === 200) {
          this.$store.commit('SET_TOKEN', res.token)
          console.log(this.$store.state)
          debugger
          this.$toast.success('登录成功')
          const redirect = decodeURIComponent(this.$route.query.redirect || '/') // 获取登录成功后要跳转的路由。
          this.$router.push({
            path: redirect
          })
        } else {
          this.$toast.fail(`登录失败-----${res.msg}`)
        }
      } catch (err) {
        console.log(err)
      }
    },
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
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        this.isCountDown = true
      } catch (err) {
        this.isCountDown = false
        console.log('验证失败', err)
        this.$toast({
          message: err.message,
          position: 'top'
        })
      }
    },
    getCaptchas () {
      // const sid = this.$store.state.sid
      // getCaptchas(sid).then((res) => {
      //   console.log(sid)
      //   console.log(res)
      //   if (res.code === 200) {
      //     this.svg = res.data
      //   }
      // })
      this.$store.dispatch('getCaptchas').then(res => {
        this.svg = res
      })
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
