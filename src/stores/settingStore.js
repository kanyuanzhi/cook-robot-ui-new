import { defineStore } from "pinia";
import defaultSettings from "../settings";
import { api } from "boot/axios";

const {
  title,
  version,
  useSSL,
  middlePlatformIPAddress,
  isNewMachine
} = defaultSettings;

export const UseSettingStore = defineStore("settings", {
  state: () => ({
    title: title,
    version: version,
    useSSL: useSSL,
    middlePlatformIPAddress: middlePlatformIPAddress,
    isNewMachine: isNewMachine
  }),
  getters: {
    // getCurrentDish: (state) => state.runningDish,
  },
  actions: {
    setMiddlePlatformIPAddress(address) {
      this.middlePlatformIPAddress = address;
      api.defaults.baseURL = (this.useSSL ? "https" : "http") + "://" + address + ":8889/api/v1";
    }
  },
});
