<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-teal-6">
      <q-toolbar>
        <q-btn flat round dense icon="home" to="/"/>
        <q-toolbar-title>
          Cook Robot
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-footer bordered class="bg-white text-primary">
      <q-toolbar @click="useAppStore.showRunningControl()">
        <q-space/>
        <q-toolbar-title class="text-center">
          <q-spinner-dots
            v-if="useControllerStore.isRunning"
            color="teal-6"
            size="2em"
          />
          <span class="text-teal-6">&nbsp; {{ statusBarText }} &nbsp;</span>
          <q-spinner-dots
            v-if="useControllerStore.isRunning"
            color="teal-6"
            size="2em"
          />
        </q-toolbar-title>
        <q-space/>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-dialog v-model="useAppStore.runningControlShown" position="standard">
      <q-card style="width: 600px;">
        <!--        <q-linear-progress :value="0.6" color="pink" />-->
        <q-card-section class="text-center bg-teal-6">
          <div class="text-h6 text-white">运行控制</div>
        </q-card-section>
        <q-card-section class="text-center q-py-sm">
          <span class="text-subtitle1 text-teal-6">{{ runningDishText }}</span>
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
              @click="startCook"/>
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
              <q-btn v-if="!useControllerStore.isPausing" color="teal-6" label="中途加料" icon="mdi-shaker"
                     @click="pauseToAdd"/>
              <q-btn v-else color="teal-6" label="继续炒制" icon="fa-solid fa-play" @click="resume"/>
              <q-separator vertical/>
              <q-btn color="teal-6" label="开门" icon="lock_open" @click="startUnlock"/>
            </template>
            <template v-else>
              <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="复位" icon="restart_alt" @click="startReset"/>
              <q-separator vertical/>
              <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="清洗" icon="mdi-washing-machine"/>
              <q-separator vertical/>
              <q-btn color="teal-6" label="开门" icon="lock_open" @click="startUnlock"/>
              <q-separator vertical/>
              <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="出菜" icon="fa-solid fa-plate-wheat" @click="startDishOut"/>
            </template>
          </q-btn-group>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";
import { execute } from "src/api/controller";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Notify } from "quasar";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();
const router = useRouter();

const statusBarText = computed(() => {
  switch (useControllerStore.runningCommandName) {
    case "cook":
      return useControllerStore.isPausing ? "暂停中" : "炒制" + useAppStore.runningDish.name + "中";
    case "wash":
      return "清洗中";
    case "reset":
      return "复位中";
    case "dish_out":
      return "出菜中";
    case "":
      return "待机等待";
    default:
      return "状态错误";
  }
});

const runningDishText = computed(() => {
  return useAppStore.runningDish.name === undefined ? "未选择菜品" : useAppStore.runningDish.name;
});

setInterval(useControllerStore.fetchStatus, 200);

const startCook = async () => {
  await execute("multiple", "cook", useAppStore.runningDish.uuid);
};
const startReset = async () => {
  const { data } = await execute("multiple", "reset");
  if (data.message === "error") {
    Notify.create("机器正在执行其他命令，请稍后");
  }
};

const startDishOut = async () => {
  const { data } = await execute("multiple", "dish_out");
  if (data.message === "error") {
    Notify.create("机器正在执行其他命令，请稍后");
  }
};

const startUnlock = async () => {
  const { data } = await execute("single", "unlock");
};

const pauseToAdd = async () => {
  const { data } = await execute("single", "pause_to_add");
};

const resume = async () => {
  const { data } = await execute("single", "resume");
};
</script>
