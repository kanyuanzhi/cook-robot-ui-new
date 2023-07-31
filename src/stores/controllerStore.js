import { defineStore } from "pinia";
import { fetchStatus } from "src/api/controller";
import { floor } from "lodash";
import { UseAppStore } from "stores/appStore";
import { getDish } from "src/api/dish";

export const UseControllerStore = defineStore("controller", {
  state: () => ({
    currentCommandName: "",
    currentDishUuid: "",
    currentInstructionInfo: {
      type: "",
      name: "",
      index: 0,
      actionNumber: 0
    },
    isCooking: false,
    lastIsCooking: false, // 钱一个收到的isCooking的值
    isCookFinished: true,
    isRunning: false,
    isPausing: false,
    isPausingWithMovingFinished: false,
    isPausingWithMovingBackFinished: false,
    isPausePermitted: false,
    bottomTemperature: 0,
    infraredTemperature: 0,
    cookingTime: 0,
    currentHeatingTemperature: 0
  }),
  getters: {
    getRunningDish: (state) => state.runningDish,
  },
  actions: {
    setCookingStatus(status) {
      this.isCooking = status;
    },
    async fetchStatus() {
      const { data } = await fetchStatus();
      this.currentCommandName = data.data["currentCommandName"];
      this.currentInstructionInfo = data.data["currentInstructionInfo"];
      this.isCooking = data.data["isCooking"];
      if (this.isCooking) {
        this.currentDishUuid = data.data["currentDishUuid"];
        if (this.currentDishUuid !== UseAppStore().runningDish.uuid) {
          const dishData = await getDish(this.currentDishUuid);
          UseAppStore()
            .setRunningDish(dishData.data.data);
        }
      }
      this.isRunning = data.data["isRunning"];
      this.isPausing = data.data["isPausing"];
      this.isPausingWithMovingFinished = data.data["isPausingWithMovingFinished"];
      this.isPausingWithMovingBackFinished = data.data["isPausingWithMovingBackFinished"];
      this.isPausePermitted = data.data["isPausePermitted"];
      this.bottomTemperature = data.data["bottomTemperature"] / 10;
      this.infraredTemperature = data.data["infraredTemperature"] / 10;
      this.cookingTime = floor(data.data["cookingTime"] / 1000);
      this.currentHeatingTemperature = data.data["currentHeatingTemperature"] / 10;

      if (!this.isCooking && this.lastIsCooking) {
        this.isCookFinished = true;
      } else {
        this.lastIsCooking = data.data["isCooking"];
        this.isCookFinished = false;
      }
    }
  },
});
