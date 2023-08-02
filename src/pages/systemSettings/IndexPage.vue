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
            <TheNetworkConnectPanel name="networkConnect"/>
            <ThePhonePairPanel name="phonePair"/>
            <TheSoftwareUpdatePanel name="softwareUpdate"/>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import TheNetworkConnectPanel from "pages/systemSettings/components/TheNetworkConnectPanel.vue";
import ThePhonePairPanel from "pages/systemSettings/components/ThePhonePairPanel.vue";
import TheSoftwareUpdatePanel from "pages/systemSettings/components/TheSoftwareUpdatePanel.vue";

const splitterModel = ref(20);

const tab = ref("");


</script>

<style lang="scss" scoped>
</style>
