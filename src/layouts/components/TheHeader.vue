<template>
  <q-header bordered class="bg-white row" style="border-radius: 10px">
    <q-toolbar class="col-4">
      <q-img v-if="useSoftwareInfoStore.isXZYCModel()" fit="fill" src="~/assets/logo.png" style="width: 113px; height: 35px;" @click="router.push('/')"/>
      <q-img v-if="useSoftwareInfoStore.isZHModel()" fit="fill" src="~/assets/logo-hz-1.png" style="width: 113px; height: 35px;" @click="router.push('/')"/>
      <q-img v-if="useSoftwareInfoStore.isZHModel()" fit="fill" src="~/assets/logo-hz-2.png" style="width: 113px; height: 35px;" @click="router.push('/')"/>
    </q-toolbar>
    <q-toolbar class="col-4">
      <q-toolbar-title class="text-teal-9 text-center">{{ useAppStore.pageTitle }}</q-toolbar-title>
    </q-toolbar>
    <q-toolbar class="col-4 q-gutter-md">
      <q-space/>
<!--      <q-btn v-if="Platform.is.win" label="远控设置" outline rounded color="teal-6" @click="setRemoteControlAddress"/>-->
      <q-btn v-if="useAppStore.backBtnShown" label="返回" outline rounded color="teal-6" @click="onBackBtnClick"/>
      <q-btn v-if="route.path ==='/dishSelect'" label="菜品同步" outline rounded color="teal-6"
             @click="synchronizeDishes"/>
      <q-btn label="一键收纳" outline rounded color="teal-6" @click="sendCommand('withdraw')"/>
      <TheMoreOperations/>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { UseAppStore } from "stores/appStore";
import { Dialog, Notify, Platform, useQuasar } from "quasar";
import TheMoreOperations from "layouts/components/TheMoreOperations.vue";
import { UseSettingStore } from "stores/settingStore";
import { sendCommand } from "layouts/components/command";
import { putAPI } from "src/api";
import { UseSoftwareInfoStore } from "stores/softwareInfoStore";

const router = useRouter();
const route = useRoute();
const useAppStore = UseAppStore();
const useSettingStore = UseSettingStore();
const useSoftwareInfoStore = UseSoftwareInfoStore();

const onBackBtnClick = () => {
  useAppStore.setIsBackFromDishEdit(true);
  router.push("/dishSelect");
};

const setRemoteControlAddress = () => {
  Dialog.create({
    title: "远程控制",
    message: "请输入远端设备的IP地址（当前地址：" + useSettingStore.middlePlatformIPAddress +
        "）。若无法得到远端IP地址：（1）将电脑有线网络的IP设置为192.168.6.100，子网掩码设置为255.255.255.0，网关设置为192.168.6.1；" +
        "（2）将电脑与树莓派用网线相连，在此处输入192.168.6.11。",
    prompt: {
      model: "",
      type: "text",
      color: "teal-6",
    },
    ok: {
      push: true,
      color: "teal-6",
      label: "确认",
    },
    class: "text-grey-9",
  }).onOk((data) => {
    useSettingStore.setMiddlePlatformIPAddress(data);
    Notify.create("请打开菜品选择观察页面是否为空？若为空请重新输入远端设备的IP地址。");
  });
};

const $q = useQuasar();

const synchronizeDishes = async () => {
  const dialog = $q.dialog({
    title: "同步中，请稍后...",
    progress: {
      // spinner: QSpinnerGears,
      color: "teal-6",
    },
    persistent: true,
    ok: false,
    focus: "none",
  }).onOk(() => {
    router.go(0);
  });

  try {
    const { newAddedDishesNumber, updatesDishesNumber, deletedDishesNumber } = await updateOfficialDishes();
    const {
      remoteNeedAddDishesNumber,
      remoteNeedUpdateDishesNumber,
      remoteNeedDeleteDishesNumber,
      localNeedAddDishesNumber,
      localNeedUpdateDishesNumber,
      localNeedDeleteDishesNumber,
    } = await synchronizePersonalDishes();
    dialog.update({
      title: "同步完成",
      message: "<div class='text-subtitle1'><span class='text-weight-bold text-teal-9'>官方菜品：</span>新增<span class='text-weight-bold text-teal-9'>" +
          newAddedDishesNumber +
          "</span>个，" +
          "更新<span class='text-weight-bold text-teal-9'>" + updatesDishesNumber + "</span>个，" +
          "删除<span class='text-weight-bold text-teal-9'>" + deletedDishesNumber + "</span>个；<br>" +
          "<span class='text-weight-bold text-teal-9'>我的菜品：</span>本地新增<span class='text-weight-bold text-teal-9'>" +
          localNeedAddDishesNumber +
          "</span>个，" +
          "更新<span class='text-weight-bold text-teal-9'>" + localNeedUpdateDishesNumber + "</span>个，" +
          "删除<span class='text-weight-bold text-teal-9'>" + localNeedDeleteDishesNumber + "</span>个；" +
          "远端新增<span class='text-weight-bold text-teal-9'>" + remoteNeedAddDishesNumber +
          "</span>个，" +
          "更新<span class='text-weight-bold text-teal-9'>" + remoteNeedUpdateDishesNumber + "</span>个，" +
          "删除<span class='text-weight-bold text-teal-9'>" + remoteNeedDeleteDishesNumber +
          "</span>个。</div>",
      html: true,
      progress: false,
      ok: {
        label: "确认",
        color: "teal-6",
        push: true,
      },
      focus: "none",
    });
  } catch (e) {
    dialog.hide();
  }
};

const updateOfficialDishes = async () => {
  try {
    const { data, message } = await putAPI("dataUpdater/update-officialDishes");
    return data;
  } catch (e) {
    console.log(e.toString());
  }
};

const synchronizePersonalDishes = async () => {
  try {
    const { data, message } = await putAPI("dataUpdater/synchronize-personalDishes");
    return data;
  } catch (e) {
    console.log(e.toString());
  }
};
</script>

<style lang="scss" scoped>

</style>
