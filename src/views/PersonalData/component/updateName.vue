<!--  -->
<template>
  <div class="update-name">
    <van-nav-bar
      title="修改用户名"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickComplete"
    />
    <van-field
      v-model="updateNames"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入用户名"
      show-word-limit
/>
  </div>
</template>

<script>
import { updataUser } from '@/api/users'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      updateNames: this.value
    }
  },
  // components: {},

  // computed: {},

  // mounted: {},
  methods: {
    async onClickComplete () {
      const id = this.$store.state.user.userId
      try {
        const res = await updataUser(id, { name: this.updateNames })
        console.log(res)
        if (res.code === 200) {
          this.$toast.success('修改成功')
          this.$emit('input', this.updateNames)
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

</style>
