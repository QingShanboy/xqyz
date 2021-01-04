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
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      @submit="onRegist"
      @failed="onFailed"
    >
      <van-field
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
        v-model="user.name"
        clearable
        center
        icon-prefix="iconfont"
        left-icon="iconfont iconshouji"
        placeholder="请输入用户名或手机号"
        name="userName"
        :rules="fromRules.userName"
      />
      <van-field
        v-model="user.password"
        center
        type="password"
        icon-prefix="iconfont"
        left-icon="iconfont iconlock"
        placeholder="请设置密码"
        :rules="fromRules.password"
      >
      </van-field>
      <van-field
        v-model="user.newPassword"
        center
        type="password"
        icon-prefix="iconfont"
        left-icon="iconfont iconlock"
        placeholder="请重新输入密码"
        :rules="fromRules.newPassword"
      >
      </van-field>
      <van-field
        v-model="user.code"
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
    <div class="register-btn-warp">
      <van-button
        class="register-btn"
        color="#00CED1"
        round
        block
      > 注册
      </van-button>
    </div>
    </van-form >
  </div>
</template>

<script>
import { getRegist } from '@/api/login'
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
      },
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
        ],
        password: [
          { required: true, message: '请输入密码 ' }
        ],
        newPassword: [
          { required: true, message: '请再次输入密码 ' },
          { validator: (val) => { return val === this.user.password }, message: '与原密码不一致，请重新输入' }
        ]
      },
      svg: ''
    }
  },
  mounted () {
    this.getCaptchas()
  },
  methods: {
    async onRegist () {
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
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
        const res = await getRegist(this.user)
        console.log(res)
        if (res.code === 200) {
          this.$toast.success('注册成功')// 注册成功转到登录页面。
          this.$router.push('/Login')
        } else {
          this.$toast.fail(`登录失败-----${res.msg}`)
        }
      } catch (err) {
        console.log(err)
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    getCaptchas () {
      this.$store.dispatch('getCaptchas').then(res => {
        this.svg = res
      })
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
    .van-button--small {
      height: 0.95rem;
    }
    .register-btn-warp {
      padding:16px
    }
  }
</style>
