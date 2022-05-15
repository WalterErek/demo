<script setup lang="ts">
import { inject } from "vue";

const props = defineProps<{
  menuPrice: number;
}>();
const emit = defineEmits(["handle-next", "handle-history", "handle-clear"]);

// 提交
const onSubmit = () => {
  emit("handle-next");
};

// 导入历史订单
const onGetHistory = () => {
  emit("handle-history");
};
// 清空
const onClear = () => {
  emit("handle-clear");
};
</script>

<template>
  <van-divider>江南府东门烧烤版权所有</van-divider>
  <!-- 底部按钮 -->
  <van-submit-bar
    :price="menuPrice * 100"
    :decimal-length="0"
    button-text="生成订单"
    @submit="onSubmit"
  >
    <template #tip>
      <span style="color: #1989fa" @click="onGetHistory">一键导入历史订单</span> &nbsp;
      <span style="color: #e93030" @click="onClear">清空</span>
    </template>
  </van-submit-bar>
</template>

<style scoped>
[data-adapter="iphoneAdapter"] .van-submit-bar {
  padding-bottom: 34px;
}
</style>
