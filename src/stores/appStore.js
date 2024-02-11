import { defineStore } from "pinia";
import { ref } from "vue";
import { cloneDeep } from "lodash/lang";

export const UseAppStore = defineStore("app", {
  state: () => ({
    runningControlShown: false,
    editingDish: {
      id: 0,
      steps: [],
      customStepsList: {},
      name: "",
      cuisine: 1,
      uuid: "",
    },
    editingDishChangedFlag: true,
    originEditingDish: {
      id: 0,
      steps: [],
      customStepsList: {},
      name: "",
      cuisine: 1,
      uuid: "",
    },
    runningDish: {},
    customStepsUUID: "",

    useEasyStepList: true,
    lastStirFryGear: 0,
    dishQrScanningShown: false,
    dishDetailsCardShown: false,
    dishDetailsCardUUID: "",

    cuisineTab: 0,
    cuisinePage: 1,
    isBackFromDishEdit: false,

    dishSourceTab: "official", // official|personal

    pageTitle: "",
    backBtnShown: false,

    searchFilter: "", // search filter for dish list
  }),
  getters: {
    // getCurrentDish: (state) => state.runningDish,
  },
  actions: {
    showRunningControl () {
      this.runningControlShown = true;
    },
    closeRunningControl () {
      this.runningControlShown = false;
    },
    setEditingDish (dish) {
      this.editingDish = cloneDeep(dish);
      this.originEditingDish = cloneDeep(dish);
      this.shiftEditingDishChangedFlag();
    },
    resetEditingDish () {
      this.editingDish = cloneDeep(this.originEditingDish);
      this.shiftEditingDishChangedFlag();
    },
    newEditingDish () {
      this.editingDish = {
        id: 0,
        steps: [],
        customStepsList: {},
        name: "",
        cuisine: 1,
        uuid: "",
      };
      this.originEditingDish = {
        id: 0,
        steps: [],
        customStepsList: {},
        name: "",
        cuisine: 1,
        uuid: "",
      };
      this.shiftEditingDishChangedFlag();
    },
    setRunningDish (dish, customStepsUUID) {
      if (customStepsUUID !== "") {
        dish.steps = dish.customStepsList[customStepsUUID];
      }
      this.runningDish = dish;
      this.customStepsUUID = customStepsUUID;
    },
    shiftUseEasyStepList () {
      this.useEasyStepList = !this.useEasyStepList;
    },
    setLastStirFryGear (gear) {
      this.lastStirFryGear = gear;
    },
    shiftEditingDishChangedFlag () {
      this.editingDishChangedFlag = !this.editingDishChangedFlag;
    },
    showDishQrScanning () {
      this.dishQrScanningShown = true;
    },
    hideDishQrScanning () {
      this.dishQrScanningShown = false;
    },
    showDishDetailsCard (uuid) {
      this.dishDetailsCardUUID = uuid;
      this.dishDetailsCardShown = true;
    },
    setCuisineTab (tab) {
      this.cuisineTab = tab;
    },
    setCuisinePage (page) {
      this.cuisinePage = page;
    },
    setIsBackFromDishEdit (isBackFromDishEdit) {
      this.isBackFromDishEdit = isBackFromDishEdit;
    },
    setPageTitle (title) {
      this.pageTitle = title;
    },
    setBackBtnShown (shown) {
      this.backBtnShown = shown;
    },
    setSearchFilter (filter) {
      this.searchFilter = filter;
    }
  },
});
