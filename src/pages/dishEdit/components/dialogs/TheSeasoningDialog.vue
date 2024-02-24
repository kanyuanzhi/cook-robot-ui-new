<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide">
      <!--      <q-card style="width: 400px" class="q-px-sm q-mt-md">-->
      <q-card style="width: 600px" class="q-mt-md">
        <q-card-section class="bg-teal-6 text-white q-py-sm">
          <div class="text-h6">{{ $t("dishEdit.seasoningDialog.title") }}</div>
        </q-card-section>
        <q-card-section>
          <TheSeasoningItem v-for="(seasoning,index) in seasonings" :key="seasoning.key" :index="index"
                            :seasoning="seasoning" :seasoning-options="seasoningOptions"
                            @delete="onDelete(index)" @seasoning-select="onSeasoningSelect"
                            @weight-select="onWeightSelect"/>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="teal-6">{{ $t("common.cancel") }}</q-btn>
          <q-btn color="teal-6" @click="onAdd">{{ $t("dishEdit.seasoningDialog.add") }}</q-btn>
          <q-btn color="teal-6" unelevated @click="onSubmit">{{ $t("common.submit") }}</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import TheSeasoningItem from "pages/dishEdit/components/TheSeasoningItem.vue";
import { cloneDeep } from "lodash/lang";
import { Notify } from "quasar";
import { getSeasonings } from "src/api/seasoning";
import { newSeasoningStep } from "pages/dishEdit/components/dialogs/newStep";
import { getAPI } from "src/api";
import { useI18n } from "vue-i18n";
import { UseAppStore } from "stores/appStore";

const {t} = useI18n();

const emits = defineEmits(["update", "submit"]);
const appStore = UseAppStore();

const shown = ref(false);

let isUpdate = false;
let stepIndex = 0;

const emptySeasoning = {
  key: new Date().getTime(),
  label: "",
  pumpNumber: 0,
  weight: 0,
};

const seasonings = ref([
  cloneDeep(emptySeasoning),
]);

const seasoningOptionsTpl = [];
const seasoningOptions = ref([]);

const show = async (index = -1) => {
  shown.value = true;
  stepIndex = index;
  const { data } = await getAPI("/seasoning/list");
  const seasoningsData = data.seasonings;
  seasoningsData.forEach(seasoning => {
    if (![7, 8].includes(seasoning.pump)) {// 7、8号阀为自来水阀，不做调料阀
      seasoningOptionsTpl.push(
          {
            label: formatSeasoningName(seasoning),
            pumpNumber: seasoning.pump,
          },
      );
    }
  });
  seasoningOptions.value = seasoningOptionsTpl;
};

const updateDialogShow = async (step, index) => {
  shown.value = true;
  isUpdate = true;
  stepIndex = index;
  seasonings.value = step.seasonings;
  const { data } = await getAPI("/seasoning/list");
  const seasoningsData = data.seasonings;
  seasoningsData.forEach(seasoning => {
    if (![7, 8].includes(seasoning.pump)) {// 7、8号阀为自来水阀，不做调料阀
      seasoningOptionsTpl.push(
          {
            label: formatSeasoningName(seasoning),
            pumpNumber: seasoning.pump,
          },
      );
    }
  });
  generateSeasoningOptions();
};

const formatSeasoningName = (seasoning) => {
  if (appStore.getLocal() === "cn") {
    return seasoning.name;
  } else if (appStore.getLocal() === "en") {
    return seasoning.nameEn;
  } else if (appStore.getLocal() === "tw") {
    return seasoning.nameTw;
  }
};

const onAdd = () => {
  if (seasonings.value.length > 4) {
    Notify.create({
      message: t("dishEdit.seasoningDialog.maxWarningMsg"),
      type: "warning",
    });
    return;
  }
  const tempSeasoning = cloneDeep(emptySeasoning);
  tempSeasoning.key = new Date().getTime();
  seasonings.value.push(tempSeasoning);
};

const onDelete = (index) => {
  if (seasonings.value.length === 1) {
    Notify.create({
      message: t("dishEdit.seasoningDialog.minWarningMsg"),
      type: "warning",
    });
    return;
  }
  seasonings.value.splice(index, 1);
};

const onSubmit = () => {
  try {
    const newStep = newSeasoningStep(seasonings.value);
    if (newStep === null) return; // 至少添加1中调料
    emits(isUpdate ? "update" : "submit", newStep, stepIndex);
  } catch (e) {
    return;
  }
  isUpdate = false;
  stepIndex = 0;
  shown.value = false;
};

const onSeasoningSelect = (val, index) => {
  seasonings.value[index].label = val.label;
  seasonings.value[index].pumpNumber = val.pumpNumber;
  generateSeasoningOptions();
};

const onWeightSelect = (val, index) => {
  seasonings.value[index].weight = val;
};

const onHide = () => {
  seasonings.value = [cloneDeep(emptySeasoning)];
  seasoningOptions.value = [];
  seasoningOptionsTpl.length = 0;
};

const generateSeasoningOptions = () => {
  seasoningOptions.value = [];
  for (let i = 0; i < seasoningOptionsTpl.length; i++) {
    let isSelected = false;
    for (let j = 0; j < seasonings.value.length; j++) {
      if (seasoningOptionsTpl[i].pumpNumber === seasonings.value[j].pumpNumber) {
        isSelected = true;
        break;
      }
    }
    if (!isSelected) {
      seasoningOptions.value.push(seasoningOptionsTpl[i]);
    }
  }
};

defineExpose({
  show,
  updateDialogShow,
});
</script>

<style lang="scss" scoped></style>
