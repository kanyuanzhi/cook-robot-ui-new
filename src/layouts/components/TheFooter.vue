<template>
  <q-footer bordered class="bg-teal-6 text-white">
    <div class="row" @click="useAppStore.showRunningControl()">
      <q-toolbar class="col-12">
        <q-toolbar-title class="text-center">
          <q-spinner-dots
              v-if="useControllerStore.isRunning"
              size="2em"
          />
          <span>&nbsp; {{ statusBarDisplay }} &nbsp;</span>
          <q-spinner-dots
              v-if="useControllerStore.isRunning"
              size="2em"
          />
        </q-toolbar-title>
      </q-toolbar>

    </div>

  </q-footer>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { UseControllerStore } from "stores/controllerStore";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const useAppStore = UseAppStore();
const useControllerStore = UseControllerStore();
const { t } = useI18n();

const statusBarDisplay = computed(() => {
  if (!useControllerStore.isRunning) return t("footer.status.waiting");
  if (useControllerStore.isPausing) {
    return !useControllerStore.isPausingWithMovingFinished ? t("footer.status.pauseToAdd.moving")
        : t("footer.status.pauseToAdd.permit");
  }
  if (!useControllerStore.isPausingWithMovingBackFinished) return t("footer.status.pauseToAdd.resetting");
  switch (useControllerStore.currentCommandName) {
    case "cook":
      return t("footer.status.firing") + useAppStore.runningDish.name + t("footer.ing");
    case "wash":
      return t("footer.status.washing");
    case "pour":
      return t("footer.status.pouring");
    case "reset":
      return t("footer.status.resetting");
    case "prepare":
      return t("footer.status.preparing");
    case "dish_out":
      return t("footer.status.dishOuting");
    case "withdraw":
      return t("footer.status.withdrawing");
    default:
      return t("footer.status.err");
  }
});
</script>

<style lang="scss" scoped>

</style>
