<template>
  <div class="row">
    <div class="col-6 offset-3">
      <q-list class="text-grey-9">
        <q-item dense>
          <q-item-section>软件名称：{{ softwareInfo.name }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>软件版本：{{ softwareInfo.version }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>设备型号：{{ softwareInfo.machineModel }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>设备序列号：{{ softwareInfo.serialNumber }}</q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>更新日期：{{ formattedTime }}</q-item-section>
        </q-item>
        <q-item>
          <q-btn v-if="!isCheckPassed" push color="teal-6" size="md" @click="check" :disable="isChecking">
            <q-spinner-ios
                v-if="isChecking"
                color="white"
                size="0.7em"
                class="q-mr-md"
            />
            检查更新
          </q-btn>
          <q-btn v-else push color="teal-6" size="md" label="开始更新" @click="beginUpdate"/>
        </q-item>
      </q-list>
      <TheUpdatingDialog ref="theUpdatingDialog"/>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { checkUpdateInfo, checkUpdatePermission, getQrCode, getSoftwareInfo } from "src/api/system";
import { Notify } from "quasar";
import { date } from "quasar";
import TheUpdatingDialog from "pages/systemSettings/softwareUpdate/TheUpdatingDialog.vue";
import { getAPI } from "src/api";
import { has } from "lodash/object";

const {
  extractDate,
  formatDate,
} = date;

const softwareInfo = ref({});

const QrImage = ref("");
const theUpdatingDialog = ref(null);

const isCheckPassed = ref(false);
const isChecking = ref(false);

onMounted(async () => {
  try {
    const { data } = await getAPI("softwareUpdater/get-softwareInfo");
    softwareInfo.value = data;
  } catch (e) {
    Notify.create(e);
  }
});

const formattedTime = computed(() => {
  return formatDate(softwareInfo.value.updateTime, "YYYY-MM-DD HH:mm:ss");
});

const check = async () => {
  isChecking.value = true;
  try {
    const { data } = await getAPI("softwareUpdater/check-updateInfo");
    const { isLatest, latestVersion, hasFile } = data;
    if (isLatest) {
      Notify.create({
        message: "当前已是最新版本，无需更新",
        type: "warning",
      });
    } else if (!hasFile) {
      Notify.create({
        message: "正在准备更新包，请稍后重试",
        type: "warning",
      });
    } else {
      isCheckPassed.value = true;
      Notify.create("有新版本" + latestVersion + "可以更新，请点击下方“开始更新”按钮");
    }
  } catch (e) {
    Notify.create({
      message: "检查更新失败",
      type: "warning",
    });
    console.log(e.toString());
  }
  isChecking.value = false;
};

const beginUpdate = async () => {
  try {
    const { data } = await getAPI("softwareUpdater/check-updatePermission");
    const { isRunning, isUpdating, isPermitted } = data;
    if (!isPermitted) {
      Notify.create({
        message: "机器运行中，请稍后更新",
        type: "warning",
      });
      return;
    }
    theUpdatingDialog.value.show();
  } catch (e) {
    console.log(e.toString());
  }
};
</script>

<style lang="scss" scoped>
</style>
