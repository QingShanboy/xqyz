<template>
  <div class="xianyu-home-page">
    <van-nav-bar class="app-nav-bar">
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        to="/Search"
        round
      >搜索</van-button>
    </van-nav-bar>
    <van-tabs>
      <van-tab id="van-tabs-scroll" title="推荐">
      </van-tab>

      <van-tab title="最新">
      </van-tab>

      <van-tab title="关注">
      </van-tab>
    </van-tabs>
  </div>

</template>

<style lang="less" scoped>
  .search-btn {
    width: 277px;
    height: 32px;
    background: #40E0D0;
    border: none;
  }
</style>
