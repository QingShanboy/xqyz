<!--  -->
<template>
  <div class="search-relation">
    <van-cell
      icon="search"
      v-for="(str, index) in suggestions"
      :key="index"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
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
      suggestions: [], // 联想建议数据列表
      htmlStr: 'Hello <span style="color: red">World</span>'
    }
  },
  watch: {
    searchKeyword: {
      // 当数据发生变化则会执行 handler 处理函数
      // debounce 函数
      //  参数1：函数
      //  参数2：时间
      //  返回值：防抖处理的函数
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  // components: {},

  // computed: {},

  // mounted: {},

  methods: {
    highlight (str) {
      // a /a/gi、vue /vue/gi
      // 正则表达式 /中间的内容/ 都会当作正则匹配模式字符来对待
      // 错误的写法： /this.searchText/gi
      // RegExp 是正则表达式的构造函数
      //  参数1：字符串
      //  参数2：匹配模式
      //  返回值：正则对象
      return str.replace(
        new RegExp(this.searchText, 'gi'),
        `<span style="color: red">${this.searchText}</span>`
      )
    }
  }
}

</script>
<style lang='less' scoped>
</style>
