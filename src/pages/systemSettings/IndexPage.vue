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
            <q-tab class="" name="pumpSetting" :label="$t('systemSettings.base.pumpSetting.label')" icon="timelapse"/>
            <q-separator/>
            <q-tab class="" name="networkConnect" :label="$t('systemSettings.base.networkConnect.label')" icon="wifi"/>
            <q-tab class="" name="phonePair" :label="$t('systemSettings.base.phonePair.label')" icon="phone_iphone"/>
            <q-tab class="" name="dataUpdate" :label="$t('systemSettings.base.dataUpdate.label')" icon="phone_iphone"/>
            <q-tab class="" name="softwareUpdate" :label="$t('systemSettings.base.softwareUpdate.label')" icon="update"/>
            <q-tab class="" name="languageShift" :label="$t('systemSettings.base.languageShift.label')" icon="language"/>
            <q-tab v-if="useAppStore.isTest" class="" name="test" label="测试" icon="home"/>
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
              v-model="tab"
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
          >
            <SettingPanel :title="$t('systemSettings.base.pumpSetting.label')"
                          :summary="$t('systemSettings.base.pumpSetting.summary')"
                          name="pumpSetting">
              <ThePumpSettingPanel/>
            </SettingPanel>
            <SettingPanel :title="$t('systemSettings.base.networkConnect.label')"
                          name="networkConnect">
              <TheNetworkConnectPanel/>
            </SettingPanel>
            <SettingPanel :title="$t('systemSettings.base.phonePair.label')"
                          :summary="$t('systemSettings.base.phonePair.summary')"
                          name="phonePair">
              <ThePhonePairPanel/>
            </SettingPanel>
            <SettingPanel :title="$t('systemSettings.base.dataUpdate.label')"
                          name="dataUpdate">
              <TheDataUpdatePanel/>
            </SettingPanel>
            <SettingPanel :title="$t('systemSettings.base.softwareUpdate.label')"
                          name="softwareUpdate">
              <TheSoftwareUpdatePanel/>
            </SettingPanel>
            <SettingPanel :title="$t('systemSettings.base.languageShift.label')"
                          name="languageShift">
              <TheLanguageShiftPanel/>
            </SettingPanel>
            <SettingPanel title="测试"
                          name="test">
              <TheTestPanel/>
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
import TheDataUpdatePanel from "pages/systemSettings/dataUpdate/TheDataUpdatePanel.vue";
import TheLanguageShiftPanel from "pages/systemSettings/languageShift/TheLanguageShiftPanel.vue";
import { useI18n } from "vue-i18n";
import TheTestPanel from "pages/systemSettings/test/TheTestPanel.vue";

const useAppStore = UseAppStore();
const { t } = useI18n();

useAppStore.setPageTitle(t("systemSettings.base.title"));

const splitterModel = ref(20);

const tab = ref("pumpSetting");
</script>

<style lang="scss" scoped>
</style>
