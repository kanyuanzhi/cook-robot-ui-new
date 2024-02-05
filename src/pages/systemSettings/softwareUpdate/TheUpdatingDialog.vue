<template>
  <q-dialog v-model="shown" :persistent="true">
    <q-card style="width: 500px" class="q-mt-md">
      <q-card-section>
        <q-item>
          <q-item-section side>
            <q-item-label class="text-subtitle1 text-teal-6">{{
                $t("systemSettings.dataUpdate.downloadSpeed")
              }}
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-badge class="text-subtitle2" color="white" text-color="teal-6" :label="downloadSpeedDisplay"/>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side>
            <q-item-label class="text-subtitle1 text-teal-6">{{
                $t("systemSettings.dataUpdate.downloadProgress")
              }}
            </q-item-label>
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
            <q-item-label class="text-subtitle1 text-teal-6">{{
                $t("systemSettings.dataUpdate.installProgress")
              }}
            </q-item-label>
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
          {{
            isInstallFinished ? $t("systemSettings.dataUpdate.reboot") : $t(
                "systemSettings.dataUpdate.updating")
          }}
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
import { useI18n } from "vue-i18n";

const useAppStore = UseAppStore();
const useSettingStore = UseSettingStore();

const shown = ref(false);

const show = () => {
  shown.value = true;
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

const {t} = useI18n();

const beginUpdate = () => {
  const wsUrl = (useSettingStore.useSSL ? "wss" : "ws") + "://" + useSettingStore.middlePlatformIPAddress +
      ":8889/api/v1/softwareUpdater/update";
  ws = new WebSocket(wsUrl);

  ws.onopen = function (event) {
    console.log(t("systemSettings.dataUpdate.websocketEstablishedMsg"));
  };

  ws.onmessage = function (event) {
    const data = JSON.parse(event.data);
    isDownloadFinished.value = data.isDownloadFinished;
    isUnzipFinished.value = data.isUnzipFinished;
    downloadProgress.value = round(data.downloadProgress, 2);
    unzipProgress.value = round(data.unzipProgress, 2);
    downloadSpeed.value = data.downloadSpeed;
  };

  ws.onerror = function (event) {
    console.log(t("systemSettings.dataUpdate.websocketFailedMsg"), event);
  };

  ws.onclose = function (event) {
    console.log(t("systemSettings.dataUpdate.websocketClosedMsg"));
    ws.close();
  };
};

const closeApp = () => {
  if (Platform.is.electron) {
    shutdown();
    window.windowAPI.close();
  } else {
    Notify.create({
      message: t("systemSettings.dataUpdate.notSupportMsg"),
      type: "warning",
    });
  }
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>


</style>
