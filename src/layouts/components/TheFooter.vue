<template>
  <q-footer bordered class="bg-white text-primary">
    <div class="row" @click="useAppStore.showRunningControl()">
      <q-toolbar class="col-4">
        <q-img fit="fill" src="~/assets/logo.png" style="width: 120px; height: 34px"></q-img>
      </q-toolbar>
      <q-toolbar class="col-4">
        <!--      <q-space/>-->
        <q-toolbar-title class="text-center">
          <q-spinner-dots
            v-if="useControllerStore.isRunning"
            color="teal-6"
            size="2em"
          />
          <span class="text-teal-6">&nbsp; {{ statusBarDisplay }} &nbsp;</span>
          <q-spinner-dots
            v-if="useControllerStore.isRunning"
            color="teal-6"
            size="2em"
          />
        </q-toolbar-title>
      </q-toolbar>

    </div>

  </q-footer>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";
import { computed } from "vue";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();

const statusBarDisplay = computed(() => {
  if (!useControllerStore.isRunning) return "待机等待"
  if (useControllerStore.isPausing) {
    return !useControllerStore.isPausingWithMovingFinished ? "中途加料：移动至加料位中" : "中途加料：现在可以加料";
  }
  if (!useControllerStore.isPausingWithMovingBackFinished) return "中途加料：恢复原位置中"
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

</style>
