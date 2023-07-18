<template>
  <div>
    <q-dialog v-model="shown" persistent @hide="onHide">
      <q-card style="width: 500px" class="q-px-sm q-mt-md">
        <q-card-section>
          <div class="text-h6">添加火力</div>
        </q-card-section>

        <q-item dense>
          <q-item-section avatar>加热温度</q-item-section>
          <q-item-section>
            <q-slider
              v-model="temperature"
              :min="0"
              :max="220"
              :step="1"
              color="red-6"
            />
            <!--            <q-slider-->
            <!--              v-model="temperature"-->
            <!--              :min="0"-->
            <!--              :max="220"-->
            <!--              :step="1"-->
            <!--              label-->
            <!--              :label-value="temperature + '摄氏度（℃）'"-->
            <!--              label-always-->
            <!--              color="red-6"-->
            <!--            />-->
          </q-item-section>
          <q-item-section side style="width: 130px;"><span class="text-black"><span>{{ temperature }}</span>摄氏度（℃）</span></q-item-section>
        </q-item>


        <q-item dense>
          <q-item-section avatar>控制方式</q-item-section>
          <q-item-section>
            <q-btn-toggle
              v-model="judgeType"
              class="my-custom-toggle"
              size="md"
              unelevated
              toggle-color="primary"
              color="white"
              text-color="grey-7"
              :options="[
          {label: '锅底温度', value: 1},
          {label: '红外温度', value: 2},
          {label: '时间', value: 3},
          {label: '无', value: 4},
        ]"
            />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar><span style="color: rgba(0,0,0,0%)">四个汉字</span></q-item-section>
          <q-item-section>
            <span class="text-grey-7" style="font-size: 10px">
              <span class="text-red">*</span>控制加热达到以下设定温度或时间后，继续下一步骤，选择无则加热后直接开始下一步骤</span>
          </q-item-section>
        </q-item>

        <NumberSelect ref="numberSelect" label="温度控制" unit="摄氏度（℃）" :min="0" :max="220" :step="5"
                      :number="targetTemperature" :disable="judgeType===3||judgeType === 4"
                      @update="(v)=>targetTemperature=v"/>

        <DurationSelect ref="durationSelect" :duration="duration"
                        :disable="judgeType===1||judgeType===2||judgeType === 4"
                        @update="(v)=>{duration=v}"/>

        <q-card-actions align="right">
          <q-btn v-close-popup flat color="">取消</q-btn>
          <q-btn flat color="primary" @click="onSubmit">提交</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DurationSelect from "pages/dishEdit/components/select/DurationSelect.vue";
import NumberSelect from "pages/dishEdit/components/select/NumberSelect.vue";

const emits = defineEmits(["update", "submit"]);

const shown = ref(false);

const temperature = ref(0);
const targetTemperature = ref(0);
const duration = ref(0);
const judgeType = ref(4);

let isUpdate = false;
let stepIndex = 0;

const show = (step, index) => {
  shown.value = true;
  // setTimeout(() => {
  //   if (step !== undefined) {
  //     isUpdate = true;
  //     stepIndex = index;
  //     gearSlider.value.setGear(step.gear);
  //     timeSelect.value.setTime(step.time);
  //   }
  // }, 100);
};

const onSubmit = () => {
  try {
    const newStep = {
      name: "加热" + temperature.value + "℃",
      temperature: temperature.value,
      targetTemperature: targetTemperature.value,
      duration: duration.value,
      judgeType: judgeType.value,
      key: Date.now(),
      type: "heat"
    };
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
  temperature.value = 0;
  targetTemperature.value = 0;
  duration.value = 0;
  judgeType.value = 4;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped></style>
