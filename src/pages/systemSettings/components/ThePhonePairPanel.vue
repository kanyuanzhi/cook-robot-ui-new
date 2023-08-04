<template>
  <q-tab-panel class="flex flex-center full-height" :name="name">
    <div class="column items-center">
      <q-img :src="'data:image/png;base64,'+QrImage" :ratio="1" style="width: 200px; height: 200px"/>
    </div>
  </q-tab-panel>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getQrCode } from "src/api/system";
import { Notify } from "quasar";

const QrImage = ref("");

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
