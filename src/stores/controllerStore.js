import { defineStore } from "pinia";
import { fetchStatus } from "src/api/controller";

export const UseControllerStore = defineStore("controller", {
  state: () => ({
    isCooking: false,
    isRunning: false,
    isPausing: false,
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
      this.isCooking = data.data["currentCommandName"] === "cook";
      this.isRunning = data.data["currentCommandName"] !== "";
      this.isPausing = data.data["isPausing"];
    }
  },
});
