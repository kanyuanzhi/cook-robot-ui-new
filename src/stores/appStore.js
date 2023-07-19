import { defineStore } from "pinia";
import { ref } from "vue";

export const UseAppStore = defineStore("app", {
  state: () => ({
    runningControlShown: false,
  }),
  getters: {
    // getCurrentDish: (state) => state.currentDish,
  },
  actions: {
    showRunningControl() {
      this.runningControlShown = true;
    },
    closeRunningControl() {
      this.runningControlShown = false;
    }
  },
});
