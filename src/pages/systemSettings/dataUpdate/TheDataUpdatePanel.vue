<template>
  <div class="row">
    <div class="col-4 offset-4">
      <q-list class="text-grey-9">
        <q-item dense>
          <q-item-section>{{ $t("systemSettings.dataUpdate.officialDishNumber") + officialDishNumber }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>{{ $t("systemSettings.dataUpdate.personalDishNumber") + personalDishNumber }}</q-item-section>
        </q-item>
        <q-item>
          <q-btn push color="teal-6" size="md" :label="$t('systemSettings.dataUpdate.syncDish')" @click="beginUpdate"/>
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
import { useI18n } from "vue-i18n";

const officialDishNumber = ref(0);
const personalDishNumber = ref(0);

const theUpdatingDialog = ref(null);

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
const { t } = useI18n();

const synchronizeDishes = async () => {
  const dialog = $q.dialog({
    title: t("systemSettings.dataUpdate.syncing"),
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
