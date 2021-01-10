<!--  -->
<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="gender"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onChangeGender"
    />
  </div>
</template>

<script>
import { updataUser } from '@/api/users'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      gender: this.value,
      columns: ['男', '女']
    }
  },
  // components: {},

  // computed: {},

  // mounted: {},
  methods: {
    onChangeGender (picker, value, index) {
      console.log(picker, value, index)
      this.gender = index
    },
    async onConfirm () {
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
