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
        @load="onArticlesLoad"
      >
      <article-item
        v-for="(item, index) in articlesList"
        :key="index"
        :article ="item"
      />
      <!-- <van-cell
        v-for="(item, index) in articlesList"
        :key="index"
        :title="item.title"
      /> -->
    </van-list>
  </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/views/Articlesss'
export default {
  name: 'ArticleList',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      articlesList: [],
      current_page: 1,
      perpage: 10,
      loading: false,
      finished: false,
      isRefreshLoading: false
    }
  },
  methods: {
    async onArticlesLoad () {
      console.log(this.myChannels)
      console.log(this.active)
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 1000)
      const index = this.active
      const id = this.myChannels[index]._id
      const res = await getArticles(id, { current_page: this.current_page, perpage: this.perpage })
      console.log(res)
      this.articlesList.push(...res.data)
      this.loading = false
      const totalLength = res.total
      if (this.articlesList.length >= totalLength) {
        this.finished = true
      } else {
        this.current_page += 1
        this.perpage += 10
      }
    },
    async onRefresh () {
      const index = this.active
      const id = this.myChannels[index]._id
      const res = await getArticles(id, { current_page: this.current_page })
      this.articlesList.unshift(...res.data)
      this.isRefreshLoading = false
    }
  },
  components: {
    ArticleItem
  }

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
