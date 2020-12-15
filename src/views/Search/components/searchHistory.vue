<!--  -->
<template>
  <div class="searchHistory">
    <van-cell
      title="搜索历史"
      >
      <div>
        <span>全部删除</span>
        <span>完成</span>
      </div>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item,index) in searchHistoryData"
      :key="index"
    >
      <van-icon name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistoryData: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
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
