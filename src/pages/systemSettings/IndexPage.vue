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
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <NetworkConnectPanel name="networkConnect"/>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import NetworkConnectPanel from "pages/systemSettings/components/networkConnectPanel.vue";

const splitterModel = ref(20);

const tab = ref("");


</script>

<style lang="scss" scoped>
//:deep(.q-tab__label) {
//  font-weight: 600;
//  font-size: 20px;
//  letter-spacing: 10px;
//  padding-top: 0px;
//  padding-bottom: 0;
//}
//
//:deep(.q-tab) {
//  min-height: 35px;
//  height: 43.5px;
//}
</style>
