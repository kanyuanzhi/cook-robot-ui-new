<template>
  <q-dialog v-model="useAppStore.runningControlShown" position="standard">
    <q-card style="width: 600px;">
      <!--        <q-linear-progress :value="0.6" color="pink" />-->
      <q-card-section class="text-center q-py-md">
        <div class="text-h6 text-black">{{ $t("controlDialog.title") }}</div>
      </q-card-section>
      <q-card-section class="q-py-none">
        <div class="bg-teal-6 q-py-sm text-center" style="border-radius: 10px">
          <span class="text-subtitle1 text-weight-bold text-white">{{ runningDishDisplay }}</span>
        </div>
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
              <span>{{ formatInstructionName(useControllerStore.currentInstructionInfo.name) }}</span>
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
              @click="startCook"/>
          <q-btn
              v-else
              color="teal-6"
              size="20px"
              :label="$t('controlDialog.selectDish')"
              @click="router.push('/dishSelect')" v-close-popup/>
        </template>
      </q-card-section>
      <q-card-section class="q-py-sm">
        <div v-if="!useSettingStore.isNewMachine" class="row justify-around">
          <q-chip :color="getTemperatureColor(useControllerStore.bottomTemperature)" text-color="white"
                  icon="thermostat">
            {{ $t("controlDialog.bottomTemperature") }}<span class="text-center" style="width: 40px">{{
              useControllerStore.bottomTemperature
            }}</span>℃
          </q-chip>
          <q-btn v-if="useControllerStore.isCooking"
                 :color="getTemperatureColor(useControllerStore.currentHeatingTemperature)" rounded unelevated
                 :label="$t('controlDialog.heatControl')" push
                 @click="openTemperatureControlDialog()"/>
          <q-chip :color="getTemperatureColor(useControllerStore.infraredTemperature)" text-color="white"
                  icon="thermostat">
            {{ $t("controlDialog.infraredTemperature") }}<span class="text-center" style="width: 40px">{{
              useControllerStore.infraredTemperature
            }}</span>℃
          </q-chip>
        </div>
        <div v-else class="row justify-center">
          <q-btn :color="getTemperatureColor(useControllerStore.infraredTemperature)" text-color="white"
                 icon="thermostat" class="text-center" rounded unelevated :push="useControllerStore.isCooking"
                 @click="onTemperatureBtnClick">
            {{ $t("controlDialog.inPotTemperature") }}<span class="text-center" style="width: 40px">{{
              useControllerStore.infraredTemperature
            }}</span>℃
          </q-btn>
          <!--          <q-btn v-if="useControllerStore.isCooking"-->
          <!--                 :color="getTemperatureColor(useControllerStore.currentHeatingTemperature)" rounded unelevated-->
          <!--                 label="加热控制" push-->
          <!--                 @click="openTemperatureControlDialog()"/>-->
        </div>
      </q-card-section>
      <q-card-actions align="around" class="q-pa-md">
        <q-btn-group spread unelevated class="full-width" style="border-radius: 20px">
          <template v-if="useControllerStore.isCooking">
            <q-btn class="text-subtitle1" color="teal-6" :label="$t('controlDialog.shutdown')" icon="stop" push
                   @click="shutdown"/>
            <q-separator vertical/>
            <q-btn v-if="!useControllerStore.isPausing" class="text-subtitle1" color="teal-6"
                   :label="$t('controlDialog.pauseToAdd')"
                   icon="mdi-shaker" push
                   @click="sendCommand('pause_to_add')"/>
            <q-btn v-else class="text-subtitle1" color="teal-6" :label="$t('controlDialog.resume')"
                   icon="fa-solid fa-play" push
                   @click="sendCommand('resume')"/>
            <!--            <q-btn v-if="!useControllerStore.isPausing" :disable="!useControllerStore.isPausingWithMovingBackFinished"-->
            <!--                   color="teal-6" label="中途加料" icon="mdi-shaker"-->
            <!--                   @click="sendCommand('pause_to_add')"/>-->
            <!--            <q-btn v-else :disable="!useControllerStore.isPausingWithMovingFinished"-->
            <!--                   color="teal-6" label="继续炒制" icon="fa-solid fa-play"-->
            <!--                   @click="sendCommand('resume')"/>-->
            <q-separator vertical/>
            <q-btn class="text-subtitle1" color="teal-6" :label="$t('controlDialog.doorUnlock')" icon="lock_open" push
                   @click="sendCommand('door_unlock')"/>
          </template>
          <template v-else>
            <q-btn class="text-subtitle1" :disable="useControllerStore.isRunning" color="teal-6"
                   :label="$t('controlDialog.prepare')"
                   icon="restart_alt" push
                   @click="sendCommand('prepare')"/>
            <q-separator vertical/>
            <q-btn class="text-subtitle1" :disable="useControllerStore.isRunning" color="teal-6"
                   :label="$t('controlDialog.wash')"
                   icon="mdi-washing-machine" push
                   @click="sendCommand('wash')"/>
            <!--            <q-btn-dropdown class="text-subtitle1" :disable="useControllerStore.isRunning" color="teal-6" label="清洗"-->
            <!--                            push-->
            <!--                            icon="mdi-washing-machine">-->
            <!--              <q-list>-->
            <!--                <q-item clickable class="bg-teal-6 text-white text-center no-padding" v-close-popup-->
            <!--                        @click="sendCommand('wash')">-->
            <!--                  <q-item-section>-->
            <!--                    <div class="flex flex-center">-->
            <!--                      <svg fill="#ffffff" width="22" height="22">-->
            <!--                        <use xlink:href="~/assets/custom-icons.svg#wash"></use>-->
            <!--                      </svg>-->
            <!--                      <span class="q-pl-md">洗锅</span>-->
            <!--                    </div>-->
            <!--                  </q-item-section>-->
            <!--                </q-item>-->
            <!--                <q-separator inset/>-->
            <!--                <q-item clickable class="bg-teal-6 text-white text-center" v-close-popup @click="sendCommand('pour')">-->
            <!--                  <q-item-section>-->
            <!--                    &lt;!&ndash;                    <span><q-icon name="svguse:src/assets/custom-icons.svg#pour" size="19px" class="q-pr-md"/>倒水</span>&ndash;&gt;-->

            <!--                    <div class="flex flex-center">-->
            <!--                      <svg fill="#ffffff" width="22" height="22">-->
            <!--                        <use xlink:href="~/assets/custom-icons.svg#pour"></use>-->
            <!--                      </svg>-->
            <!--                      <span class="q-pl-md">倒水</span>-->
            <!--                    </div>-->
            <!--                  </q-item-section>-->
            <!--                </q-item>-->
            <!--              </q-list>-->
            <!--            </q-btn-dropdown>-->
            <!--            <q-separator vertical/>-->
            <!--            <q-btn :disable="useControllerStore.isRunning" color="teal-6" label="清洗" icon="mdi-washing-machine"-->
            <!--                   @click="sendCommand('wash')"/>-->
            <q-separator vertical/>
            <q-btn class="text-subtitle1" color="teal-6" :label="$t('controlDialog.doorUnlock')" icon="lock_open" push
                   @click="sendCommand('door_unlock')"/>
            <q-separator vertical/>
            <q-btn class="text-subtitle1" :disable="useControllerStore.isRunning" color="teal-6"
                   :label="$t('controlDialog.dishOut')"
                   icon="fa-solid fa-plate-wheat"
                   push @click="startDishOut"/>
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
import { Dialog, Notify } from "quasar";
import { UseSettingStore } from "stores/settingStore";
import { getAPI } from "src/api";
import { useI18n } from "vue-i18n";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();
const useSettingStore = UseSettingStore();
const router = useRouter();

