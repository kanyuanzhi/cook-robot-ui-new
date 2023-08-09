<template>
  <q-header bordered class="bg-white row" style="border-radius: 10px">
    <q-toolbar class="col-3">
      <q-img fit="fill" src="~/assets/logo.png" style="width: 113px; height: 35px;" @click="router.push('/')"/>
    </q-toolbar>
    <q-toolbar class="col-7">
      <q-toolbar-title class="text-center scan-effect">
        <span class="text-teal-6 text-subtitle2 text">{{ statusBarDisplay }}</span>
        <div v-if="useControllerStore.isRunning" class="light"></div>
      </q-toolbar-title>
    </q-toolbar>
    <q-toolbar class="col-2">
      <q-space/>
      <q-btn flat icon="crop_free" color="teal-6" @click="router.push('/mobile/scan')"/>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import TheSystemSetting from "layouts/components/TheSystemSetting.vue";
import { UseAppStore } from "stores/appStore";
import { computed } from "vue";
import { UseControllerStore } from "stores/controllerStore";

const router = useRouter();
const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();

const statusBarDisplay = computed(() => {
  if (!useControllerStore.isRunning) return "待机等待";
  if (useControllerStore.isPausing) {
    return !useControllerStore.isPausingWithMovingFinished ? "中途加料：移动至加料位中" : "中途加料：现在可以加料";
  }
  if (!useControllerStore.isPausingWithMovingBackFinished) return "中途加料：恢复原位置中";
  switch (useControllerStore.currentCommandName) {
    case "cook":
      return "炒制" + useAppStore.runningDish.name + "中";
    case "wash":
      return "清洗中";
    case "pour":
      return "倒水中";
    case "reset":
      return "复位中";
    case "prepare":
      return "备菜中";
    case "dish_out":
      return "出菜中";
    default:
      return "状态错误";
  }
});
</script>

<style lang="scss" scoped>
.scan-effect {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.text {
  font-weight: bold;
  //background-color: #3498db;
  color: #ffffff;
}

.light {
  position: absolute;
  bottom: 0;
  left: -100%;
  width: 100%;
  height: 5%;
  background: linear-gradient(to right,
    rgba(0, 150, 136, 0),
    rgba(0, 150, 136, 0.2),
    rgba(0, 150, 136, 0.5),
    rgba(0, 150, 136, 0.7),
    rgba(0, 150, 136, 0.5),
    rgba(0, 150, 136, 0.2),
    rgba(0, 150, 136, 0) 100%);
  animation: scan 1.5s linear infinite;
}

@keyframes scan {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
