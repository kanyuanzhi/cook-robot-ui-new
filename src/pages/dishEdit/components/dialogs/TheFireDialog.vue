<template>
  <div>
    <q-dialog v-model="shown" @hide="onHide">
      <q-card style="width: 600px" class="q-mt-md">
        <q-card-section class="bg-teal-6 text-white q-py-sm">
          <div class="text-h6">{{ $t("dishEdit.fireDialog.title") }}</div>
        </q-card-section>
        <q-card-section>
          <q-item>
            <q-item-section avatar>{{ $t("dishEdit.fireDialog.heatingTemperature") }}</q-item-section>
            <q-item-section>
              <q-slider
                  v-model="temperature"
                  :min="0"
                  :max="220"
                  :step="1"
                  color="red-6"
              />
            </q-item-section>
            <q-item-section side style="width: 130px;"><span class="text-black"><span>{{
                temperature
              }}</span>{{ $t("dishEdit.fireDialog.unit") }}</span></q-item-section>
          </q-item>


          <q-item>
            <q-item-section avatar>{{ $t("dishEdit.fireDialog.judgeType") }}</q-item-section>
            <q-item-section>
              <q-btn-toggle
                  v-model="judgeType"
                  no-caps
                  size="md"
                  unelevated
                  toggle-color="teal-6"
                  color="white"
                  text-color="grey-7"
                  :options="useSettingStore.isNewMachine?newMachineOptions:oldMachineOptions"
              />
            </q-item-section>
          </q-item>
          <q-item dense>
            <q-item-section avatar><span style="color: rgba(0,0,0,0%)">四个汉字</span></q-item-section>
            <q-item-section>
            <span class="text-grey-7" style="font-size: 12px">
              <span class="text-red">*</span>
              {{ $t("dishEdit.fireDialog.instruction") }}
            </span>
            </q-item-section>
          </q-item>

          <NumberSelect ref="numberSelect" :label="$t('dishEdit.fireDialog.targetTemperature')"
                        :unit="$t('dishEdit.fireDialog.unit')" :min="0" :max="220" :step="5"
                        :number="targetTemperature" :disable="judgeType===3||judgeType === 4"
                        @update="(v)=>targetTemperature=v"/>

          <!--          <DurationSelect ref="durationSelect" :duration="duration"-->
          <!--                          :disable="judgeType===1||judgeType===2||judgeType === 4"-->
          <!--                          @update="(v)=>{duration=v}"/>-->
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="teal-6">{{ $t("common.cancel") }}</q-btn>
          <q-btn color="teal-6" unelevated @click="onSubmit">{{ $t("common.submit") }}</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DurationSelect from "pages/dishEdit/components/select/DurationSelect.vue";
import NumberSelect from "pages/dishEdit/components/select/NumberSelect.vue";
import { newHeatStep } from "pages/dishEdit/components/dialogs/newStep";
import { UseSettingStore } from "stores/settingStore";
import { useI18n } from "vue-i18n";

const useSettingStore = UseSettingStore();

const { t } = useI18n();

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const temperature = ref(0);
const targetTemperature = ref(0);
const duration = ref(0);
const judgeType = ref(4);

let isUpdate = false;
let stepIndex = 0;

const show = (index = -1) => {
  shown.value = true;
  stepIndex = index;
};

const updateDialogShow = (step, index) => {
  shown.value = true;
  isUpdate = true;
  stepIndex = index;
  temperature.value = step.temperature;
  targetTemperature.value = step.targetTemperature;
  duration.value = step.duration;
  judgeType.value = step.judgeType;
};

const onSubmit = () => {
  try {
    const newStep = newHeatStep(temperature.value, judgeType.value, targetTemperature.value, duration.value);
    emits(isUpdate ? "update" : "submit", newStep, stepIndex);
  } catch (e) {
    return;
  }
  isUpdate = false;
  stepIndex = 0;
  shown.value = false;
};

const onHide = () => {
  temperature.value = 0;
  targetTemperature.value = 0;
  duration.value = 0;
  judgeType.value = 4;
};

const newMachineOptions = [
  {
    label: t("dishEdit.fireDialog.judgeTypeOption.targetJudge"),
    value: 2,
  },
  // {label: '时间', value: 3},
  {
    label: t("dishEdit.fireDialog.judgeTypeOption.noJudge"),
    value: 4,
  },
];

const oldMachineOptions = [
  {
    label: "锅底温度",
    value: 1,
  },
  {
    label: "红外温度",
    value: 2,
  },
  // {label: '时间', value: 3},
  {
    label: "无",
    value: 4,
  },
];

defineExpose({
  show,
  updateDialogShow,
});
</script>

<style lang="scss" scoped></style>
