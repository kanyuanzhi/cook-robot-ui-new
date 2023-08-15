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
    editingDishChangedFlag: true,
    originEditingDish: {
      steps: [],
      name: "",
      cuisine: 1,
      uuid: ""
    },
    runningDish: {},
    useEasyStepList: true,
    lastStirFryGear: 0,
    dishQrScanningShown: false,
    dishDetailsCardShown: false,
    dishDetailsCardUUID: "",

    pageTitle: ""
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
      this.shiftEditingDishChangedFlag();
    },
    resetEditingDish() {
      this.editingDish = cloneDeep(this.originEditingDish);
      this.shiftEditingDishChangedFlag();
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
      this.shiftEditingDishChangedFlag();
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
    shiftEditingDishChangedFlag() {
      this.editingDishChangedFlag = !this.editingDishChangedFlag;
    },
    showDishQrScanning() {
      this.dishQrScanningShown = true;
    },
    hideDishQrScanning() {
      this.dishQrScanningShown = false;
    },
    showDishDetailsCard(uuid) {
      this.dishDetailsCardUUID = uuid;
      this.dishDetailsCardShown = true;
    },
    setPageTitle(title) {
      this.pageTitle = title;
    }
  },
});
