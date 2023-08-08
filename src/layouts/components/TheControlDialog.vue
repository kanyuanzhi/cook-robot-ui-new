<template>
  <q-dialog v-model="useAppStore.runningControlShown" position="standard">
    <q-card style="width: 600px;">
      <!--        <q-linear-progress :value="0.6" color="pink" />-->
      <q-card-section class="text-center bg-teal-6">
        <div class="text-h6 text-white">运行控制</div>
      </q-card-section>
      <q-card-section class="text-center q-py-sm">
        <span class="text-subtitle1 text-teal-6">{{ runningDishDisplay }}</span>
      </q-card-section>
      <q-card-section class="flex flex-center column" style="height: 250px;">
        <template v-if="useControllerStore.isRunning">
          <div>
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
          <template v-if="useControllerStore.isCooking">
            <div class="text-teal-6 text-weight-bold text-subtitle1 text-center q-pt-lg">
              <span>{{ useControllerStore.currentInstructionInfo.name }}</span>
            </div>
            <TheRunningStepsDisplay class="q-my-sm" style="width: 60%"/>

            <!--              <span>{{-->
            <!--                  "" + useControllerStore.currentInstructionInfo.index + "/" + (useAppStore.runningDish.steps.length + 2)-->
            <!--                }}</span><br>-->
            <div class="text-teal-6 text-weight-bold text-subtitle1 text-center">
              <span>{{ cookingTimeDisplay }}</span>
            </div>
          </template>
        </template>
        <template v-else>
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
        </template>
      </q-card-section>
      <q-card-section class="q-py-sm">
        <div class="row justify-around">
          <q-chip :color="getTemperatureColor(useControllerStore.bottomTemperature)" text-color="white"
                  icon="thermostat">
            锅底温度<span class="text-center" style="width: 40px">{{ useControllerStore.bottomTemperature }}</span>℃
          </q-chip>
          <q-btn v-if="useControllerStore.isCooking"
                 :color="getTemperatureColor(useControllerStore.currentHeatingTemperature)" rounded unelevated
                 label="加热控制"
                 @click="openTemperatureControlDialog()"/>
          <q-chip :color="getTemperatureColor(useControllerStore.infraredTemperature)" text-color="white"
                  icon="thermostat">
            红外温度<span class="text-center" style="width: 40px">{{ useControllerStore.infraredTemperature }}</span>℃
          </q-chip>
        </div>
      </q-card-section>
      <q-card-actions align="around">
        <q-btn-group spread unelevated class="full-width">
          <template v-if="useControllerStore.isCooking">
            <q-btn v-if="!useControllerStore.isPausing"
                   color="teal-6" label="中途加料" icon="mdi-shaker"
                   @click="sendCommand('pause_to_add')"/>
            <q-btn v-else
                   color="teal-6" label="继续炒制" icon="fa-solid fa-play"
                   @click="sendCommand('resume')"/>
            <!--            <q-btn v-if="!useControllerStore.isPausing" :disable="!useControllerStore.isPausingWithMovingBackFinished"-->
            <!--                   color="teal-6" label="中途加料" icon="mdi-shaker"-->
            <!--                   @click="sendCommand('pause_to_add')"/>-->
            <!--            <q-btn v-else :disable="!useControllerStore.isPausingWithMovingFinished"-->
            <!--                   color="teal-6" label="继续炒制" icon="fa-solid fa-play"-->
            <!--                   @click="sendCommand('resume')"/>-->
            <q-separator vertical/>
            <q-btn color="teal-6" label="开门" icon="lock_open"
                   @click="sendCommand('door_unlock')"/>
          </template>
          <template v-else>
            <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="备菜" icon="restart_alt"
                   @click="sendCommand('prepare')"/>
            <q-separator vertical/>
            <q-btn-dropdown :disable="useControllerStore.isRunning" color="teal-6" label="清洗"
                            icon="mdi-washing-machine">
              <q-list>
                <q-item clickable class="bg-teal-6 text-white text-center" v-close-popup @click="sendCommand('wash')">
                  <q-item-section>
                    <q-item-label>洗锅</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator inset/>
                <q-item clickable class="bg-teal-6 text-white text-center" v-close-popup @click="sendCommand('pour')">
                  <q-item-section>
                    <q-item-label>倒水</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            <!--            <q-separator vertical/>-->
            <!--            <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="清洗" icon="mdi-washing-machine"-->
            <!--                   @click="sendCommand('wash')"/>-->
            <q-separator vertical/>
            <q-btn color="teal-6" label="开门" icon="lock_open" @click="sendCommand('door_unlock')"/>
            <q-separator vertical/>
            <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="出菜" icon="fa-solid fa-plate-wheat"
                   @click="sendCommand('dish_out')"/>
          </template>
        </q-btn-group>
      </q-card-actions>
    </q-card>
    <TheHeatingTemperatureControlDialog ref="theHeatingTemperatureControlDialog"/>
  </q-dialog>
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
.q-item {
  min-height: 43px;
}
</style>
