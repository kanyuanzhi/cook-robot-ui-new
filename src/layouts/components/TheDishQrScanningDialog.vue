<template>
  <q-dialog v-model="useAppStore.dishQrScanningShown" position="standard" @hide="onHide">
    <q-card style="width: 360px;" @mousedown.prevent>
      <q-card-section class="text-center bg-teal-6" @mousedown.prevent>
        <div class="text-h6 text-white">{{ $t("header.moreOptions.qrScan") }}</div>
      </q-card-section>
      <q-card-section>
        <div class="column items-center">
          <div class="" style="position: relative;height: 100px;width: 100px">
            <q-icon name="qr_code_scanner" color="teal-6" class="cover-icon" size="100px"/>
            <div class="cover-div"/>
            <q-input ref="scanInput" class="covered-input" color="white" autofocus
                     v-model="scanResult" dense @keydown.enter="onKeydownEnter"/>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <div class="text-teal-9 text-center text-subtitle1">{{ $t("header.qrScan.instruction") }}</div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { nextTick, ref, watch } from "vue";
import { endsWith, startsWith } from "lodash";
import { Notify } from "quasar";
import { getDish } from "src/api/dish";
import { getAPI } from "src/api";
import { useI18n } from "vue-i18n";

const useAppStore = UseAppStore();
const { t } = useI18n();

const test = "dishUUID::837561df-d4f0-4059-be70-dc1208348efb";

const scanResult = ref("");

const scanInput = ref(null);

const onHide = () => {
  scanResult.value = "";
};

const onKeydownEnter = async (e) => {
  console.log(scanResult.value);
  if (startsWith(scanResult.value, "dishUUID") && scanResult.value.length === 46) {
    const uuid = scanResult.value.split("::")[1];
    try {
      const { data } = await getAPI("dish/get", { uuid: uuid });
      useAppStore.showDishDetailsCard(data.dish.uuid);
      useAppStore.hideDishQrScanning();
    } catch (e) {
      Notify.create({
        icon: "report_problem",
        color: "orange",
        message: t("header.qrScan.dishNotFound"),
      });
      scanInput.value.focus();
      return;
    }
  } else {
    Notify.create({
      icon: "report_problem",
      color: "orange",
      message: t("header.qrScan.wrongQr"),
    });
  }
  scanResult.value = "";
};

</script>

<style lang="scss" scoped>
:deep(.q-input input) {
  caret-color: transparent;
}

.cover-icon {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  /* 添加合适的样式来遮住图标 */
}

.cover-div {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: white;
  z-index: 2;
}

.covered-input {
  position: absolute;
  width: 32px;
  //width: 100%;
  top: 2px; /* 调整合适的位置 */
  left: 5px;
  z-index: 1; /* 确保输入框在图标上面 */
}
</style>
