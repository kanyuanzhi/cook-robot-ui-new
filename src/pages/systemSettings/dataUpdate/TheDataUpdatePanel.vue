<template>
  <div class="row">
    <div class="col-4 offset-4">
      <q-list class="text-grey-9">
        <q-item dense>
          <q-item-section>官方菜品数量：{{ officialDishNumber }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>我的菜品数量：{{ personalDishNumber }}</q-item-section>
        </q-item>
        <q-item>
          <q-btn push color="teal-6" size="md" label="同步菜品" @click="beginUpdate"/>
        </q-item>
      </q-list>
      <TheUpdatingDialog ref="theUpdatingDialog"/>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { checkUpdateInfo, checkUpdatePermission, getQrCode, getSoftwareInfo } from "src/api/system";
import { Notify, useQuasar } from "quasar";
import { date } from "quasar";
import TheUpdatingDialog from "pages/systemSettings/softwareUpdate/TheUpdatingDialog.vue";
import { getAPI, putAPI } from "src/api";
import { has } from "lodash/object";
import router from "src/router";

const {
  extractDate,
  formatDate,
} = date;

const officialDishNumber = ref(0);
const personalDishNumber = ref(0);

const QrImage = ref("");
const theUpdatingDialog = ref(null);

const isCheckPassed = ref(false);
const isChecking = ref(false);

onMounted(async () => {
  await getDishesNumber();
});

const beginUpdate = async () => {
  await synchronizeDishes();
  await getDishesNumber();
};

const getDishesNumber = async () => {
  try {
    const officialDishNumberData = await getAPI("dish/count", {
      enableCuisineFilter: false,
      cuisineFilter: "",
      isOfficial: true,
    });
    officialDishNumber.value = officialDishNumberData.data.count;
    const personalDishNumberData = await getAPI("dish/count", {
      enableCuisineFilter: false,
      cuisineFilter: "",
      isOfficial: false,
    });
    personalDishNumber.value = personalDishNumberData.data.count;
  } catch (e) {
    Notify.create(e);
  }
};

const $q = useQuasar();

const synchronizeDishes = async () => {
  const dialog = $q.dialog({
    title: "同步中，请稍后...",
    progress: {
      // spinner: QSpinnerGears,
      color: "teal-6",
    },
    persistent: true, // we want the user to not be able to close it
    ok: false, // we want the user to not be able to close it
  }).onOk(() => {
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
