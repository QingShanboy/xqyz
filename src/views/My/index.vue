<!--  -->
<template>
  <div class="user-container">
    <div class="user-bg">
      <div class="user-bg-warp">
        <div class="profile">
          <div class="userInfo">
            <van-cell-group>
              <van-cell
               title="单元格"
               value="内容"
               center
              >
                <van-image
                  slot="icon"
                  width="60"
                  height="60"
                  round
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div slot="title">昵称</div>
              </van-cell>
              <van-grid>
                <van-grid-item>
                  <div slot="text">
                    <div class="span">1</div>
                    <div class="text">头条 </div>
                  </div>
                </van-grid-item>
                <van-grid-item>
                  <div slot="text">
                    <div class="span">2</div>
                    <div class="text">关注</div>
                  </div>
                </van-grid-item>
                <van-grid-item>
                  <div slot="text">
                    <div class="span">99</div>
                    <div class="text">获赞</div>
                  </div>
                </van-grid-item>
                <van-grid-item>
                  <div slot="text">
                    <div class="span">288</div>
                    <div class="text">粉丝 </div>
                  </div>
                </van-grid-item>
              </van-grid>
            </van-cell-group>
          </div>
        </div>
      </div>
    </div>
    <div class="user-set">
      <van-cell title="URL 跳转" is-link url="/vant/mobile.html" />
      <van-cell title="路由跳转" is-link to="index" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyIndex',
  data () {
    return {
    }
  },

  // components: {},

  // computed: {},

  // mounted: {},

  methods: {}
}

</script>
<style lang='less' scoped>
  .user-container {
    .user-bg {
      height: 120px;
      border-radius: 0 0 50% 50%;
      background-color: #00CED1;
      position: relative;
      z-index: 0;
      .user-bg-warp {
        width: 100%;
        height: 200px;
        padding: 16px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 100;
        box-sizing: border-box;
        .profile {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          width: 100%;
          height: 100%;
          // .userInfo {
          // }
        }
      }
    }
    .user-set {
        width: 100%;
        height: 180px;
        margin: 100px 0;
    }
  }
</style>
