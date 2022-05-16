<script setup lang="ts">
import { computed, ref } from "vue";
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

// 保存结果的base64
const orderResImg = ref('');
// 是否展示弹窗
const show = ref(false);

const onScreenshot = () => {
  html2canvas(document.querySelector('.cont')!).then(function (canvas) {
    const base64 = canvas.toDataURL("image/jpeg", 0.3);
    orderResImg.value = base64;
    show.value = true;
    Toast.success('请长按图片去保存吧~');
  });
};
</script>

<template>
  <!-- 导航栏 -->
  <van-nav-bar
    title="订单详情"
    left-text="修改订单"
    right-text="生成截图"
    left-arrow
    fixed
    @click-left="$emit('handle-prev')"
    @click-right="onScreenshot"
  />

  <!-- 内容区 -->
  <div class="cont">
    <section class="func-zone card-wrap" v-if="!isEmpty">
      <!-- 用户偏好 -->
      <UserPreference />

      <van-divider :style="{ borderColor: '#ccc' }" />

      <!-- 订单汇总 -->
      <OrderInfo />
    </section>

    <section class="order-detail card-wrap">
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
    </section>
  </div>

  <!-- 保存结果弹窗 -->
  <van-overlay :show="show" @click="show = false" :lock-scroll="true">
    <div id="order-res-img" v-if="orderResImg">
      <img :src="orderResImg" alt="截图" @click.stop>
    </div>
  </van-overlay>
</template>

<style scoped>
#order-res-img {
  width: 80%;
  margin: 10vw auto;
  height: calc(100vh - 20vw);
  box-sizing: border-box;
  overflow-y: auto;
}

#order-res-img img {
  width: 100%;
  border-radius: 8px;
  display: block;
}

.cont {
  padding: 0 8px 16px;
}

.card-wrap {
  background-color: #f5f5f5;
  padding: 8px 16px;
  border-radius: 16px;
}

.func-zone {
  margin-top: 12px;
}

.custom {
  position: fixed;
  left: 16px;
  top: 8px;
  display: flex;
  justify-content: space-between;
}

.order-detail {
  margin-top: 12px;
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
