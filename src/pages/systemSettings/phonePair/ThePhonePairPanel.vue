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

const QrImage = ref("");

onMounted(async () => {
  try {
    const { data } = await getAPI("system/get-qrCode");
    QrImage.value = data.qrCode;
  } catch (e) {
    Notify.create({
      message: "获取二维码失败，请将设备连接wifi，并保证手机与设备在同一wifi下",
      type: "warning",
    });
    console.log(e.toString());
  }
});

</script>

<style lang="scss" scoped>

</style>
