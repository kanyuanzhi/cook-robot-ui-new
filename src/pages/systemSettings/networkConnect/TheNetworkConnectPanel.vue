<template>
  <div class="column">
    <div class="col">
      <q-item>
        <q-item-section>
          <q-toggle
            v-model="wlanStatus"
            color="teal-6"
            left-label
          >
            <template v-slot:default>
              <span class="text-teal-6">{{ wlanStatus ? "WLAN开" : "WLAN关" }}</span>
            </template>
          </q-toggle>
        </q-item-section>
      </q-item>
    </div>
    <q-list class="col q-py-md" bordered dense>
      <q-scroll-area style="height: 300px">
        <q-item v-if="currentConnection!==null" clickable v-ripple class="q-px-xl text-teal-6"
                @click="theNetworkDisconnectDialog.show">
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
                @click="theNetworkConnectDialog.show(network)">
          <q-item-section class="row">
            <span><span class="q-mr-lg">{{ network.ssid || "隐藏的网络" }}</span><span>{{ network.mac }}</span></span>
          </q-item-section>
          <q-item-section avatar>
            <q-icon :name="wifiBar(network.quality)"/>
          </q-item-section>
        </q-item>
      </q-scroll-area>
    </q-list>
    <TheNetworkConnectPanel ref="theNetworkConnectDialog"/>
    <TheNetworkDisconnectPanel ref="theNetworkDisconnectDialog"/>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { Notify, Platform } from "quasar";
import TheNetworkConnectPanel from "pages/systemSettings/networkConnect/TheNetworkConnectDialog.vue";
import TheNetworkDisconnectPanel from "pages/systemSettings/networkConnect/TheNetworkDisconnectDialog.vue";

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

  if (!Platform.is.electron) return;

  if (wlanStatus.value) {
    scanInterval = setInterval(scan, 1000);
  }

  watch(wlanStatus, async (value) => {
    if (value) {
      const res = await window.wlanAPI.open();
      scanInterval = setInterval(scan, 1000);
    } else {
      const res = await window.wlanAPI.close();
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

const theNetworkConnectDialog = ref(null);
const theNetworkDisconnectDialog = ref(null);

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
