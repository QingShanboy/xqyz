<!--  -->
<template>
  <div class="user-container">
    <div class="user-bg">
      <div class="user-bg-warp">
        <div class="profile">
          <div class="userInfo">
            <van-cell-group  :border="false">
              <van-cell
               title="单元格"
               center
              >
                <van-image
                  slot="icon"
                  width="60"
                  height="60"
                  round
                  fit="cover"
                  :src="user.headPhoto"
                />
                <div slot="title">{{user.name}}</div>
                <van-button
                  class="update-btn"
                  :border="false"
                  size="small"
                  round
                  to="/PersonalData"
                >
                  个人资料
                </van-button>
              </van-cell>
              <van-grid
                :border="false"
                class="user-info-grid"
                >
                <van-grid-item class="info-grid-data">
                  <div slot="text" class="text-warp">
                    <div class="span">1</div>
                    <div class="text">头条 </div>
                  </div>
                </van-grid-item>
                <van-grid-item class="info-grid-data">
                  <div slot="text"  class="text-warp">
                    <div class="span">2</div>
                    <div class="text">关注</div>
                  </div>
                </van-grid-item>
                <van-grid-item class="info-grid-data">
                  <div slot="text" class="text-warp">
                    <div class="span">99</div>
                    <div class="text">获赞</div>
                  </div>
                </van-grid-item>
                <van-grid-item class="info-grid-data">
                  <div slot="text" class="text-warp">
                    <div class="span">288</div>
                    <div class="text">粉丝 </div>
                  </div>
                </van-grid-item>
              </van-grid>
            </van-cell-group>
          </div>
        </div>
      </div>
        <div class="user-news">
          <van-cell title="消息通知" is-link to="" />
          <van-cell title="收藏" is-link to="" />
          <van-cell title="历史" is-link to="" />
        </div>
        <div class="user-set">
          <van-cell title="设置" is-link to="" />
          <van-cell title="意见反馈" is-link to="" />
          <van-cell class="logout-cell" title="退出登录" is-link to="" />
        </div>
    </div>
  </div>
</template>

<script>
import { getUser } from '@/api/users'
export default {
  name: 'MyIndex',
  data () {
    return {
      user: {
        name: '',
        genders: '',
        headPhoto: '',
        addr: '',
        signature: '',
        birthday: ''
      }
    }
  },

  // components: {},

  // computed: {},

  mounted () {
    this.onGetUser()
  },
  methods: {
    async onGetUser () {
      const id = this.$store.state.user.userId
      try {
        const res = await getUser(id)
        // console.log(res)
        this.user = res
      } catch (err) {
        console.log(err)
      }
    }
  }
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
          display:flex;
          justify-content:center;
          align-items:center;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
          width: 100%;
          height: 100%;
          .userInfo {
            width: 95%;
            height: 95%;
            .user-info-grid {
              .info-grid-data {
                .text-warp {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  .span {
                    font-size:18px
                  }
                  .text {
                    font-size:12px
                  }
                }
              }
            }
            .update-btn {
              border: none;
            }
          }
        }
      }
      .user-news{
        width: 100%;
        height: 150px;
        position: absolute;
        left: 0;
        top: 220px;

      }
      .user-set {
        width: 100%;
        height: 150px;
        position: absolute;
        left: 0;
        top: 380px;
        .logout-cell {
          margin-top: 15px;
          text-align: center;
          font-size: 18px;
          color: red;
        }
      }
    }
  }
</style>
