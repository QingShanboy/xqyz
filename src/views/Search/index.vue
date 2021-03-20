<!--  -->
<template>
  <div class="serch-container">
    <form action="/">
      <van-search
        v-model="searchKeyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchKeyword)"
        @cancel="$router.back()"
        @focus="isSearchResultShow = false"
      />
    </form>
    <search-result v-if='isSearchResultShow'/>
    <search-relation :searchKeyword='searchKeyword' v-else-if='searchKeyword' />
    <search-history :searchHistoryData='searchHistoryData' v-else />

  </div>
</template>

<script>
import SearchRelation from './components/searchRelation'
import SearchHistory from './components/searchHistory'
import SearchResult from './components/searchResult'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchKeyword: '', // 搜索输入框的内容
      isSearchResultShow: false, // 控制搜索结果的显示状态
      searchHistoryData: [] // 搜索历史数据

    }
  },
  components: {
    SearchRelation,
    SearchHistory,
    SearchResult
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    // 监视搜索历史记录的变化，存储到本地存储
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  methods: {
    onSearch (searchKeyword) {
      this.searchKeyword = searchKeyword
      const index = this.searchHistoryData.indexOf(searchKeyword)
      if (index !== -1) {
        this.searchHistoryData.splice(index, 1)
      }
      this.searchHistoryData.unshift(searchKeyword)
      this.isSearchResultShow = true
    },
    async loadSearchHistories () {
      // 因为后端帮我们存储的用户搜索历史记录太少了（只有4条）
      // 所以我们这里让后端返回的历史记录和本地的历史记录合并到一起
      // 如果用户已登录
      const searchHistories = getItem('search-histories') || []
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   // 合并数组： [...数组, ...数组]
      //   // 把 Set 转为数组：[...Set对象]
      //   // 数组去重：[...new Set([...数组, ...数组])
      //   searchHistories = [...new Set([
      //     ...searchHistories,
      //     ...data.data.keywords
      //   ])]
      // }

      this.searchHistories = searchHistories
    }
  }
  // computed: {},
  // mounted: {},
}

</script>
<style lang='less' scoped>
</style>
