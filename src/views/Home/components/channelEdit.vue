<!--  -->
<template>
  <div class="channerEdi-container">
    <van-cell  center :border="false">
      <div slot="title" class="channerEdi-title">我的频道</div>
      <van-button
        class="channerEdi-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
      >{{isEdit ? '完成': '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{active: index === active }"
        v-for="(item, index) in myChannels"
        :icon="(isEdit && index != 0) ? 'close' : ''"
        :key="item.id"
        :text="item.name"
        @click="editChanner(index)" />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channerEdi-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in 8"
        :key="value"
        text="文字" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'ChannelEdit',
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
      isEdit: false
    }
  },
  // components: {},
  // computed: {},
  // mounted: {},
  methods: {
    editChanner (index) {
      if (this.isEdit && (index !== 0)) {
        this.delChanner(index)
      } else {
        this.switchChanner(index)
      }
    },
    delChanner (index) {
      this.delChanner(index)
    },
    switchChanner (index) {
      this.$emit('close')
      this.$emit('channerActive', index)
    }
  }
}

</script>
<style lang='less' scoped>
.channerEdi-container {
  padding-top: 54px;
  .channerEdi-title {
    font-size: 16px;
    color: #333;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
      /deep/.van-grid-item__text {
        font-size: 14px;
        color: #222;
      }
    }
    /deep/.van-grid-item__icon {
      position: absolute;
      right: -5px;
      top:-5px;
      font-size: 20px;
    }
  }
  .active {
      /deep/.van-grid-item__text {
        color: red !important;
      }
  }
}
</style>
