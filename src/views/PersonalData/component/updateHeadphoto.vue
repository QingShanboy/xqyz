<!--  -->
<template>
  <div class="update-headphoto">
    <van-nav-bar
      title="修改头像"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <img class="image" :src="image" alt="" ref="image">
  </div>
</template>

<script>
import { uploadPhoto, updataUser } from '@/api/users'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'UpdateHeadphoto',
  props: {
    file: {
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null
    }
  },
  // components: {},

  // computed: {},

  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      // aspectRatio: 16 / 9,
      // crop (event) {
      //   console.log(event.detail.x)
      //   console.log(event.detail.y)
      //   console.log(event.detail.width)
      //   console.log(event.detail.height)
      //   console.log(event.detail.rotate)
      //   console.log(event.detail.scaleX)
      //   console.log(event.detail.scaleY)
      // }
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    // onChangeAddr (picker, value, index) {
    //   console.log(picker, value, index)
    //   if (value[0].name === value[1].name) {
    //     this.addr = value[0].name
    //   } else {
    //     this.addr = value[0].name + value[1].name
    //   }
    //   console.log(this.addr)
    //   // this.addr = index
    // },
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((blob) => {
          resolve(blob)
        })
      })
    },
    async onConfirm () {
      const id = this.$store.state.user.userId
      // 如果要求 Content-Type 是mutipart/ form-data 一定要提交 formDate数据对象
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('file', file)
      console.log(fd)
      console.log(1)
      try {
        const res = await uploadPhoto(fd)
        console.log(res)
        const res1 = await updataUser(id, { headPhoto: res.url })
        console.log(res1)
        if (res1.code === 200) {
          this.$toast.success('修改成功')
          this.$emit('update-headphoto', res.url)
        } else {
          this.$toast.fail(`修改失败-----${res.msg}`)
        }
        this.$emit('close')
      } catch (err) {
        console.log(err)
      }
    }
  }
}

</script>
<style lang='less'>
  .update-headphoto {
    .image {
      display: block;
      /* This rule is very important, please don't ignore this */
      max-width: 100%;
    }
  }
</style>
