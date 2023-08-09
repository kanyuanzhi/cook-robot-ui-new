<template>
  <div class="column full-width justify-center control-container">
    <div class="col-1 flex flex-center">
      <span class="text-subtitle1 text-teal-6">{{ runningDishDisplay }}</span>
    </div>
    <div class="col-8 column items-center">
      <template v-if="useControllerStore.isRunning">
        <div class="col-4 flex flex-center">
          <q-spinner-hourglass
            v-if="useControllerStore.isPausing"
            color="teal-6"
            size="4em"
          />
          <q-spinner-bars
            v-else
            color="teal-6"
            size="4em"
          />
        </div>
        <div class="col-6 column items-center full-width" v-if="useControllerStore.isCooking">
          <div class="col-3 text-teal-6 text-weight-bold text-subtitle1 text-center">
            <span>{{ useControllerStore.currentInstructionInfo.name }}</span>
          </div>
          <div class="col-3 full-width flex-center flex">
            <TheRunningStepsDisplay style="width: 60%"/>
          </div>
          <div class="col-3 full-width text-center">
            <span class="text-teal-6 text-weight-bold text-subtitle1">{{ cookingTimeDisplay }}</span>
          </div>
        </div>
      </template>
      <div v-else class="col flex flex-center">
        <q-btn
          v-if="useAppStore.runningDish.name !== undefined"
          padding="10px"
          size="35px"
          color="teal-6"
          round
          unelevated
          icon="play_arrow"
          @click="sendCommand('cook',useAppStore.runningDish.uuid)"/>
        <q-btn
          v-else
          color="teal-6"
          size="20px"
          label="请选择菜品"
          @click="router.push('/dishSelect')" v-close-popup/>
      </div>
      <div v-if="useControllerStore.isCooking" class="col-2 flex flex-center">
        <q-btn :color="getTemperatureColor(useControllerStore.currentHeatingTemperature)" rounded unelevated
               label="加热控制"
               @click="openTemperatureControlDialog()"/>
      </div>
    </div>

    <div class="col-1 row justify-around">
      <q-chip :color="getTemperatureColor(useControllerStore.bottomTemperature)" text-color="white"
              icon="thermostat">
        锅底温度<span class="text-center" style="width: 40px">{{ useControllerStore.bottomTemperature }}</span>℃
      </q-chip>

      <q-chip :color="getTemperatureColor(useControllerStore.infraredTemperature)" text-color="white"
              icon="thermostat">
        红外温度<span class="text-center" style="width: 40px">{{ useControllerStore.infraredTemperature }}</span>℃
      </q-chip>
    </div>
    <div class="col-2">
      <div v-if="useControllerStore.isCooking" class="row justify-center q-gutter-x-md">
        <q-btn v-if="!useControllerStore.isPausing"
               color="teal-6" label="中途加料" icon="mdi-shaker"
               @click="sendCommand('pause_to_add')" push/>
        <q-btn v-else
               color="teal-6" label="继续炒制" icon="fa-solid fa-play"
               @click="sendCommand('resume')" push/>
        <!--            <q-btn v-if="!useControllerStore.isPausing" :disable="!useControllerStore.isPausingWithMovingBackFinished"-->
        <!--                   color="teal-6" label="中途加料" icon="mdi-shaker"-->
        <!--                   @click="sendCommand('pause_to_add')"/>-->
        <!--            <q-btn v-else :disable="!useControllerStore.isPausingWithMovingFinished"-->
        <!--                   color="teal-6" label="继续炒制" icon="fa-solid fa-play"-->
        <!--                   @click="sendCommand('resume')"/>-->
        <q-btn color="teal-6" label="开门" icon="lock_open" style="width: 124px"
               @click="sendCommand('door_unlock')" push/>
      </div>
      <div v-else class="column q-gutter-y-md items-center">
        <div class="col row q-gutter-x-md">
          <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="备菜" icon="restart_alt"
                 @click="sendCommand('prepare')" push/>
          <q-btn color="teal-6" label="开门" icon="lock_open" @click="sendCommand('door_unlock')" push/>
          <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="出菜" icon="fa-solid fa-plate-wheat"
                 @click="sendCommand('dish_out')" push/>
        </div>
        <div class="col row q-gutter-x-md">
          <q-btn color="teal-6" label="洗锅" icon="mdi-washing-machine" @click="sendCommand('wash')" push/>
          <q-btn color="teal-6" label="倒水" icon="gas_meter" @click="sendCommand('pour')" push/>
          <!--          <q-btn-dropdown color="teal-6" label="清洗" icon="mdi-washing-machine" push>-->
          <!--            <q-list>-->
          <!--              <q-item clickable class="bg-teal-6 text-white text-center" v-close-popup @click="sendCommand('wash')">-->
          <!--                <q-item-section>-->
          <!--                  <q-item-label>洗锅</q-item-label>-->
          <!--                </q-item-section>-->
          <!--              </q-item>-->
          <!--              <q-separator inset/>-->
          <!--              <q-item clickable class="bg-teal-6 text-white text-center" v-close-popup @click="sendCommand('pour')">-->
          <!--                <q-item-section>-->
          <!--                  <q-item-label>倒水</q-item-label>-->
          <!--                </q-item-section>-->
          <!--              </q-item>-->
          <!--            </q-list>-->
          <!--          </q-btn-dropdown>-->
        </div>
      </div>

    </div>
  </div>
  <TheHeatingTemperatureControlDialog ref="theHeatingTemperatureControlDialog"/>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { secondsToMMSS } from "src/utils/timeFormat";
import TheHeatingTemperatureControlDialog from "layouts/components/TheHeatingTemperatureControlDialog.vue";
import { sendCommand } from "layouts/components/command";
import TheRunningStepsDisplay from "layouts/components/TheRunningStepsDisplay.vue";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();
const router = useRouter();

const runningDishDisplay = computed(() => {
  return useAppStore.runningDish.name === undefined ? "未选择菜品" : useAppStore.runningDish.name;
});

const cookingTimeDisplay = computed(() => {
  return (useControllerStore.isPausing ? "暂停中，已用时" : "") + secondsToMMSS(useControllerStore.cookingTime);
});

const getTemperatureColor = (temperature) => {
  if (temperature <= 35) {
    return "teal-6";
  } else if (temperature <= 100) {
    return "orange-7";
  } else {
    return "red-6";
  }
};

const theHeatingTemperatureControlDialog = ref(null);

const openTemperatureControlDialog = () => {
  theHeatingTemperatureControlDialog.value.show();
};
</script>

<style lang="scss" scoped>
.control-container {
  height: calc(100vh - 50px - 50px - 1px);
}

.q-item {
  min-height: 35px;
}
</style>
