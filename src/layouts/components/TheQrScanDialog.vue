<template>
  <q-dialog v-model="shown">
    <q-card style="width: 350px">
      <q-card-section class="bg-teal-6 text-white q-py-sm text-center">
        <div class="text-h6">请打开手机软件扫描以下二维码<br>完成配对</div>
      </q-card-section>
      <q-card-section class="no-padding">
        <q-img :src="'data:image/png;base64,'+QrImage" :ratio="1"/>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import TheUpdatingDialog from "layouts/components/TheUpdatingDialog.vue";
import { checkUpdatePermission, getQrCode } from "src/api/system";

const shown = ref(false);

const QrImage = ref("");

const show = async () => {
  shown.value = true;
  const { data } = await getQrCode();
  if (data.message === "success") {
    QrImage.value = data.data;
  }
  //
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
