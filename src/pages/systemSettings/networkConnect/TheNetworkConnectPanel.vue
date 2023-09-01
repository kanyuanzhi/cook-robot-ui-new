<template>
  <div class="column">
    <div class="col row">
      <div class="col">
<!--        <q-toggle-->
<!--          v-model="wlanStatus"-->
<!--          color="teal-6"-->
<!--          left-label-->
<!--        >-->
<!--          <template v-slot:default>-->
<!--            <span class="text-teal-6">{{ wlanStatus ? "WLAN开" : "WLAN关" }}</span>-->
<!--          </template>-->
<!--        </q-toggle>-->
      </div>
      <div class="col text-right">
        <q-toggle
          v-model="wlanStatus"
          color="teal-6"
          left-label
        >
          <template v-slot:default>
            <span class="text-teal-6">{{ wlanStatus ? "WLAN开" : "WLAN关" }}</span>
          </template>
        </q-toggle>
<!--        <q-btn push color="teal-6" size="md" label="连接隐藏网络" @click="theConnectToHiddenDialog.show()"/>-->
      </div>
    </div>
    <q-list class="col q-py-md" bordered dense>
      <q-scroll-area style="height: 300px">
        <q-item v-if="currentConnection!==null" clickable v-ripple class="q-px-xl text-teal-6"
                @click="theDisconnectAndDeleteDialog.show(currentConnection.ssid)">
          <q-item-section class="row">
              <span>
                <span class="q-mr-lg">{{ currentConnection.ssid }}</span>
                <span>{{ currentConnection.mac }}</span>
              </span>
          </q-item-section>
          <q-item-section avatar>
            <q-icon :name="wifiBar(currentConnection.quality)"/>
          </q-item-section>
        </q-item>
        <q-item v-for="connection in allConnections" :key="connection.bssid" clickable v-ripple class="q-px-xl"
                @click="onConnectionClick(connection)">
          <q-item-section class="row">
            <span>
              <span class="q-mr-lg">{{ connection.ssid || "隐藏的网络" }}</span>
              <span>{{ connection.mac }}</span>
              <span>{{ connection.isRemembered ? "（已保存）" : "" }}</span>
            </span>
          </q-item-section>
          <q-item-section avatar>
            <q-icon :name="wifiBar(connection.quality)"/>
          </q-item-section>
        </q-item>
      </q-scroll-area>
    </q-list>
    <!--    <div>-->
    <!--      rememberedConnections:-->
    <!--      <ul>-->
    <!--        <li v-for="data in toPairs(rememberedConnections)" :key="data[0]">-->
    <!--          {{ data[0] + " " + data[1] }}-->
    <!--        </li>-->
    <!--      </ul>-->

    <!--    </div>-->
    <TheConnectDialog ref="theConnectDialog" @connect="onConnect"/>
    <TheDisconnectAndDeleteDialog ref="theDisconnectAndDeleteDialog" @disconnect="onDisconnect" @remove="onRemove"/>
    <TheConnectToHiddenDialog ref="theConnectToHiddenDialog" @connect="onConnect"/>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { Loading, Notify, Platform } from "quasar";
import TheConnectDialog from "pages/systemSettings/networkConnect/TheConnectDialog.vue";
import TheDisconnectAndDeleteDialog from "pages/systemSettings/networkConnect/TheDisconnectAndDeleteDialog.vue";
import TheConnectToHiddenDialog from "pages/systemSettings/networkConnect/TheConnectToHiddenDialog.vue";
import { toPairs } from "lodash";

const wlanStatus = ref(true);

const allConnections = ref([]); // 所有扫描出来的连接
const currentConnection = ref(null); // 当前连接
// {
//   bssid:"02:87:31:da:03:cf";
//   channel:2;
//   frequency:2417;
//   mac:"02:87:31:da:03:cf";
//   mode:"Unknown";
//   quality:95;
//   security:"WPA2 - ����";
//   security_flags:"CCMP ";
//   signal_level:-52.5;
//   ssid:"B2";
// }
const rememberedConnections = ref({}); // 记住密码的连接
// {
//   ssid: "password",
//  }

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
    Notify.create("当前平台不为linux下的electron，不支持控制WLAN的开启/关闭");
  }

  if (!Platform.is.electron) return;

  rememberedConnections.value = await window.storeAPI.get("rememberedConnections");

  if (wlanStatus.value) {
    scanInterval = setInterval(scan, 1000);
  }

  watch(wlanStatus, async (value) => {
    if (value) {
      await window.wlanAPI.open();
      scanInterval = setInterval(scan, 1000);
    } else {
      await window.wlanAPI.close();
      clearInterval(scanInterval);
      allConnections.value = [];
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
    allConnections.value = networkScanResult;
    for (let connection of allConnections.value) {
      connection["isRemembered"] = rememberedConnections.value[connection.ssid] !== undefined;
    }
  } catch (e) {
    Notify.create(e.toString());
  }
};

const onConnectionClick = async (connection) => {
  if (rememberedConnections.value[connection.ssid] !== undefined) { //已记住该连接的密码
    Loading.setDefaults({ message: "连接中，请稍后..." });
    Loading.show();
    const result = await window.wlanAPI.connect(connection.ssid, rememberedConnections.value[connection.ssid]);
    Loading.hide();
    if (result === null) {
      // 记住的密码错误，删除
      await window.storeAPI.remove("rememberedConnections." + connection.ssid);
      delete rememberedConnections.value[connection.ssid];
      Notify.create("网络安全密钥错误，请重新输入");
    } else {
      Notify.create("连接成功");
      return;
    }
  }
  theConnectDialog.value.show(connection.ssid);
};

const onConnect = async (ssid, password) => {
  try {
    Loading.setDefaults({ message: "连接中，请稍后..." });
    Loading.show();
    const result = await window.wlanAPI.connect(ssid, password);
    Loading.hide();
    if (result === null) {
      Notify.create("验证信息错误，请重新输入");
    } else {
      Notify.create("连接成功");
      await window.storeAPI.set("rememberedConnections." + ssid, password);
      rememberedConnections.value[ssid] = password;
    }
  } catch (e) {
    Notify.create(e.toString());
  }
};

const onDisconnect = async () => {
  try {
    const result = await window.wlanAPI.disconnect();
    if (result !== null) {
      currentConnection.value = null;
      Notify.create("断开连接成功");
    } else {
      Notify.create("断开连接失败");
    }
  } catch (e) {
    Notify.create(e.toString());
  }
};

const onRemove = async (ssid) => {
  try {
    const result = await window.wlanAPI.deleteConnection(ssid);
    if (result !== null) {
      currentConnection.value = null;
      await window.storeAPI.remove("rememberedConnections." + ssid);
      delete rememberedConnections.value[ssid];
      Notify.create("忘记连接成功");
    } else {
      Notify.create("忘记连接失败");
    }
  } catch (e) {
    Notify.create(e.toString());
  }
};

const theConnectDialog = ref(null);
const theDisconnectAndDeleteDialog = ref(null);
const theConnectToHiddenDialog = ref(null);

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
