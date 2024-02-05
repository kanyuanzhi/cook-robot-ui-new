import { defineStore } from "pinia";
import defaultSettings from "../settings";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

const {
  title,
  version,
  useSSL,
  middlePlatformIPAddress,
  isNewMachine,
  lang,
} = defaultSettings;

export const UseSettingStore = defineStore("settings", {
  state: () => ({
    title: title,
    version: version,
    useSSL: useSSL,
    middlePlatformIPAddress: middlePlatformIPAddress,
    isNewMachine: isNewMachine,
    lang: lang,
  }),
  getters: {
    // getCurrentDish: (state) => state.runningDish,
    getLang: (state) => {
      return LocalStorage.getItem("lang") || state.lang;
    },
  },
  actions: {
    setMiddlePlatformIPAddress(address) {
      this.middlePlatformIPAddress = address;
      api.defaults.baseURL = (this.useSSL ? "https" : "http") + "://" + address + ":8889/api/v1";
    },
    setLang(lang) {
      this.lang = lang;
      LocalStorage.set("lang", lang);
    }
  },
});
