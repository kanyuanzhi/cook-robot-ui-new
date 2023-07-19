import { defineStore } from "pinia";
import { fetchStatus } from "src/api/controller";

export const UseControllerStore = defineStore("controller", {
  state: () => ({
    currentDish: {},
    isCooking: false,
    isRunning: false,
    isPausing: false,
    runningCommandName: ""
  }),
  getters: {
    getCurrentDish: (state) => state.currentDish,
  },
  actions: {
    setCurrentDish(dish) {
      this.currentDish = dish;
    },
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
