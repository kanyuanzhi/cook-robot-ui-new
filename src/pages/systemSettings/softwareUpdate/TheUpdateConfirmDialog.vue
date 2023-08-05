<template>
  <div>
    <q-dialog v-model="shown">
      <q-card style="width: 300px">
        <q-card-section class="row items-center">
          <q-icon name="update" color="teal-6" size="md"/>
          <span class="q-ml-sm text-subtitle1 text-teal-6">是否更新软件？</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="teal-6" v-close-popup/>
          <q-btn label="确认" color="teal-6" unelevated v-close-popup @click="openUpdatingDialog"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <TheUpdatingDialog ref="theUpdatingDialog"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheUpdatingDialog from "pages/systemSettings/softwareUpdate/TheUpdatingDialog.vue";
import { checkUpdatePermission } from "src/api/system";

const shown = ref(false);
const theUpdatingDialog = ref(null);

const updatePermitted = ref(false);
const isRunning = ref(false);
const isUpdating = ref(false);

const show = () => {
  shown.value = true;
};

const openUpdatingDialog = async () => {
  const { data } = await checkUpdatePermission();
  updatePermitted.value = data.data.updatePermitted;
  isRunning.value = data.data.isRunning;
  isUpdating.value = data.data.isUpdating;

  console.log(theUpdatingDialog.value);

  theUpdatingDialog.value.show(isRunning.value, isUpdating.value);
};

defineExpose({
  show
});
</script>

<style lang="scss" scoped>

</style>
