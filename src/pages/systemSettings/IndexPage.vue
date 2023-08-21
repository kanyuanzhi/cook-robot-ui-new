<template>
  <q-page>
    <div class="q-pa-sm">
      <q-splitter
        v-model="splitterModel"
      >
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="text-teal-6"
            active-bg-color="teal-6"
            active-color="white"
          >
            <q-tab class="" name="pumpSetting" label="料泵设置" icon="timelapse"/>
            <q-separator/>
            <q-tab class="" name="networkConnect" label="网络连接" icon="wifi"/>
            <q-tab class="" name="phonePair" label="手机配对" icon="phone_iphone"/>
            <q-tab class="" name="softwareUpdate" label="软件更新" icon="update"/>
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <SettingPanel title="料泵设置"
                          summary="各泵开启时长（毫秒）与出料分量（克）的比例关系。例：100表示下料1克需要开启100毫秒。"
                          name="pumpSetting">
              <ThePumpSettingPanel/>
            </SettingPanel>
            <SettingPanel title="网络连接"
                          name="networkConnect">
              <TheNetworkConnectPanel/>
            </SettingPanel>
            <SettingPanel title="手机配对"
                          summary="请打开手机App扫描以下二维码完成配对。"
                          name="phonePair">
              <ThePhonePairPanel/>
            </SettingPanel>
            <SettingPanel title="软件更新"
                          name="softwareUpdate">
              <TheSoftwareUpdatePanel/>
            </SettingPanel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import TheNetworkConnectPanel from "pages/systemSettings/networkConnect/TheNetworkConnectPanel.vue";
import ThePhonePairPanel from "pages/systemSettings/phonePair/ThePhonePairPanel.vue";
import TheSoftwareUpdatePanel from "pages/systemSettings/softwareUpdate/TheSoftwareUpdatePanel.vue";
import ThePumpSettingPanel from "pages/systemSettings/pumpSetting/ThePumpSettingPanel.vue";
import SettingPanel from "pages/systemSettings/components/SettingPanel.vue";
import { UseAppStore } from "stores/appStore";

const useAppStore = UseAppStore();
useAppStore.setPageTitle("系统设置");

const splitterModel = ref(20);

const tab = ref("pumpSetting");
</script>

<style lang="scss" scoped>
</style>
