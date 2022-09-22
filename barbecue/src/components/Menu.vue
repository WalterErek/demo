<script setup lang="ts">
import { ref } from "vue";
import { MenuItem } from "../App.vue";

const props = defineProps<{ menu: MenuItem[] }>();
const emit = defineEmits(["handle-desc", "handle-inc"]);

const activeTabIndex = ref(0);
const switchTab = (index: number) => {
  activeTabIndex.value = index;
};
</script>

<template>
  <van-tabs v-model:active="activeTabIndex" type="card" sticky>
    <van-tab v-for="(item, index) in menu" :title="item.name"
      >
      <ul
        class="menu"
        v-for="(item, index) in menu"
        :key="index"
        v-show="activeTabIndex === index"
      >
        <li
          class="menu-item"
          v-for="(subitem, subindex) in item.list"
          :key="subitem.name"
        >
          <van-badge position="top-left">
            <div>{{ subitem.name }}</div>
            <template #content v-if="subitem.badge">
              {{subitem.badge}}
            </template>
          </van-badge>
          
          <div>单价：￥{{ subitem.price }}</div>
          <van-stepper v-model="subitem.count" theme="round" min="0" integer />
        </li>
      </ul>
    </van-tab>
  </van-tabs>
</template>

<style scoped>
.van-stepper {
  text-align: right;
}
.menu {
  padding: 0 16px;
}
.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid #f5f5f5;
}
.menu-item > div {
  width: 30%;
  line-height: 30px;
}

</style>
