<template>
  <div class="column items-center">
    <q-img :src="QrImage" :ratio="1" style="width: 200px; height: 200px"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getQrCode } from "src/api/system";
import { Notify } from "quasar";
import { getAPI } from "src/api";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const QrImage = ref("");

onMounted(async () => {
  try {
    const { data } = await getAPI("system/get-qrCode");
    QrImage.value = data.qrCode;
  } catch (e) {
    Notify.create({
      message: t("systemSettings.phonePair.pairFailMsg"),
      type: "warning",
    });
    console.log(e.toString());
  }
});

</script>

<style lang="scss" scoped>

</style>
