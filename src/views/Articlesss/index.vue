<!--  -->
<template>
  <div class="aritcle-container">
    <van-cell class="aritcle-item"
      :to="{
        name:'Article',
        params:{
          articleId: article._id
        }
      }"
    >
      <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>
      <div slot="label">
        <div
          v-if="article.image.length === 3"
          class="label-image"
        >
          <div
              class="label-image-item"
              v-for ="(img, index) in article.image"
              :key = "index"
              >
            <van-image
              class="image-item"
              fit="cover"
              :src="img"
            />
          </div>
        </div>
        <div class="label-wrap">
          <span>{{article.author}}</span>
          <span>{{1}}</span>
          <span>{{ article.updatedAt | relativeTime }}</span>
        </div>
      </div>
      <van-image
        v-if="article.image.length === 1"
        class="right-image"
        src="article.image[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
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
  .aritcle-item {
    .title {
      font-size: 20px;
      color: #3a3a3a;
    }
    /deep/.van-cell_value {
      flex: unset;
      width: 116px;
      height: 73px;
      margin-left: 12px;
    }
    .right-image {
      width: 116px;
      height: 73px;
    }
    .label-image {
      padding: 15px 0;
      display: flex;
      .label-image-item {
        flex: 1;
        height: 73px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .image-item {
          width: 116px;
          height: 73px;
        }
      }
    }
    .label-wrap {
      font-size: 11px;
      color: #b4b4b4;
      span {
        margin-right: 12px;
      }
    }

  }
}
</style>
