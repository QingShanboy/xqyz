<!--  -->
<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isRefreshLoading: false
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.isRefreshLoading = false
      }, 1000)
    }
  }
  // components: {},

  // computed: {},

  // mounted: {},
}

</script>
<style lang='less' scoped>
  .article-list {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;
  }
</style>
