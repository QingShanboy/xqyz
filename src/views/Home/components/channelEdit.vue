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
        @click="editChanner(index,item)"
       />
    </van-grid>
    <van-cell center :border="false">
      <div slot="title" class="channerEdi-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addChannels, unChannels } from '@/api/channels'
import { setItem } from '@/utils/storage'
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
      isEdit: false,
      allChannels: []
    }
  },
  created  () {
    this.getChannels()
  },
  // components: {},
  computed: {
    recommendChannels () {
      return this.allChannels.filter(channel => {
        // 判断是否属于用户频道
        return !this.myChannels.find(userChannels => {
          // 查找满足该条件的元素
          return userChannels._id === channel._id
        })
      })
    }
  },
  // mounted: {},
  methods: {
    async getChannels () {
      const id = this.$store.state.user.userId
      try {
        const res = await getAllChannels(id)
        console.log(res)
        this.allChannels = res
      } catch (err) {
        console.log(err)
      }
    },
    editChanner (index, channel) {
      if (this.isEdit && (index !== 0)) {
        // 移除我的频道
        this.delChanner(index, channel)
      } else {
        this.switchChanner(index)
      }
    },
    async delChanner (index, channel) {
      console.log(channel)
      const id = channel._id
      this.myChannels.splice(index, 1)
      // TODO: 数据持久化
      if (this.$store.state.isLogin) {
        // 登录了，数据存储到线上
        try {
          const res = await unChannels(id)
          this.$toast({
            message: res.message,
            position: 'top'
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        // 没有登录，数据存储到本地
        setItem('user-channels', this.userChannels)
      }
    },
    switchChanner (index) {
      this.$emit('close')
      this.$emit('channerActive', index)
    },
    async addChannel (channel) {
      console.log(`channel:${channel}`)
      this.myChannels.push(channel)
      const id = channel._id
      console.log('id', channel._id)
      // TODO: 数据持久化
      if (this.$store.state.isLogin) {
        // 登录了，数据存储到线上
        try {
          const res = await addChannels(id)
          this.$toast({
            message: res.message,
            position: 'top'
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        // 没有登录，数据存储到本地
        setItem('user-channels', this.myChannels)
      }
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
        margin-top: 0;
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
