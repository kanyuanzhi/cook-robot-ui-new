<template>
  <q-dialog v-model="shown" @hide="onHide">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-subtitle1">请选择操作：</div>
      </q-card-section>

      <q-card-actions align="right" class="text-teal-6">
        <q-btn push label="断开连接" color="teal-6" size="md" v-close-popup @click="emits('disconnect')"/>
        <q-btn push label="忘记连接" color="grey-6" size="md" v-close-popup @click="emits('remove',ssid )"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["rememberedConnections"]);
const emits = defineEmits(["disconnect", "remove"]);

const shown = ref(false);
const ssid = ref("");

const show = (ssidValue) => {
  shown.value = true;
  ssid.value = ssidValue;
};

const onHide = () => {
  ssid.value = "";
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
