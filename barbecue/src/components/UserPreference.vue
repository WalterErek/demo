<script setup lang="ts">
import { ref, computed } from "vue";

// 送餐地点
const place = ref('1');

// 用户口味偏好
const flavour = ["不辣", "微微辣", "微辣", "中辣", "重辣", "变态辣"];
const RANGE = 100;

const sliderValue = ref(0);
const btnText = computed(() => flavour[sliderValue.value / RANGE * 5]);

</script>

<template>
  <div class="user-preference">
    <van-row justify="space-between" align="center" style="margin: 0 -4px;">
      <van-col span="14">
        <van-icon name="fire" color="#e93030" /> 辣度：<span style="color: #e93030; font-size: 20px;">{{ btnText }}</span>
        <van-slider v-model="sliderValue" active-color="#ee0a24" :step="20"></van-slider>
      </van-col>

      <van-col span="8">
        <van-icon name="location" color="#1989fa" /> 取餐方式:
        <van-radio-group v-model="place">
          <van-radio name="1">送至东门超市</van-radio>
          <van-radio name="2">烧烤摊自提</van-radio>
        </van-radio-group>
      </van-col>
    </van-row>
    
  </div>
</template>

<style scoped>
.van-slider {
  margin-top: 10px;
}
.user-preference {
  margin: 12px 0;
}
</style>
