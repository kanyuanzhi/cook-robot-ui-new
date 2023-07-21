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
      <q-card-section class="flex flex-center" style="height: 250px;">
        <template v-if="useControllerStore.isRunning">
          <q-spinner-bars
            color="teal-6"
            size="4em"
          />
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
      <q-card-actions align="around">
        <q-btn-group spread unelevated class="full-width">
          <template v-if="useControllerStore.isCooking">
            <q-btn v-if="!useControllerStore.isPausing" :disable="!useControllerStore.isPausingWithMovingBackFinished"
                   color="teal-6" label="中途加料" icon="mdi-shaker"
                   @click="sendCommand('pause_to_add')"/>
            <q-btn v-else :disable="!useControllerStore.isPausingWithMovingFinished"
                   color="teal-6" label="继续炒制" icon="fa-solid fa-play"
                   @click="sendCommand('resume')"/>
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

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();
const router = useRouter();

const runningDishDisplay = computed(() => {
  return useAppStore.runningDish.name === undefined ? "未选择菜品" : useAppStore.runningDish.name;
});

const sendCommand = async (commandName) => {
  let commandType,
    commandData;
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
</script>

<style lang="scss" scoped>

</style>
