<script setup lang="ts">
import { MenuInfo } from "../App.vue";
import { inject } from "vue";

const generateRandom = () => {
  if (window._random) {
    return window._random;
  }
  const MAX = 9000;
  const OFFSET = 1000;
  const res = Math.floor(Math.random() * MAX) + OFFSET;
  window._random = res;
  return res;
};
const random = generateRandom();

const menuInfo = inject<MenuInfo>('menuInfo');

</script>

<template>
  <!-- 价格、总数量、取货码 -->
  <!-- 订单汇总 -->
  <div>
    <van-row justify="space-between" align="center">
      <van-col span="8" class="txt-c"> 订单总价<div class="txt-c info-important" :style="{ color: '#1989fa' }">￥{{menuInfo!.menuPrice}}</div> </van-col>

      <van-col span="8" class="txt-c"> 总数量<div class="txt-c info-important">{{menuInfo!.totalCount}}</div> </van-col>

      <van-col span="8" class="txt-c"> 取货码<div class="txt-c info-important">{{random}}</div> </van-col>
    </van-row>
  </div>
</template>

<style scoped>
  .txt-c {
    text-align: center;
  }
  .info-important {
    font-weight: bold;
    color: #e93030;
    font-size: 20px;
    line-height: 24px;
  }
</style>
