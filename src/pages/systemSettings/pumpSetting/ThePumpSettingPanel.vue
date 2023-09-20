<template>
  <q-form
      @submit="onSubmit"
      @reset="onReset"
  >
    <div class="row q-col-gutter-x-lg">
      <ThePumpRatioInput v-for="(seasoning,index) in seasonings" :key="seasoning.uuid"
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
import { getAPI, putAPI } from "src/api";

const useControllerStore = UseControllerStore();

const seasonings = ref([]);

onMounted(async () => {
  const { data } = await getAPI("/seasoning/list");
  seasonings.value = data.seasonings;
  for (let i = 0; i < seasonings.value.length; i++) {
    Reflect.set(seasonings.value[i], "editingRatio", seasonings.value[i].ratio);
  }
});

const onSubmit = async () => {
  try {
    const pumpRatios = [];
    for (let seasoning of seasonings.value) {
      seasoning.ratio = seasoning.editingRatio;
    }
    const { message } = await putAPI("/seasoning/update-pumpRatios", { seasonings: seasonings.value });
    Notify.create(message);
  } catch (e) {
    console.log(e.toString());
  }
};
const onReset = () => {
  for (let seasoning of seasonings.value) {
    seasoning.editingRatio = seasoning.ratio;
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: calc(100vh - 50px - 50px - 16px - 1px);
}
</style>
