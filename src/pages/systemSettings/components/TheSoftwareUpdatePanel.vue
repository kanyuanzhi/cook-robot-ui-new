<template>
  <div class="flex flex-center full-height">
    <q-btn push color="teal-6" size="md" label="检查更新" @click="theUpdateConfirmDialog.show()"/>
    <TheUpdateConfirmDialog ref="theUpdateConfirmDialog"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getQrCode } from "src/api/system";
import { Notify } from "quasar";
import TheUpdateConfirmDialog from "pages/systemSettings/components/TheUpdateConfirmDialog.vue";

const QrImage = ref("");
const theUpdateConfirmDialog = ref(null)

onMounted(async () => {
  const { data } = await getQrCode();
  if (data.message === "success") {
    QrImage.value = data.data;
  } else {
    Notify.create("获取二维码失败，请将设备连接wifi，并保证手机与设备在同一wifi下");
  }
});


</script>

<style lang="scss" scoped>
</style>
