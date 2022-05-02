<script setup lang="ts">
import Menu from "./components/Menu.vue";
import Order from "./components/Order.vue";
import Footer from "./components/Footer.vue";
import { menuConfig, LS_KEY } from "./assets/js/config";

import { reactive, ref, computed, provide } from "vue";

export interface MenuListItem {
  name: string;
  price: number;
  count: number;
}
export interface MenuItem {
  name: string;
  list: MenuListItem[];
}
export interface MenuInfo {
  menuPrice: number;
  totalCount: number;
}
interface Menu {
  data: MenuItem[]
}

// 步骤
const step = ref<number>(0);
const handlePrev = () => {
  if (step.value > 0) {
    step.value--;
  }
};
const handleNext = () => {
  if (step.value < 1) {
    step.value++;
  }
};

const copyMenuConfig = JSON.parse(JSON.stringify(menuConfig));

// 菜单
let menu: Menu = {
  data: reactive(menuConfig)
};
// 用户选择的菜单
const customerMenu = computed(() => {
  let menuArr: MenuListItem[] = [];
  for (let item of menu.data) {
    const { list } = item;
    list.forEach((subitem: MenuListItem) => {
      subitem.count > 0 && menuArr.push(subitem);
    });
  }
  return menuArr;
});
// 用户菜单汇总信息，价格和总数量
const menuInfo = computed<MenuInfo>(() => {
  let menuPrice: number = 0;
  let totalCount: number = 0;
  customerMenu.value.forEach(({ count, price }) => {
    menuPrice += count * price;
    totalCount += count;
  });
  return {
    menuPrice,
    totalCount,
  };
});

const handleHistory = () => {
  const history = localStorage.getItem(LS_KEY);
  if (!history) {
    return;
  }
  try {
    const historyArr = JSON.parse(history);
    
  } catch {}
  // localStorage.removeItem(LS_KEY);
};
const handleClear = () => {
  // menu.data = reactive(copyMenuConfig);
  for (let item of menu.data) {
    const { list } = item;
    list.forEach((subitem: MenuListItem) => {
      subitem.count > 0 && (subitem.count = 0);
    });
  }
};

provide("menuInfo", menuInfo);

// 调整数量
const handleDec = (subitem: MenuListItem) => {
  if (subitem.count <= 0) {
    return;
  }
  subitem.count--;
};
const handleInc = (subitem: MenuListItem) => {
  subitem.count++;
};
</script>

<template>
  <van-notice-bar
    left-icon="volume-o"
    text="菜单仅供挑选食材，选择口味及计算金额，无法下单支付，请将提交后的订单明细页面发到群内@淡定情绪（老板）即可。"
  />
  <Menu
    v-if="step === 0"
    :menu="menu.data"
    @handle-desc="handleDec"
    @handle-inc="handleInc"
  />

  <Order v-else :customerMenu="customerMenu" @handle-prev="handlePrev" />

  <Footer
    :menuPrice="menuInfo.menuPrice"
    v-if="step === 0"
    @handle-next="handleNext"
    @handle-history="handleHistory"
    @handle-clear="handleClear"
  />
</template>

<style>
body {
  font-size: 15px;
  padding: 0px 16px 64px;
  -webkit-overflow-scrolling: touch;
  user-select: none;
  -webkit-user-select: none;
}
.van-notice-bar {
  margin: 0 -16px;
}
</style>
