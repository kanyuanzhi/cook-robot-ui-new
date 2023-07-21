import { defineStore } from "pinia";
import { fetchStatus } from "src/api/controller";

export const UseControllerStore = defineStore("controller", {
  state: () => ({
    isCooking: false,
    isRunning: false,
    isPausing: false,
    isPausingWithMovingFinished: false,
    isPausingWithMovingBackFinished: false,
    runningCommandName: ""
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
    }
  },
});
