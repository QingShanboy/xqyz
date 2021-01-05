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
    <van-cell title="头像 " is-link value="" center>
      <van-image
        width="50"
        height="50"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
    </van-cell>
    <van-cell
      title="用户名"
      is-link
      :value="user.name"
      @click=" isShow = true"
    />
    <van-cell
      title="简介"
      is-link
      :value="user.signature"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender"
    />
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
     />
    <van-cell
      title="地区"
      is-link
      :value="user.add"
    />
    <van-popup
      v-model="isShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-name
        :name="user.name"
        @close= "isShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdateName from './component/updateName'
export default {
  name: 'PersonalData',
  data () {
    return {
      isShow: false,
      user: {
        name: '杜甫',
        gender: '1',
        headPhoto: '2',
        add: '3',
        signature: '4',
        birthday: '5'
      }

    }
  },
  components: {
    UpdateName
  },

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
