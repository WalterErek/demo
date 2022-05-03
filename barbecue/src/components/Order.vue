<script setup lang="ts">
import { computed } from "vue";
import { MenuListItem } from "../App.vue";
import UserPreference from "../components/UserPreference.vue";
import OrderInfo from "../components/OrderInfo.vue";
import html2canvas from 'html2canvas';
import { Toast } from "vant";

const props = defineProps<{ customerMenu: MenuListItem[] }>();
const emit = defineEmits(["handle-prev"]);
const isEmpty = computed(() => {
  return props.customerMenu.length === 0;
});

const onScreenshot = () => {
  html2canvas(document.querySelector('#app')!).then(function (canvas) {
    const base64 = canvas.toDataURL("image/jpeg", 0.3);
    window.clipboard(base64, () => {
      Toast.success('复制成功，快去粘贴把吧~');
    }, () => {
      Toast.fail('复制失败，请自己截图~')
    });
  });
};
</script>
;

<template>
  <!-- 导航栏 -->
  <van-nav-bar
    title="订单详情"
    left-text="返回"
    right-text="生成截图"
    left-arrow
    fixed
    @click-left="$emit('handle-prev')"
    @click-right="onScreenshot"
  />

  <section class="func-zone" v-if="!isEmpty">
    <!-- 用户偏好 -->
    <UserPreference />

    <van-divider :style="{ borderColor: '#ccc' }" />

    <!-- 订单汇总 -->
    <OrderInfo />
  </section>

  <!-- 订单明细 -->
  <h3 v-if="!isEmpty" style="margin-top: 8px">订单明细</h3>

  <div class="empty" v-if="isEmpty">
    <van-empty description="空空如也~"></van-empty>
  </div>

  <ul v-for="(item, index) in customerMenu" :key="index">
    <li class="order-item">
      <div>{{ item.name }}</div>
      <div>
        数量：<span style="font-weight: bold; color: #e93030">{{
          item.count
        }}</span>
      </div>
      <div>单价：{{ item.price }}</div>
      <div>总价：{{ item.price * item.count }}</div>
    </li>
  </ul>
</template>

<style scoped>
/* .empty {
  font-size: 26px;
  width: 100%;
  text-align: center;
  line-height: 100px;
} */

.func-zone {
  background-color: #f5f5f5;
  margin: 0 -16px;
  padding: 8px 16px;
}

.custom {
  position: fixed;
  left: 16px;
  top: 8px;
  display: flex;
  justify-content: space-between;
}

.order-head {
  padding: 4px;
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
}
.order-item {
  display: flex;
  justify-content: center;
  align-items: center;
}
.order-item > div {
  width: 20%;
}
.order-item > div:nth-of-type(1) {
  width: 40%;
}
</style>
