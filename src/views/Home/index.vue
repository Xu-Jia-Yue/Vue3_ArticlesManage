<script setup>
import tx from '@/assets/image/default.png'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import { useArticleStore } from '@/stores/useArticleStore'
import { useChannelsStore } from '@/stores/useChannelsStore'
import NumberAnimation from 'vue-number-animation'
import * as echarts from 'echarts'
import { onMounted } from 'vue'
const userInfoStore = useUserInfoStore()
const articleStore = useArticleStore()
const channelsStore = useChannelsStore()

// 数字滚动格式化
const theFormat = (num) => {
  return parseInt(num)
}

onMounted(() => {
  channelsStore.getChannelsList()
  articleStore.getArticlesList()
  const myChart = echarts.init(document.querySelector('#echart'))
  // 绘制图表
  myChart.setOption({
    title: {
      text: '数据展示'
    },
    tooltip: {},
    xAxis: {
      data: ['文章数', '分类数', '访问量']
    },
    yAxis: {},
    series: [
      {
        name: '文章数',
        type: 'bar',
        data: [articleStore?.total || 8, channelsStore.channelsList?.length || 6, 20]
      }
    ]
  })
})
</script>

<template>
  <div class="home">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="pageDetail">
            <!-- 用户信息 -->
            <div class="userInfo">
              <img :src="userInfoStore.userInfo.user_pic || tx" alt="" />
              <div class="info">
                <h3 style="text-align: center">大事件</h3>
                <p style="color: gray">
                  {{ userInfoStore.userInfo.nickname || userInfoStore.userInfo.username }} |
                  {{ userInfoStore.userInfo.email || '暂未设置' }}
                </p>
              </div>
            </div>
            <div class="detailNum">
              <div class="item">
                <p class="numName">文章数</p>
                <span class="num">
                  <NumberAnimation
                    ref="number1"
                    :from="0"
                    :to="articleStore.total"
                    :duration="0.5"
                    :format="theFormat"
                    easing="linear"
                  />
                </span>
              </div>
              <div class="item">
                <p class="numName">分类数</p>
                <span class="num">
                  <NumberAnimation
                    ref="number1"
                    :from="0"
                    :to="channelsStore.channelsList?.length"
                    :duration="1"
                    :format="theFormat"
                    easing="linear"
                  />
                </span>
              </div>
              <div class="item">
                <p class="numName">访问量</p>
                <span class="num">
                  <NumberAnimation
                    ref="number1"
                    :from="0"
                    :to="20"
                    :duration="1"
                    :format="theFormat"
                    easing="linear"
                  />
                </span>
              </div>
            </div>
            <div id="echart">图表出口</div>
          </div>
        </el-col>
        <!-- 日历 -->

        <el-col :span="12"><el-calendar :range="[new Date(2024, 1, 1), new Date()]" /> </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.home {
  .pageDetail {
    .userInfo {
      display: flex;
      img {
        width: 100px;
        height: 100px;
        border-radius: 20px;
        margin: 10px;
      }
      .info {
        margin-left: 30px;
      }
    }
    .detailNum {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
      .item {
        width: 100px;
        height: 80px;
        display: flex;
        flex-direction: column;
        .numName {
          color: gray;
          font-weight: bold;
          font-size: 15px;
        }
        .num {
          font-size: 26px;
          font-weight: bold;
          text-align: center;
        }
        p {
          text-align: center;
        }
      }
    }
    #echart {
      width: 500px;
      height: 300px;
      margin: 50px auto 0px;
    }
  }
}
</style>
