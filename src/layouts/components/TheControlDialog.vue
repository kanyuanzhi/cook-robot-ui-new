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
              <span>{{ useControllerStore.currentInstructionInfo.name }}</span><br>
              <span>{{
                  "" + useControllerStore.currentInstructionInfo.index + "/" + (useAppStore.runningDish.steps.length + 2)
                }}</span><br>
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
            @click="sendCommand('cook')"/>
          <q-btn
            v-else
            color="teal-6"
            size="20px"
            label="请选择菜品"
            @click="router.push('/dishSelect')" v-close-popup/>
        </template>
      </q-card-section>
      <q-card-section class="no-padding">
        <div class="row justify-around">
          <q-chip :color="bottomTemperatureColor" text-color="white" icon="thermostat">
            锅底温度<span class="text-center" style="width: 40px">{{ useControllerStore.bottomTemperature }}</span>℃
          </q-chip>
          <q-chip :color="infraredTemperatureColor" text-color="white" icon="thermostat">
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
            <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="清洗" icon="mdi-washing-machine"/>
            <q-separator vertical/>
            <q-btn color="teal-6" label="开门" icon="lock_open" @click="sendCommand('door_unlock')"/>
            <q-separator vertical/>
            <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="出菜" icon="fa-solid fa-plate-wheat"
                   @click="sendCommand('dish_out')"/>
          </template>
        </q-btn-group>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { execute } from "src/api/controller";
import { Notify } from "quasar";
import { secondsToMMSS } from "src/utils/timeFormat";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();
const router = useRouter();

const runningDishDisplay = computed(() => {
  return useAppStore.runningDish.name === undefined ? "未选择菜品" : useAppStore.runningDish.name;
});

const sendCommand = async (commandName) => {
  let commandType,
    commandData;
  // cook型命令会在commandData中携带菜品uuid，其他commandData为空
  switch (commandName) {
    case "cook":
      commandType = "multiple";
      commandData = useAppStore.runningDish.uuid;
      break;
    case "prepare":
      commandType = "multiple";
      commandData = "";
      break;
    case "dish_out":
      commandType = "multiple";
      commandData = "";
      break;
    case "pause_to_add":
      if (!useControllerStore.isStirFrying) {
        Notify.create("为确保安全，请在机器运行至翻炒位时中途加料");
        return;
      }
      commandType = "single";
      commandData = "";
      break;
    case "resume":
      commandType = "single";
      commandData = "";
      break;
    case "door_unlock":
      commandType = "single";
      commandData = "";
      break;
    default:
      Notify.create("命令名称错误");
      return;
  }
  const { data } = await execute(commandType, commandName, commandData);
  if (data.message === "error") {
    Notify.create("机器正在执行其他命令，请稍后");
  }
};

const cookingTimeDisplay = computed(() => {
  return (useControllerStore.isPausing ? "暂停中，已用时" : "") + secondsToMMSS(useControllerStore.cookingTime);
});

const bottomTemperatureColor = computed(() => {
  return temperatureColorCompute(useControllerStore.bottomTemperature);
});
const infraredTemperatureColor = computed(() => {
  return temperatureColorCompute(useControllerStore.infraredTemperature);
});

const temperatureColorCompute = (temperature) => {
  if (temperature <= 35) {
    return "teal-6";
  } else if (temperature <= 100) {
    return "orange-7";
  } else {
    return "red-6";
  }
};
</script>

<style lang="scss" scoped>

</style>
