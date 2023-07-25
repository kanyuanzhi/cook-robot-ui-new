import { defineStore } from "pinia";
import { ref } from "vue";
import { cloneDeep } from "lodash/lang";

export const UseAppStore = defineStore("app", {
  state: () => ({
    runningControlShown: false,
    editingDish: {
      steps: [],
      name: "",
      cuisine: 1,
      uuid: ""
    },
    originEditingDish: {
      steps: [],
      name: "",
      cuisine: 1,
      uuid: ""
    },
    runningDish: {},
    useEasyStepList: false,
    lastStirFryGear: 0,
  }),
  getters: {
    // getCurrentDish: (state) => state.runningDish,
  },
  actions: {
    showRunningControl() {
      this.runningControlShown = true;
    },
    closeRunningControl() {
      this.runningControlShown = false;
    },
    setEditingDish(dish) {
      this.editingDish = cloneDeep(dish);
      this.originEditingDish = cloneDeep(dish);
    },
    resetEditingDish() {
      this.editingDish = cloneDeep(this.originEditingDish);
    },
    newEditingDish() {
      this.editingDish = {
        steps: [],
        name: "",
        cuisine: 1,
        uuid: ""
      };
      this.originEditingDish = {
        steps: [],
        name: "",
        cuisine: 1,
        uuid: ""
      };
    },
    setRunningDish(dish) {
      this.runningDish = dish;
    },
    shiftUseEasyStepList() {
      this.useEasyStepList = !this.useEasyStepList;
    },
    setLastStirFryGear(gear) {
      this.lastStirFryGear = gear;
    },
  },
});
