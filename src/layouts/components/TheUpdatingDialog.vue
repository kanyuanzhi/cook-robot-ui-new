<template>
  <q-dialog v-model="shown" :persistent="isPersistent">
    <q-card style="width: 500px" class="q-mt-md">
      <q-card-section v-if="isRunning" class="text-center text-teal-6 text-subtitle1">
        机器正在运行，请稍后更新......
      </q-card-section>
      <q-card-section v-else>
        <q-item>
          <q-item-section side>
            <q-item-label class="text-subtitle1 text-teal-6">下载速度</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-badge class="text-subtitle2" color="white" text-color="teal-6" :label="downloadSpeedDisplay"/>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>
            <q-item-label class="text-subtitle1 text-teal-6">下载进度</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-linear-progress animation-speed="100" rounded size="15px" :value="downloadProgress" color="teal-6"/>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-subtitle1 text-teal-6 text-right" style="width: 50px">{{
                downloadProgressDisplay
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>
            <q-item-label class="text-subtitle1 text-teal-6">安装进度</q-item-label>
          </q-item-section>
          <q-item-section>
            <q-linear-progress animation-speed="100" rounded size="15px" :value="unzipProgress" color="secondary"/>
          </q-item-section>
          <q-item-section side>
            <q-item-label class="text-subtitle1 text-teal-6 text-right" style="width: 50px">{{
                unzipProgressDisplay
              }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn color="teal-6" unelevated :disable="!isInstallFinished" @click="closeApp">
          <q-spinner-ios
            v-if="!isInstallFinished"
            color="white"
            size="0.7em"
            class="q-mr-md"
          />
          {{ isInstallFinished ? "退出重启" : "正在升级" }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, ref } from "vue";
import { shutdown } from "src/api/system";
import { Notify } from "quasar";
import { round, toString } from "lodash";
import { UseAppStore } from "stores/appStore";
import { Platform } from "quasar";
import { UseSettingStore } from "stores/settingStore";

const useAppStore = UseAppStore();
const useSettingStore = UseSettingStore();

const shown = ref(false);
const isPersistent = ref(false);

const isRunning = ref(false);
const isUpdating = ref(false);

const show = (runningStatus, updatingStatus) => {
  shown.value = true;
  isRunning.value = runningStatus;
  isUpdating.value = updatingStatus;
  if (runningStatus) return;
  isPersistent.value = true;
  beginUpdate();
};

const isDownloadFinished = ref(false);
const isUnzipFinished = ref(false);

const downloadProgress = ref(0);
const unzipProgress = ref(0);
const downloadSpeed = ref(0);
let ws;

const downloadProgressDisplay = computed(() => {
  return toString(round(downloadProgress.value * 100, 2)) + "%";
});

const unzipProgressDisplay = computed(() => {
  return toString(round(unzipProgress.value * 100, 2)) + "%";
});

const downloadSpeedDisplay = computed(() => {
  return downloadSpeed.value < 1.024 ? toString(round(downloadSpeed.value * 1024, 0)) + "KB/s" :
    toString(round(downloadSpeed.value, 2)) + "MB/s";
});

const isInstallFinished = computed(() => {
  return isDownloadFinished.value && isUnzipFinished.value;
});

const beginUpdate = () => {
  isUpdating.value = true;
  const wsUrl = (useSettingStore.useSSL ? "wss" : "ws") + "://" + useSettingStore.middlePlatformIPAddress + ":8889/api/v1/system/update";
  ws = new WebSocket(wsUrl);

  ws.onopen = function (event) {
    console.log("WebSocket连接已建立");
  };

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    isDownloadFinished.value = data.isDownloadFinished;
    isUnzipFinished.value = data.isUnzipFinished;
    downloadProgress.value = data.downloadProgress;
    unzipProgress.value = data.unzipProgress;
    downloadSpeed.value = data.downloadSpeed;
  };

  ws.onerror = function (event) {
    console.log("WebSocket错误：", event);
  };

  ws.onclose = function (event) {
    console.log("WebSocket连接已关闭");
    ws.close();
  };
};

const closeApp = () => {
  if (Platform.is.electron) {
    shutdown();
    window.myWindowAPI.close();
  } else {
    Notify.create("非electron平台无法重启软件");
  }
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>


</style>
