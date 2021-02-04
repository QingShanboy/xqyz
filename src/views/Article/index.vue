<!--  -->
<template>
  <div class="aritcle-container">
    <van-nav-bar
      class="app-nav-bar"
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="articles">
      <h1 class="aritcle-title">{{article.title}}</h1>
      <van-cell center class="author-info">
        <div slot="title" class="author-name">{{article.author}}</div>
        <van-image
          slot="icon"
          class="author-avatar"
          fit="cover"
          round
          :src="headPhoto || ''"
        />
        <div slot="label" class="author-pubdate">{{article.updatedAt | relativeTime}}</div>
      <van-button
            class="follow-btn"
            :type="article.is_followed === 0 ? 'default' : 'info'"
            :icon="article.is_followed === 0 ? '' : 'plus'"
            round
            size="small"
            :loading="isFollowLoading"
            @click="onFollow"
          >{{ article.is_followed === 1 ? '已关注' : '关注' }}</van-button>
      </van-cell>
      <div class="content markdown-body"
          v-html= "article.content"
          ref="article-content"
      ></div> <!-- 文章评论列表 -->
      <comment-list
          :source="articleId"
          :list="commentList"
          @update-total-count="totalCommentCount = $event"
          @reply-click="onReplyClick"
        />
    </div>
      <div class="article-bottom">
        <van-button
          class="comment-btn"
          type="default"
          round
          size="small"
          @click="isPostShow = true"
        >写评论</van-button>
        <van-icon
          name="comment-o"
          :info="totalCommentCount"
          color="#777"
        />
        <van-icon
          :color="article.is_collect === 1 ? 'orange' : '#777'"
          :name="article.is_collect === 1 ? 'star' : 'star-o'"
          @click="onCollect"
        />
        <van-icon
          :color="article.is_zan  === 1 ? 'hotpink' : '#777'"
          :name="article.is_zan  === 1 ? 'good-job' : 'good-job-o'"
          @click="onLike"
        />
        <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <post-comment
        :target="articleId"
        @post-success="onPostSuccess"
      />
    </van-popup>
    <!-- /发布评论 -->

    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
    >
      <!-- 这里使用 v-if 的目的是让组件随着弹出层的显示进行渲染和销毁，防止加载过的组件不重新渲染导致数据不会重新加载的问题 -->
      <comment-reply
        v-if="isReplyShow"
        :comment="replyComment"
        :article-id="articleId"
        @close="isReplyShow = false"
      />
    </van-popup>
    <!-- /评论回复 -->
</div>
</template>

<script>
import './github-markdown.css'
import { getArticlesText, onFollowAuthor, unFollowAuthor, unCollect, addCollect, unLike, addLike } from '@/api/article'
import CommentList from './components/comment-list'
import PostComment from './components/post-comment'
import CommentReply from './components/comment-reply'
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
      article: {},
      headPhoto: '',
      isFollowLoading: false, // 关注用户按钮的 loading 状态
      isCollectLoading: false, // 收藏的 loading 状态
      isPostShow: false, // 控制发布评论的显示状态
      commentList: [], // 文章评论列表
      totalCommentCount: 0, // 评论总数据量
      isReplyShow: false, // 控制回复的显示状态
      replyComment: {} // 当前回复评论对象
    }
  },

  components: {
    CommentList,
    PostComment,
    CommentReply
  },

  // computed: {},

  mounted () {
    this.getArticleContent()
  },

  methods: {
    async getArticleContent () {
      const res = await getArticlesText(this.articleId)
      this.article = res.data
      this.headPhoto = this.article.publisher.headPhoto
      console.log(res)
    },
    async onFollow () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      this.isFollowLoading = true
      let res = ''
      if (this.article.is_followed === 1) {
        res = await unFollowAuthor(this.article.publisher._id)
        this.article.is_followed = 0
      } else {
        res = await onFollowAuthor(this.article.publisher._id)
        this.article.is_followed = 1
      }
      this.isFollowLoading = false
      this.$toast.success(res.message)
    },
    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      let res = ''
      if (this.article.is_collect === 1) {
        // 已收藏，取消收藏
        res = await unCollect(this.articleId)
        this.article.is_collect = 0
      } else {
        // 没有收藏，添加收藏
        res = await addCollect(this.articleId)
        this.article.is_collect = 1
      }
      this.$toast.success(res.message)
    },

    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      let res = ''
      if (this.article.is_zan === 1) {
        // 已点赞，取消点赞
        res = await unLike(this.articleId)
        this.article.is_zan = 0
      } else {
        // 没有点赞，添加点赞
        res = await addLike(this.articleId)
        this.article.is_zan = 1
      }
      this.$toast.success(res.message)
    },
    onPostSuccess (comment) {
      console.log('index')
      console.log(comment)
      // 把发布成功的评论数据对象放到评论列表顶部
      this.commentList.unshift(comment)
      // 更新评论的总数量
      this.totalCommentCount++

      // 关闭发布评论弹出层
      this.isPostShow = false
    },

    onReplyClick (comment) {
      console.log('onReplyClick', comment)
      this.replyComment = comment

      // 展示回复内容
      this.isReplyShow = true
    }
  }
}

</script>
<style lang='less' scoped>
.aritcle-container {
  .articles {
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
    .content {
      background-color: #fff;
    }
  }
  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 11px;
        background-color: #e22829;
      }
    }
  }
}
</style>
