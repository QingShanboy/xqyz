<!--  -->
<template>
  <div class="update-addr">
    <van-area
      title="地区"
      :area-list="areaList"
      :columns-num="2"
      confirm-button-text
      cancel-button-text
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChangeAddr"
    />
  </div>
</template>

<script>
import { updataUser } from '@/api/users'
import aeraAddr from '@/utils/area.js'
export default {
  name: 'UpdateAddr',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      addr: this.value,
      areaList: aeraAddr

    }
  },
  // components: {},

  // computed: {},

  // mounted: {},
  methods: {
    onChangeAddr (picker, value, index) {
      console.log(picker, value, index)
      if (value[0].name === value[1].name) {
        this.addr = value[0].name
      } else {
        this.addr = value[0].name + value[1].name
      }
      console.log(this.addr)
      // this.addr = index
    },
    async onConfirm () {
      const id = this.$store.state.user.userId
      try {
        const res = await updataUser(id, { addr: this.addr })
        console.log(res)
        if (res.code === 200) {
          this.$toast.success('修改成功')
          this.$emit('input', this.addr)
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
