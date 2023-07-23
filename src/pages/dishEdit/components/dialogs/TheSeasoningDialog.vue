<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide">
      <!--      <q-card style="width: 400px" class="q-px-sm q-mt-md">-->
      <q-card style="width: 600px" class="q-mt-md">
        <q-card-section class="bg-teal-6 text-white q-py-sm">
          <div class="text-h6">添加调料</div>
        </q-card-section>
        <q-card-section>
          <TheSeasoningItem v-for="(seasoning,index) in seasonings" :key="seasoning.key"
                            :seasoning="seasoning" :seasoning-options="seasoningOptions" @delete="onDelete(index)"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="teal-6">取消</q-btn>
          <q-btn color="teal-6" @click="onAdd">添加新调料</q-btn>
          <q-btn color="teal-6" unelevated @click="onSubmit">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import TheSeasoningItem from "pages/dishEdit/components/TheSeasoningItem.vue";
import { cloneDeep } from "lodash/lang";
import { Notify } from "quasar";
import { getSeasonings } from "src/api/seasoning";
import { newSeasoningStep } from "pages/dishEdit/components/dialogs/newStep";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

let isUpdate = false;
let stepIndex = 0;

const emptySeasoning = {
  key: new Date().getTime(),
  label: "",
  pumpNumber: 0,
  weight: 0
};

const seasonings = ref([
  cloneDeep(emptySeasoning)
]);

const seasoningOptions = ref([]);

const show = async () => {
  shown.value = true;
  const { data } = await getSeasonings();
  const seasoningMap = data.data;
  for (let i in seasoningMap) {
    seasoningOptions.value.push(
      {
        label: seasoningMap[i],
        pumpNumber: Number(i)
      }
    );
  }
};

const updateDialogShow = async (step, index) => {
  shown.value = true;
  isUpdate = true;
  stepIndex = index;
  seasonings.value = step.seasonings;
  const { data } = await getSeasonings();
  const seasoningMap = data.data;
  for (let i in seasoningMap) {
    seasoningOptions.value.push(
      {
        label: seasoningMap[i],
        pumpNumber: Number(i)
      }
    );
  }
};

const onAdd = () => {
  if (seasonings.value.length > 4) {
    Notify.create("同时添加调料数量不能超过5个");
    return;
  }
  const tempSeasoning = cloneDeep(emptySeasoning);
  tempSeasoning.key = new Date().getTime();
  seasonings.value.push(tempSeasoning);
};

const onDelete = (index) => {
  if (seasonings.value.length === 1) {
    Notify.create("至少添加1种调料");
    return;
  }
  seasonings.value.splice(index, 1);
};

const onSubmit = () => {
  try {
    const newStep = newSeasoningStep(seasonings.value);
    if (newStep === null) return; // 至少添加1中调料
    if (isUpdate) {
      emits("update", newStep, stepIndex);
    } else {
      emits("submit", newStep);
    }
  } catch (e) {
    return;
  }
  isUpdate = false;
  stepIndex = 0;
  shown.value = false;
};

const onHide = () => {
  seasonings.value = [cloneDeep(emptySeasoning)];
  seasoningOptions.value = [];
};

defineExpose({
  show,
  updateDialogShow
});
</script>

<style lang="scss" scoped></style>
