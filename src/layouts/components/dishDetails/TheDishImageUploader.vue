<template>
  <q-dialog v-model="shown" transition-show="scale" transition-hide="scale">
    <q-uploader
      label="上传菜品图片"
      :url=url
      style="max-width: 300px"
      color="teal-6"
      accept=".jpg,.png"
      :form-fields="[{name:'uuid', value:uuid}]"
      field-name="file"
      @uploaded="onUploaded"
      auto-upload
    />
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { UseSettingStore } from "stores/settingStore";
const useSettingStore = UseSettingStore();

const emit = defineEmits(["uploaded"]);

const url = ref("http://" + useSettingStore.middlePlatformIPAddress + ":8889/api/v1/uploadImage");
const uuid = ref("");
const shown = ref(false);

const show = (uuidValue) => {
  shown.value = true;
  uuid.value = uuidValue;
};

const onUploaded = (info) => {
  const xhr = info.xhr;
  const res = JSON.parse(xhr.response);
  emit("uploaded", res.data);
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
