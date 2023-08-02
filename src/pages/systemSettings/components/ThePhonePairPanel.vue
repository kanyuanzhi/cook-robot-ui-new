<template>
  <q-tab-panel class="container flex flex-center" :name="name">
    <div class="column items-center">
      <q-img :src="'data:image/png;base64,'+QrImage" :ratio="1" style="width: 200px; height: 200px"/>
      <div class="text-subtitle1 te">请打开手机App扫描以上二维码完成配对</div>
    </div>
  </q-tab-panel>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getQrCode } from "src/api/system";
import { Notify } from "quasar";

const props = defineProps(["name"]);

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
.container {
  height: calc(100vh - 50px - 50px - 16px - 1px);
}
</style>
