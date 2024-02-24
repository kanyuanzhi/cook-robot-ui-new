<template>
  <q-header bordered class="bg-white row" style="border-radius: 10px">
    <q-toolbar class="col-4">
      <q-img v-if="useSoftwareInfoStore.isXZYCModel()" fit="fill" src="~/assets/logo.png"
             style="width: 113px; height: 35px;" @click="router.push('/')"/>
      <q-img v-if="useSoftwareInfoStore.isHZModel()" fit="fill" src="~/assets/logo-hz-1.png"
             style="width: 113px; height: 35px;" @click="router.push('/')"/>
      <!--      <q-img v-if="useSoftwareInfoStore.isHZModel()" fit="fill" src="~/assets/logo-hz-2.png" style="width: 113px; height: 35px;" @click="router.push('/')"/>-->
      <q-btn v-if="route.path ==='/dishSelect'" :label="$t('header.search')" outline rounded color="teal-6" class="q-ml-md"
             @click="theSearchDialog.show()"/>
    </q-toolbar>
    <q-toolbar class="col-4">
      <q-toolbar-title class="text-teal-9 text-center" @dblclick="useAppStore.shiftIsTest()">{{ useAppStore.pageTitle }}</q-toolbar-title>
    </q-toolbar>
    <q-toolbar class="col-4 q-gutter-md">
      <q-space/>
      <!--      <q-btn v-if="Platform.is.win" label="远控设置" outline rounded color="teal-6" @click="setRemoteControlAddress"/>-->
      <q-btn v-if="useAppStore.backBtnShown" :label="$t('header.back')" outline rounded color="teal-6"
             @click="onBackBtnClick"/>
      <q-btn v-if="route.path ==='/dishSelect'" :label="$t('header.dishSync')" outline rounded color="teal-6"
             @click="synchronizeDishes"/>
      <q-btn :label="$t('header.withdraw')" outline rounded color="teal-6" @click="sendCommand('withdraw')"/>
      <TheMoreOperations/>
    </q-toolbar>
    <TheSearchDialog ref="theSearchDialog"/>
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
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import TheSearchDialog from "layouts/components/TheSearchDialog.vue";

const router = useRouter();
const route = useRoute();
const useAppStore = UseAppStore();
const useSettingStore = UseSettingStore();
const useSoftwareInfoStore = UseSoftwareInfoStore();

const theSearchDialog = ref(null);


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
const { t } = useI18n();

const synchronizeDishes = async () => {
  const dialog = $q.dialog({
    title: t("systemSettings.dataUpdate.syncing"),
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
      title: t("systemSettings.dataUpdate.syncFinished"),
      message: "<div class='text-subtitle1'><span class='text-weight-bold text-teal-9'>" +
          t("systemSettings.dataUpdate.officialDish") + "</span>" +
          t("systemSettings.dataUpdate.add") + "<span class='text-weight-bold text-teal-9'>" + newAddedDishesNumber +
          "</span>" + t("systemSettings.dataUpdate.unit") +
          t("systemSettings.dataUpdate.update") + "<span class='text-weight-bold text-teal-9'>" + updatesDishesNumber +
          "</span>" + t("systemSettings.dataUpdate.unit") +
          t("systemSettings.dataUpdate.delete") + "<span class='text-weight-bold text-teal-9'>" + deletedDishesNumber +
          "</span>" + t("systemSettings.dataUpdate.unit") + "<br>" +
          "<span class='text-weight-bold text-teal-9'>" +
          t("systemSettings.dataUpdate.personalDish") + "</span>" +
          t("systemSettings.dataUpdate.localAdd") + "<span class='text-weight-bold text-teal-9'>" +
          localNeedAddDishesNumber +
          "</span>" + t("systemSettings.dataUpdate.unit") +
          t("systemSettings.dataUpdate.update") + "<span class='text-weight-bold text-teal-9'>" +
          localNeedUpdateDishesNumber +
          "</span>" + t("systemSettings.dataUpdate.unit") +
          t("systemSettings.dataUpdate.delete") + "<span class='text-weight-bold text-teal-9'>" +
          localNeedDeleteDishesNumber +
          "</span>" + t("systemSettings.dataUpdate.unit") +
          t("systemSettings.dataUpdate.remoteAdd") + "<span class='text-weight-bold text-teal-9'>" +
          remoteNeedAddDishesNumber +
          "</span>" + t("systemSettings.dataUpdate.unit") +
          t("systemSettings.dataUpdate.update") + "<span class='text-weight-bold text-teal-9'>" +
          remoteNeedUpdateDishesNumber +
          "</span>" + t("systemSettings.dataUpdate.unit") +
          t("systemSettings.dataUpdate.delete") + "<span class='text-weight-bold text-teal-9'>" +
          remoteNeedDeleteDishesNumber +
          "</span>" + t("systemSettings.dataUpdate.unit") + "</div>",
      html: true,
      progress: false,
      ok: {
        label: t("common.confirm"),
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
