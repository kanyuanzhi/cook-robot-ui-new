<template>
  <div class="row">
    <div class="col-4 offset-4">
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

const {
  extractDate,
  formatDate
} = date;

const softwareInfo = ref({});

const QrImage = ref("");
const theUpdatingDialog = ref(null);

const isCheckPassed = ref(false);
const isChecking = ref(false);

onMounted(async () => {
  try {
    const versionData = await getSoftwareInfo();
    softwareInfo.value = versionData.data.data;
    const qrCodeData = await getQrCode();
    if (qrCodeData.data.message === "success") {
      QrImage.value = qrCodeData.data.data;
    } else {
      Notify.create("获取二维码失败，请将设备连接wifi，并保证手机与设备在同一wifi下");
    }
  } catch (e) {
    Notify.create(e);
  }
});

const formattedTime = computed(() => {
  return formatDate(softwareInfo.value.updateTime, "YYYY-MM-DD HH:mm:ss");
});

const check = async () => {
  isChecking.value = true;
  const { data } = await checkUpdateInfo();
  isChecking.value = false;
  if (data.message === "error") {
    console.log(data)
    Notify.create("检查更新失败");
  } else {
    if (data.data.isLatest) {
      Notify.create("当前已是最新版本，无需更新");
    } else if (!data.data.hasFile) {
      Notify.create("正在准备更新包，请稍后");
    } else {
      isCheckPassed.value = true;
      Notify.create("有新版本" + data.data.latestVersion + "可以更新，请点击开始更新");
    }
  }
};

const beginUpdate = async () => {
  const { data } = await checkUpdatePermission();
  if (!data.data.isPermitted) {
    Notify.create("机器运行中，请稍后更新");
    return;
  }
  theUpdatingDialog.value.show();
};
</script>

<style lang="scss" scoped>
</style>
