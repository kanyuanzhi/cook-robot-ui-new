import { defineStore } from "pinia";
import defaultSettings from "../settings";

const {
  title,
  version,
  useSSL,
  middlePlatformIPAddress
} = defaultSettings;

export const UseSettingStore = defineStore("settings", {
  state: () => ({
    title: title,
    version: version,
    useSSL: useSSL,
    middlePlatformIPAddress: middlePlatformIPAddress
  }),
  getters: {
    // getCurrentDish: (state) => state.runningDish,
  },
  actions: {
    setMiddlePlatformIPAddress: (address) => {
      this.middlePlatformIPAddress = address;
    }
  },
});
