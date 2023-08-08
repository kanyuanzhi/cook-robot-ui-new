<template>
  <q-footer bordered class="bg-grey-2 text-primary">
    <q-tabs no-caps active-color="teal-6" indicator-color="transparent" class="text-grey" v-model="tab">
      <q-route-tab name="home" to="/">
        <template v-slot:default>
          <span><q-icon name="fa-solid fa-house" size="18px"/></span>
          <span class="q-mt-xs" style="font-size: 9px">主页</span>
        </template>
      </q-route-tab>
      <q-route-tab name="select" to="/dishSelect">
        <template v-slot:default>
          <span><q-icon name="fa-solid fa-bowl-food" size="19px"/></span>
          <span class="q-mt-xs" style="font-size: 9px">菜品</span>
        </template>
      </q-route-tab>
      <q-route-tab name="control" to="/dishEdit" >
        <template v-slot:default>
          <span><q-icon name="local_fire_department" size="23px"/></span>
          <div class="q-mt-xs" style="font-size: 9px">控制</div>
        </template>
      </q-route-tab>
      <q-route-tab name="edit" to="/dishEdit">
        <template v-slot:default>
          <span><q-icon name="edit" size="23px"/></span>
          <div class="q-mt-xs" style="font-size: 9px">制作</div>
        </template>
      </q-route-tab>
      <q-route-tab name="settings" to="/dishEdit">
        <template v-slot:default>
          <span><q-icon name="settings" size="23px"/></span>
          <div class="q-mt-xs" style="font-size: 9px">设置</div>
        </template>
      </q-route-tab>
    </q-tabs>
<!--    <div class="row" @click="useAppStore.showRunningControl()">-->
<!--      <q-toolbar class="col-12">-->
<!--        <q-toolbar-title class="text-center">-->
<!--          <q-spinner-dots-->
<!--            v-if="useControllerStore.isRunning"-->
<!--            color="teal-6"-->
<!--            size="2em"-->
<!--          />-->
<!--          <span class="text-teal-6">&nbsp; {{ statusBarDisplay }} &nbsp;</span>-->
<!--          <q-spinner-dots-->
<!--            v-if="useControllerStore.isRunning"-->
<!--            color="teal-6"-->
<!--            size="2em"-->
<!--          />-->
<!--        </q-toolbar-title>-->
<!--      </q-toolbar>-->

<!--    </div>-->

  </q-footer>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";
import { computed, ref } from "vue";

const tab = ref("home")

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
