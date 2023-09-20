import { defineStore } from "pinia";
import { fetchStatus } from "src/api/controller";
import { floor } from "lodash";
import { UseAppStore } from "stores/appStore";
import { getDish } from "src/api/dish";
import { getAPI } from "src/api";

export const UseControllerStore = defineStore("controller", {
  state: () => ({
    currentCommandName: "",
    currentDishUUID: "",
    currentDishCustomStepsUUID: "",
    currentInstructionInfo: {
      type: "",
      name: "",
      index: 0,
      actionNumber: 0,
    },
    isCooking: false,
    lastIsCooking: false, // 前一个收到的isCooking的值
    isCookFinished: true,
    isRunning: false,
    isPausing: false,
    isPausingWithMovingFinished: false,
    isPausingWithMovingBackFinished: false,
    isPausePermitted: false,
    bottomTemperature: 0,
    infraredTemperature: 0,
    liquidSeasoningWarning: [],
    cookingTime: 0,
    currentHeatingTemperature: 0,
  }),
  getters: {
    getRunningDish: (state) => state.runningDish,
  },
  actions: {
    setCookingStatus (status) {
      this.isCooking = status;
    },
    async fetchStatus () {
      const { data } = await getAPI("controller/fetch-status");
      const controllerStatus = data.controllerStatus;
      this.currentCommandName = controllerStatus["currentCommandName"];
      this.currentInstructionInfo = controllerStatus["currentInstructionInfo"];
      this.isCooking = controllerStatus["isCooking"];
      if (this.isCooking) {
        this.currentDishUUID = controllerStatus["currentDishUUID"];
        this.currentDishCustomStepsUUID = controllerStatus["currentDishCustomStepsUUID"]; // 空或者是口味uuid
        if (this.currentDishUUID !== UseAppStore().runningDish.uuid) {
          const dishData = await getAPI("dish/get",
            { uuid: this.currentDishUUID });
          UseAppStore().
            setRunningDish(dishData.data.dish, controllerStatus["currentDishCustomStepsUUID"]);
        }
      }
      this.isRunning = controllerStatus["isRunning"];
      this.isPausing = controllerStatus["isPausing"];
      this.isPausingWithMovingFinished = controllerStatus["isPausingWithMovingFinished"];
      this.isPausingWithMovingBackFinished = controllerStatus["isPausingWithMovingBackFinished"];
      this.isPausePermitted = controllerStatus["isPausePermitted"];
      this.bottomTemperature = controllerStatus["bottomTemperature"] / 10;
      this.infraredTemperature = controllerStatus["infraredTemperature"] / 10;
      this.liquidSeasoningWarning = [
        controllerStatus["pump1LiquidWarning"] === 100,
        controllerStatus["pump2LiquidWarning"] === 100,
        controllerStatus["pump3LiquidWarning"] === 100,
        controllerStatus["pump4LiquidWarning"] === 100,
        controllerStatus["pump5LiquidWarning"] === 100,
        controllerStatus["pump6LiquidWarning"] === 100,
      ];
      this.cookingTime = floor(controllerStatus["cookingTime"] / 1000);
      this.currentHeatingTemperature = controllerStatus["currentHeatingTemperature"] /
        10;

      if (!this.isCooking && this.lastIsCooking) {
        this.isCookFinished = true;
      } else {
        this.lastIsCooking = controllerStatus["isCooking"];
        this.isCookFinished = false;
      }
    },
  },
});
