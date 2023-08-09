import { defineStore } from "pinia";
import { Notify } from "quasar";

export const UseMobileStore = defineStore("mobile", {
  state: () => ({
    isScanning: false
  }),
  getters: {
  },
  actions: {
    setScanningStatus(status) {
      this.isScanning = status;
    },
    setTest(){
      Notify.create(12312312)
    }
  },
});
