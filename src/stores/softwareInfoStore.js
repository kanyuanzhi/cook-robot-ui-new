import { defineStore } from "pinia";
import { getAPI } from "src/api";
import { date, Notify } from "quasar";

const {
  formatDate,
} = date;

export const UseSoftwareInfoStore = defineStore("softwareInfo", {
  state: () => ({
    name: "",
    version: "",
    machineModel: "",
    serialNumber: "",
    updateTime: "",
  }),
  getters: {
    // getCurrentDish: (state) => state.runningDish,
  },
  actions: {
    async fetch () {
      try {
        const { data } = await getAPI("softwareUpdater/get-softwareInfo");
        this.name = data.name;
        this.version = data.version;
        this.machineModel = data.machineModel;
        this.serialNumber = data.serialNumber;
        this.updateTime = formatDate(data.updateTime, "YYYY-MM-DD HH:mm:ss");
      } catch (e) {
        Notify.create(e);
      }
    },
    isXZYCModel () {
      if (this.machineModel === "XZYC202308" || this.machineModel ===
        "XZYC202401") {
        return true;
      } else{
        return false;
      }
    },
    isZHModel () {
      if (this.machineModel === "XZYC202401ZH") {
        return true;
      } else{
        return false;
      }
    },
  },
});
