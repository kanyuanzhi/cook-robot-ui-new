<template>
  <q-tab-panel class="container flex flex-center" :name="name">
    <q-btn unelevated color="teal-6" size="md" label="检查更新" @click="theUpdateConfirmDialog.show()"/>
    <TheUpdateConfirmDialog ref="theUpdateConfirmDialog"/>
  </q-tab-panel>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getQrCode } from "src/api/system";
import { Notify } from "quasar";
import TheUpdateConfirmDialog from "pages/systemSettings/components/TheUpdateConfirmDialog.vue";

const props = defineProps(["name"]);

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
.container {
  height: calc(100vh - 50px - 50px - 16px - 1px);
}
</style>
