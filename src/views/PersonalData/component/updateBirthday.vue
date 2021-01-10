<!--  -->
<template>
  <div class="update-birthday">
    <van-nav-bar
      title="修改生日"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickComplete"
    />
    <van-calendar
      v-model="show"
      :show-confirm="false"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updataUser } from '@/api/users'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      date: '',
      show: true,
      gender: this.value
    }
  },
  // components: {},

  // computed: {},

  // mounted: {},
  methods: {
    onConfirm () {

    },
    async onClickComplete () {
      const id = this.$store.state.user.userId
      try {
        const res = await updataUser(id, { gender: this.gender })
        console.log(res)
        if (res.code === 200) {
          this.$toast.success('修改成功')
          this.$emit('input', this.gender)
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
