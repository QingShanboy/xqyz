<!--  -->
<template>
  <div class="searchHistory">
    <van-cell
      title="搜索历史"
      >
      <div  v-if="isDeleteShow">
        <span  @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span>完成</span>
      </div>
      <van-icon
        v-else
        name="delete"
        @click="isDeleteShow = true"
      />
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistories"
      :key="index"
      @click="onDelete(history, index)"
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
      isDeleteShow: false // 删除的显示状态
    }
  },
  // components: {},

  // computed: {},

  // mounted: {},

  methods: {
    onDelete (history, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // 持久化处理
        // 1. 修改本地存储的数据
        // 2. 请求接口删除线上的数据
        // 无论是否登录都把数据持久化到本地
        // 如果已登录，则删除线上的历史数据
        //    没有删除单个历史记录的接口
        //    只有删除所有历史记录的接口
        // setItem('search-histories', this.searchHistories)
        return
      }

      // 非删除状态，展示搜索结果
      this.$emit('search', history)
    }
  }
}

</script>
<style lang='less' scoped>
</style>
