<template>
  <div class="row">
    <div class="col-4 offset-4">
      <q-list class="text-grey-9">
        <q-item>
          <q-item-section avatar>{{ $t("systemSettings.language.selectLanguage") }}：</q-item-section>
          <q-item-section>
            <q-select
                v-model="locale"
                :options="localeOptions"
                dense
                standout="bg-teal text-white"
                emit-value
                map-options
                style="min-width: 20px"
            />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { UseSettingStore } from "stores/settingStore";

const settingStore = UseSettingStore()

const { locale } = useI18n({ useScope: "global" });
const localeOptions = [
  { value: "zh-CN", label: "中文简体" },
  { value: "zh-TW", label: "中文繁體" },
  // { value: "en-US", label: "English" },
];

watch(
  () => locale.value,
  (val) => {
    settingStore.setLang(val);
  }
);

</script>

<style lang="scss" scoped>
</style>
