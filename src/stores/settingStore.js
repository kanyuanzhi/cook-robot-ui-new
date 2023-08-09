import { defineStore } from "pinia";
import defaultSettings from "../settings";
import { Notify } from "quasar";
import { api } from "boot/axios";

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
    setMiddlePlatformIPAddress(address) {
      this.middlePlatformIPAddress = address;
      api.defaults.baseURL = (this.useSSL ? "https" : "http") + "://" + address + ":8889/api/v1";
    },
    test(){
      Notify.create(21321312);

    }

  },
});
