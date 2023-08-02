<template>
  <q-tab-panel :name="name">
    <div class="column " style="padding: 0 40px">
      <div class="col">
        <q-item>
          <q-item-section>
            WLAN
          </q-item-section>
          <q-item-section>
            <q-toggle
              v-model="wlanStatus"
              color="green"
              :label="wlanStatus?'开':'关'"
              left-label
            />
          </q-item-section>
        </q-item>
      </div>
      <q-list class="col q-py-md" bordered dense>
        <q-scroll-area style="height: 360px">
          <q-item v-if="currentConnection!==null" clickable v-ripple class="q-px-xl text-teal-6"
                  @click="networkDisconnectDialog.show">
            <q-item-section class="row">
              <span><span class="q-mr-lg">{{ currentConnection.ssid }}</span><span>{{
                  currentConnection.mac
                }}</span></span>
            </q-item-section>
            <q-item-section avatar>
              <q-icon :name="wifiBar(currentConnection.quality)"/>
            </q-item-section>
          </q-item>
          <q-item v-for="network in networks" :key="network.bssid" clickable v-ripple class="q-px-xl"
                  @click="networkConnectDialog.show(network)">
            <q-item-section class="row">
              <span><span class="q-mr-lg">{{ network.ssid || "隐藏的网络" }}</span><span>{{ network.mac }}</span></span>
            </q-item-section>
            <q-item-section avatar>
              <q-icon :name="wifiBar(network.quality)"/>
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </q-list>
    </div>
    <NetworkConnectDialog ref="networkConnectDialog"/>
    <NetworkDisconnectDialog ref="networkDisconnectDialog"/>
  </q-tab-panel>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { Notify, Platform } from "quasar";
import NetworkConnectDialog from "pages/systemSettings/components/networkConnectDialog.vue";
import NetworkDisconnectDialog from "pages/systemSettings/components/NetworkDisconnectDialog.vue";

const props = defineProps(["name"]);

const wlanStatus = ref(true);

const networks = ref([]);
const currentConnection = ref(null);

let scanInterval;

onMounted(async () => {
  if (Platform.is.linux && Platform.is.electron) {
    const status = await window.wlanAPI.getStatus();
    if (status === null) {
      Notify.create("获取wlan状态错误");
      return;
    }
    wlanStatus.value = status;
  } else {
    Notify.create("当前平台不为electron（linux），不支持控制WLAN的开启/关闭");
  }
  if (wlanStatus.value) {
    scanInterval = setInterval(scan, 1000);
  }

  watch(wlanStatus, async (value) => {
    if (value) {
      const res = await window.wlanAPI.open();
      scanInterval = setInterval(scan, 1000);
    } else {
      const res = await window.res.close();
      clearInterval(scanInterval);
      networks.value = [];
      currentConnection.value = null;
    }
  });
});

const scan = async () => {
  try {
    const networkScanResult = await window.wlanAPI.scan();
    if (networkScanResult === null) {
      Notify.create("扫描wifi失败");
      return;
    }

    const currentConnections = await window.wlanAPI.getCurrentConnections();
    if (currentConnections.length !== 0 && currentConnections[0].security_flags !== "δ֪") {
      currentConnection.value = currentConnections[0];
      let matchedIndex = -1;
      for (let i = 0; i < networkScanResult.length; i++) {
        if (networkScanResult[i].ssid === currentConnection.value.ssid) {
          matchedIndex = i;
          break;
        }
      }
      if (matchedIndex !== -1) {
        networkScanResult.splice(matchedIndex, 1);
      }
    } else {
      currentConnection.value = null;
    }
    networks.value = networkScanResult;
  } catch (e) {
    console.log(e);
  }
};

const networkConnectDialog = ref(null);
const networkDisconnectDialog = ref(null);

const disConnect = async () => {

};

const wifiBar = (quality) => {
  if (quality <= 25) {
    return "network_wifi_1_bar";
  } else if (quality <= 50) {
    return "network_wifi_2_bar";
  } else if (quality <= 80) {
    return "network_wifi_3_bar";
  } else {
    return "signal_wifi_statusbar_4_bar";
  }
};


</script>

<style lang="scss" scoped>

</style>
