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

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchKeyword: '',
      isSearchResultShow: false,
      searchHistoryData: []

    }
  },
  components: {
    SearchRelation,
    SearchHistory,
    SearchResult
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
    }
  }
  // computed: {},
  // mounted: {},
}

</script>
<style lang='less' scoped>
</style>
