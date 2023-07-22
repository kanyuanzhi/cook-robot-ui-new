import { defineStore } from "pinia";
import { fetchStatus } from "src/api/controller";
import { floor } from "lodash";

export const UseControllerStore = defineStore("controller", {
  state: () => ({
    runningCommandName: "",
    isCooking: false,
    isRunning: false,
    isPausing: false,
    isPausingWithMovingFinished: false,
    isPausingWithMovingBackFinished: false,
    isStirFrying: false,
    bottomTemperature: 0,
    infraredTemperature: 0,
    cookingTime: 0,
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
      this.runningCommandName = data.data["currentCommandName"];
      this.isCooking = data.data["isCooking"];
      this.isRunning = data.data["isRunning"];
      this.isPausing = data.data["isPausing"];
      this.isPausingWithMovingFinished = data.data["isPausingWithMovingFinished"];
      this.isPausingWithMovingBackFinished = data.data["isPausingWithMovingBackFinished"];
      this.isStirFrying = data.data["isStirFrying"];
      this.bottomTemperature = data.data["bottomTemperature"] / 10;
      this.infraredTemperature = data.data["infraredTemperature"] / 10;
      this.cookingTime = floor(data.data["cookingTime"] / 1000);
    }
  },
});
