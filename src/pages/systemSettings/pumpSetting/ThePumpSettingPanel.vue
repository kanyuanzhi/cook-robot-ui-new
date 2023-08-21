<template>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
  >
    <div class="row q-col-gutter-x-lg">
      <ThePumpRatioInput v-for="(seasoning,index) in seasoningConfigs" :key="seasoning.uuid"
                         class="col-6" :seasoning="seasoning"
                         :is-warning="useControllerStore.liquidSeasoningWarning[index]"/>
    </div>
    <div class="row  q-mt-lg">
      <div class="col-8">
        <span class="text-teal-8">“绿色”标签表示调料充足，<span class="text-red-6">“红色”</span>标签表示调料不足。</span>
      </div>
      <div class="col-4 text-right">
        <q-btn label="取消" type="reset" text-color="teal-6" push class="q-mr-sm white"/>
        <q-btn label="保存" type="submit" push color="teal-6"/>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { Notify } from "quasar";
import { getSeasoningConfigs, updateSeasoningConfigs } from "src/api/seasoning";
import ThePumpRatioInput from "pages/systemSettings/pumpSetting/ThePumpRatioInput.vue";
import { UseControllerStore } from "stores/controllerStore";

const useControllerStore = UseControllerStore();

const seasoningConfigs = ref([]);
const liquidSeasoningLevel = ref([
  useControllerStore.pump1LiquidWarning,
  useControllerStore.pump2LiquidWarning,
  useControllerStore.pump3LiquidWarning,
  useControllerStore.pump4LiquidWarning,
  useControllerStore.pump5LiquidWarning,
  useControllerStore.pump6LiquidWarning,
]);

onMounted(async () => {
  const { data } = await getSeasoningConfigs();
  seasoningConfigs.value = data.data;
  console.log(data);
  for (let i = 0; i < seasoningConfigs.value.length; i++) {
    const seasoning = seasoningConfigs.value[i];
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
