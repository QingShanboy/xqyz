<!--  -->
<template>
  <div class="PersonalData-container">
    <van-nav-bar
      class="app-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="routerBack"
    />
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange()"
    >
    <div
      class="bgimg"
      @click="$refs.file.click()">
      <!-- <van-image
        width="50"
        height="50"
        round
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      /> -->
        <van-image
          class="bgimg-img"
          width="80"
          height="80"
          round
          fit="cover"
          :src="user.headPhoto"
        />
        <!-- <van-uploader class="bgimg-upload">
          <van-button icon="photograph" type="default"></van-button>
        </van-uploader> -->
        <!-- <van-uploader
          class="bgimg-upload"
          round
          :after-read="afterRead"
        /> -->
        <span>点击更换头像</span>
    </div>
    <van-cell
      title="用户名"
      is-link
      :value="user.name"
      @click=" isUpateNameShow = true"
    />
    <van-cell
      title="个性签名"
      is-link
      :value="user.signature"
      @click=" isUpateSignaShow = true"
    />
    <van-cell
      title="性别"
      is-link
      :value="user.gender=== 0 ? '男': '女' "
      @click="isUpateGenderShow = true"
    />
    <van-cell
      title="生日"
      is-link
      :value="date"
      @click="isUpateBirthdayShow = true"
     />
    <van-cell
      title="地区"
      is-link
      :value="user.addr"
      @click="isUpateAddrShow = true"
    />
    <van-popup
      v-model="isUpateNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- v-model
        默认绑定一个value传给子组件 :value = "user.name"
        默认监听input事件 @input="user.name = $event"
      -->
      <update-name
        v-if="isUpateNameShow"
        v-model="user.name"
        @close= "isUpateNameShow = false"
      />
    </van-popup>
    <van-popup
      v-model="isUpateSignaShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- v-model
        默认绑定一个value传给子组件 :value = "user.name"
        默认监听input事件 @input="user.name = $event"
      -->
      <update-signa
        v-if="isUpateSignaShow"
        v-model="user.signature"
        @close= "isUpateSignaShow = false"
      />
    </van-popup>
    <van-popup
      v-model="isUpateGenderShow"
      position="bottom"
    >
      <!-- v-model
        默认绑定一个value传给子组件 :value = "user.name"
        默认监听input事件 @input="user.name = $event"
      -->
      <update-gender
        v-if="isUpateGenderShow"
        v-model="user.gender"
        @close= "isUpateGenderShow = false"
      />
    </van-popup>

    <van-calendar
      v-model="isUpateBirthdayShow"
      :show-confirm="false"
      @confirm="onConfirm"
      :min-date="minDate"
    />
    <van-popup
      v-model="isUpateAddrShow"
      position="bottom"
    >
      <!-- v-model
        默认绑定一个value传给子组件 :value = "user.name"
        默认监听input事件 @input="user.name = $event"
      -->
      <update-addr
        v-if="isUpateAddrShow"
        v-model="user.addr"
        @close= "isUpateAddrShow = false"
      />
    </van-popup>
    <van-popup
      v-model="isUpatePhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-headphoto
        v-if="isUpatePhotoShow"
        v-model="user.headPhoto"
        :file= "previewImage"
        @close= "isUpatePhotoShow = false"
        @update-headphoto= "user.headPhoto = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import UpdateName from './component/updateName'
import UpdateSigna from './component/updateSigna'
import UpdateGender from './component/updateGender'
import UpdateAddr from './component/updateAddr'
import UpdateHeadphoto from './component/updateHeadphoto'
import { getUser, updataUser } from '@/api/users'
export default {
  name: 'PersonalData',
  data () {
    return {
      date: '',
      minDate: new Date(1960, 0, 1),
      isUpateNameShow: false,
      isUpateSignaShow: false,
      isUpateGenderShow: false,
      isUpateBirthdayShow: false,
      isUpateAddrShow: false,
      isUpatePhotoShow: false,
      user: {
        name: '',
        genders: '',
        headPhoto: '',
        addr: '',
        signature: '',
        birthday: ''
      },
      previewImage: null // 预览图片

    }
  },
  components: {
    UpdateName,
    UpdateSigna,
    UpdateGender,
    UpdateAddr,
    UpdateHeadphoto
    // UpdateBirthday
  },

  // computed: {},

  mounted () {
    this.onGetUser()
  },
  methods: {
    formatDate (date) {
      // console.log(date)
      let month = date.getMonth() + 1
      month = month < 10 ? `0${month}` : month
      let day = date.getDate()
      day = day < 10 ? `0${day}` : day
      return `${date.getFullYear()}-${month}-${day}`
    },
    async onConfirm (date) {
      console.log(date)
      const id = this.$store.state.user.userId
      this.date = this.formatDate(date)
      try {
        const res = await updataUser(id, { birthday: this.date })
        console.log(res)
        if (res.code === 200) {
          this.$toast.success('修改成功')
        } else {
          this.$toast.fail(`修改失败-----${res.msg}`)
        }
        this.isUpateBirthdayShow = false
      } catch (err) {
        console.log(err)
      }
    },
    async onGetUser () {
      const id = this.$store.state.user.userId
      try {
        const res = await getUser(id)
        console.log(res)
        this.user = res
        this.date = res.birthday
      } catch (err) {
        console.log(err)
      }
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    routerBack () {
      this.$router.push('/My')
    },
    onFileChange () {
      console.log('onFileChange')
      // 预览图片
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      console.log(this.$refs.file)
      const file = this.$refs.file.files[0]
      this.previewImage = file
      this.isUpatePhotoShow = true
      // 为了解决相同的文件不触发change事件
      this.$refs.file.value = ''
    }
  }
}

</script>
<style lang='less' scoped>
.PersonalData-container {
  .bgimg {
    position: relative;
    text-align:center;
    height: 100px;
    padding: 15px 0;
    background-color: #fff;
    // .bgimg-upload {
    //   position: absolute;
    //   left: 40%;
    //   top: 25%;
    //   /deep/.van-uploader__input-wrapper {
    //     height: 80px;
    //     width: 80px;
    //   .van-button--default {
    //     height: 16px;
    //     line-height: 16px;
    //     padding: 0;
    //     opacity:0.3
    //   }

    //   }
    // }
    span {
      position: absolute;
      left: 40%;
      top: 80%;
      font-size: 12px;
    }
  }
}
</style>
