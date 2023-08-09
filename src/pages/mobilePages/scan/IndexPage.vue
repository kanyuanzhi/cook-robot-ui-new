<template>
  <div class="column justify-around scan-container">
    <div class="col-10 flex flex-center">
      <div class="main-box">
        <div class="corner top-left"></div>
        <div class="corner top-right"></div>
        <div class="corner bottom-left"></div>
        <div class="corner bottom-right"></div>
      </div>
    </div>
    <div class="col-2 text-center">
      <q-btn round color="teal-6" icon="clear" size="lg" @click="stopScan"/>
    </div>
    <q-dialog v-model="confirmShown" persistent>
      <q-card style="width: 300px">
        <q-card-section class="row items-center">
          <!--          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />-->
          <span class="q-ml-sm">配对成功，是否连接？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="teal-6" v-close-popup/>
          <q-btn flat label="确认" color="teal-6" v-close-popup @click="confirmPair"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>

import { onMounted, ref } from "vue";
import { Notify } from "quasar";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { UseMobileStore } from "stores/mobileStore";
import { useRouter } from "vue-router";
import { UseSettingStore } from "stores/settingStore";
import { api } from "src/boot/axios";
import { startsWith } from "lodash";

const useSettingStore = UseSettingStore();
const useMobileStore = UseMobileStore();
const router = useRouter();

const confirmShown = ref(false);

let scanResult = "";

onMounted(async () => {
  try {
    await BarcodeScanner.checkPermission({ force: true });
    useMobileStore.setScanningStatus(true);

    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // if the result has content
    if (result.hasContent) {
      BarcodeScanner.stopScan();
      scanResult = result.content;
      if (startsWith(scanResult, "phonePairing")) {
        confirmShown.value = true;
      } else {
        Notify.create("二维码错误，请扫描小智云炒设备上显示的二维码");
      }
    }
  } catch (e) {
    Notify.create(e.toString());
  }
});

const stopScan = () => {
  BarcodeScanner.showBackground();
  BarcodeScanner.stopScan();
  useMobileStore.setScanningStatus(false);
  router.push("/");
};

const confirmPair = () => {
  useMobileStore.setScanningStatus(false);
  try {
    const platformIpAddress = scanResult.trim()
      .split("::")[1];
    // useSettingStore.test();
    // Notify.create(platformIpAddress);
    useSettingStore.setMiddlePlatformIPAddress(platformIpAddress);
  } catch (e) {
    console.log(e.toString());
  }

  router.push("/");
};
</script>

<style lang="scss" scoped>
.scan-container {
  height: calc(100vh - 50px - 50px - 5px);
}

.main-box {
  position: relative;
  width: 80%;
  padding-top: 80%;
  //border: 2px solid #3498db;
}

.corner {
  position: absolute;
  width: 70px;
  height: 70px;
}

.top-left {
  top: 0;
  left: 0;
  border-top: #009688 4px solid;
  border-left: #009688 4px solid;
}

.top-right {
  top: 0;
  right: 0;
  border-top: #009688 4px solid;
  border-right: #009688 4px solid;
}

.bottom-left {
  bottom: 0;
  left: 0;
  border-bottom: #009688 4px solid;
  border-left: #009688 4px solid;
}

.bottom-right {
  bottom: 0;
  right: 0;
  border-bottom: #009688 4px solid;
  border-right: #009688 4px solid;
}
</style>
