<!--  -->
<template>
  <div class="aritcle-container">
    <van-nav-bar
      class="app-nav-bar"
      title=""
      left-arrow
      @click-left="$router.back()"
    />
    <h1 class="aritcle-title">你好</h1>
    <van-cell center class="author-info">
      <div slot="title" class="author-name">青衫雾影</div>
      <van-image
        slot="icon"
        class="author-avatar"
        fit="cover"
        round
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <div slot="label" class="author-pubdate">1个小时前</div>
      <van-button
        type="info"
        class="author-btn"
        icon="plus"
        round
        size="small"
      >关注</van-button>
    </van-cell>
    <div class="content">
      WO
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleInddex',
  props: {
    articleId: {
      type: String,
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
.aritcle-container {
  .aritcle-title {
    font-size: 20px;
    padding: 14px;
    background-color: #fff;
    margin: 0;
  }
  .author-info {
    .author-name {
      font-size: 12px;
    }
    .author-avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }
    .author-pubdate {
      font-size: 11px;

    }
    .author-btn  {
      width: 85px;
      height: 29px;
    }
  }
}
</style>
