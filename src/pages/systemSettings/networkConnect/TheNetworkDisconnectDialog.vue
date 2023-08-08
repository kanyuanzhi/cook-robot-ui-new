<template>
  <q-dialog v-model="shown">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-subtitle1">是否断开此连接？</div>
      </q-card-section>

      <q-card-actions align="right" class="text-teal-6">
        <q-btn flat label="确认" v-close-popup @click="onConfirm"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const shown = ref(false);

const show = () => {
  shown.value = true;
};

const onConfirm = async () => {
  const result = await window.wlanAPI.disconnect();
  shown.value = false;
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
