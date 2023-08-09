<template>
  <q-dialog v-model="shown" transition-show="scale" transition-hide="scale" >
    <q-uploader
      label="上传菜品图片"
      url="http://localhost:8889/api/v1/uploadImage"
      style="max-width: 300px"
      color="teal-6"
      accept=".jpg,.png"
      :form-fields="[{name:'uuid', value:dishUuid}]"
      field-name="file"
      @uploaded="onUploaded"
    />
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const dishUuid = ref("");

const shown = ref(false);

const show = (dishUuidValue) => {
  shown.value = true;
  dishUuid.value = dishUuidValue;
};

const onUploaded = (info)=>{

}

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
