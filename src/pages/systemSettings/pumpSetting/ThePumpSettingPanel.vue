<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
  >
    <div class="row q-col-gutter-x-lg">
      <ThePumpRatioInput v-for="seasoning in seasoningConfigs" :key="seasoning.uuid"
                         class="col-6" :seasoning="seasoning"/>
    </div>
    <div class="text-right q-mt-lg">
      <q-btn label="取消" type="reset" text-color="teal-6" push class="q-mr-sm white"/>
      <q-btn label="保存" type="submit" push color="teal-6"/>
    </div>
  </q-form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Notify } from "quasar";
import { getSeasoningConfigs, updateSeasoningConfigs } from "src/api/seasoning";
import ThePumpRatioInput from "pages/systemSettings/pumpSetting/ThePumpRatioInput.vue";

const seasoningConfigs = ref([]);

onMounted(async () => {
  const { data } = await getSeasoningConfigs();
  seasoningConfigs.value = data.data;
  for (let seasoning of seasoningConfigs.value) {
    Reflect.set(seasoning, "editingRatio", seasoning.ratio);
  }
});

const onSubmit = async () => {
  const uuidToRatio = {};
  for (let seasoning of seasoningConfigs.value) {
    seasoning.ratio = seasoning.editingRatio;
    uuidToRatio[seasoning.uuid] = seasoning.ratio;
  }
  const { data } = await updateSeasoningConfigs(uuidToRatio);
  if (data.message === "success") {
    Notify.create("保存成功");
  }
};
const onReset = () => {
  for (let seasoning of seasoningConfigs.value) {
    seasoning.editingRatio = seasoning.ratio;
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 50px - 50px - 16px - 1px);
}
</style>
