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
export default {
  name: 'UpdateName',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      updateNames: this.name
    }
  },
  // components: {},

  // computed: {},

  // mounted: {},
  methods: {
    onClickComplete () {
      console.log('onClickCompleteonClickComplete')
    }
  }
}

</script>
<style lang='less'>

</style>
