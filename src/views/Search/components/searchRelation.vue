<!--  -->
<template>
  <div class="search-relation">
    <van-cell
      icon="search"
      title="123"
    ></van-cell>
  </div>
</template>

<script>
import { debounce } from 'lodash'
export default {
  name: 'SearchRelation',
  props: {
    searchKeyword: {
      type: String,
      required: true
    }
  },
  data () {
    return {
    }
  },
  watch: {
    searchKeyword: {
      // 监听数据变化时，会执行handler
      handler: debounce(function () {
        console.log('1')
      }, 500),
      immediate: true
    }
  }
  // components: {},

  // computed: {},

  // mounted: {},

  // methods: {}
}

</script>
<style lang='less' scoped>
</style>
