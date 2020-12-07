<!--  -->
<template>
  <div class="home-container">
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs class="home-tabs" v-model="active">
      <van-tab
        v-for="item in channels"
        :title="item.name"
        :key='item.id'
      >
        <article-list />
      </van-tab>
      <!-- 占位符，保证导航栏不被遮挡住 -->
      <div slot="nav-right" class="nav-tabs-placeholder"></div>
      <div
        slot="nav-right"
        @click="isEditShow = true"
        class="channel-edit"
      >
        <van-icon name="bars"></van-icon>
      </div>
    </van-tabs>
    <van-popup
      class="edit-popup"
      v-model="isEditShow"
      position="bottom"
      closeable
      close-icon-position="top-left"
      get-container="body"
      style="height: 100%"
    >
    <!-- 模板当中 $event 表示通信事件参数 -->
      <channer-edit
        :myChannels="channels"
        :active="active"
        @close="isEditShow = false"
        @channerActive="active = $event" />
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/articleList'
import ChannerEdit from './components/channelEdit'

export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      isEditShow: false,
      channels: [
        {
          id: 0,
          name: '推荐'
        },
        {
          id: 1,
          name: '首页'
        },
        {
          id: 2,
          name: '新闻'
        },
        {
          id: 3,
          name: '古诗词'
        },
        {
          id: 4,
          name: '笑话'
        },
        {
          id: 5,
          name: '相声'
        },
        {
          id: 6,
          name: '短视频'
        }
      ]
    }
  },
  components: {
    ArticleList,
    ChannerEdit
  },
  // computed: {},
  // mounted: {},
  methods: {
    // switchActive (index) {
    //   console.log(index)
    //   this.active = index
    // }
  }
}

</script>
<style lang='less' scoped>
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #40E0D0;
    border: none;
  }
  .home-tabs {
    /deep/.van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #00CED1;
    }
    .nav-tabs-placeholder{
      width: 33px;
      flex-shrink: 0;
    }
    .channel-edit {
      position: fixed;
      right:0;
      width: 33px;
      height: 43px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      opacity: 0.9;
      .van-icon {
        font-size: 24px;
      }
    }
  }
  .edit-popup {
    height: 100%;
  }
}

</style>