const { t } = useI18n();

const runningDishDisplay = computed(() => {
  if (useControllerStore.currentCommandName === "wash") return t("controlDialog.washing");
  if (useAppStore.runningDish.name === undefined) return t("controlDialog.unselectDish");
  if (useAppStore.customStepsUUID === "") return useAppStore.runningDish.name;
  const customUUIDs = [];
  for (let uuid in useAppStore.runningDish.customStepsList) {
    customUUIDs.push(uuid);
  }
  const customStepsIndex = customUUIDs.indexOf(useAppStore.customStepsUUID);
  return useAppStore.runningDish.name + "（" + t("controlDialog.taste") + (customStepsIndex + 1) + "）";
});

const cookingTimeDisplay = computed(() => {
  return (useControllerStore.isPausing ? t("controlDialog.pausing") : "") +
      secondsToMMSS(useControllerStore.cookingTime);
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

const startCook = async () => {
  if (!await checkLiquidSeasoningLevel()) {
    Dialog.create({
      title: t("common.operateConfirmMsg"),
      message: warningSeasoningName.value.join(t("common.caesuraSign")) +
          t("controlDialog.seasoningInsufficientWaringMsg"),
      ok: {
        push: true,
        color: "teal-6",
        label: t("common.confirm"),
      },
      cancel: {
        push: true,
        color: "grey-6",
        label: t("common.cancel"),
      },
      class: "text-grey-9",
      focus: "none",
    }).onOk(async () => {
      await sendCommand("cook", {
        uuid: useAppStore.runningDish.uuid,
        customStepsUUID: useAppStore.customStepsUUID,
      });
    });
  } else {
    await sendCommand("cook", {
      uuid: useAppStore.runningDish.uuid,
      customStepsUUID: useAppStore.customStepsUUID,
    });
  }
};

const warningSeasoningName = ref([]);

const startDishOut = () => {
  Dialog.create({
    title: t("common.operateConfirmMsg"),
    message: t("controlDialog.dishOutWarningMsg"),
    ok: {
      push: true,
      color: "teal-6",
      label: t("common.confirm"),
    },
    class: "text-grey-9",
  }).onOk(async () => {
    await sendCommand("dish_out");
  });
};

const shutdown = () => {
  Dialog.create({
    title: t("common.operateConfirmMsg"),
    message: t("controlDialog.shutdownWarningMsg"),
    ok: {
      push: true,
      color: "teal-6",
      label: t("common.confirm"),
    },
    class: "text-grey-9",
  }).onOk(async () => {
    await sendCommand("shutdown");
  });
};

const checkLiquidSeasoningLevel = async () => {
  const { data } = await getAPI("seasoning/list");
  const seasonings = data.seasonings;
  const usedSeasoningPumpNumbers = [];
  const warningSeasoningPumpNumber = [];
  for (let step of useAppStore.runningDish.steps) {
    if (step.instructionType === "seasoning") {
      for (let seasoning of step.seasonings) {
        if (usedSeasoningPumpNumbers.indexOf(seasoning.pumpNumber) === -1) {
          usedSeasoningPumpNumbers.push(seasoning.pumpNumber);
          if (useControllerStore.liquidSeasoningWarning[seasoning.pumpNumber - 1] === true) {
            warningSeasoningPumpNumber.push(seasoning.pumpNumber);
          }
        }
      }
    }
    if (step.instructionType === "water" || step.instructionType === "oil") {
      if (usedSeasoningPumpNumbers.indexOf(step.pumpNumber) === -1) {
        usedSeasoningPumpNumbers.push(step.pumpNumber);
        if (useControllerStore.liquidSeasoningWarning[step.pumpNumber - 1] === true) {
          warningSeasoningPumpNumber.push(step.pumpNumber);
        }
      }
    }
  }
  warningSeasoningName.value = [];
  for (let pumpNumber of warningSeasoningPumpNumber) {
    warningSeasoningName.value.push(seasonings[pumpNumber - 1].name);
  }
  if (warningSeasoningName.value.length !== 0) {
    Notify.create({
      message: warningSeasoningName.value.join(t("common.caesuraSign")) +
          t("controlDialog.seasoningInsufficientPrompt"),
      type: "warning",
    });
    return false;
  }
  return true;
};

const onTemperatureBtnClick = () => {
  if (useControllerStore.isCooking) openTemperatureControlDialog();
  else Notify.create({
    message: t("controlDialog.changeTemperatureWarningMsg"),
    type: "warning",
  });
};

const formatInstructionName = (name) => {
  if (useAppStore.getLocal() === "en") {
    if (name === "启动中") return "Starting";
    if (name === "停止中") return "Stopping";
  }
  if (useAppStore.getLocal() === "tw") {
    if (name === "启动中") return "啟動中";
    if (name === "停止中") return "停止中";
  }
  return name;
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
