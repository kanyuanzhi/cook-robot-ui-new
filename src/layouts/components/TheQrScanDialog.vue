<template>
  <q-dialog v-model="shown">
    <q-card style="width: 260px">
      <q-card-section class="bg-teal-6 text-white q-py-sm text-center">
        <div class="text-subtitle1">请打开手机软件扫描以下二维码<br>完成配对</div>
      </q-card-section>
      <q-card-section class="no-padding">
        <q-img :src="'data:image/png;base64,'+QrImage" :ratio="1"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { getQrCode } from "src/api/system";
import { Notify } from "quasar";

const shown = ref(false);

const QrImage = ref("");
const isConnectedToWifi = ref(false);

const show = async () => {
  shown.value = true;
  const { data } = await getQrCode();
  if (data.message === "success") {
    QrImage.value = data.data;
  } else {
    Notify.create("获取二维码失败，请将设备连接wifi，并保证手机与设备在同一wifi下");
  }
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
