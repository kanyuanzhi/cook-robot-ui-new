import { boot } from "quasar/wrappers";
import axios from "axios";
import { Platform } from "quasar";
import { UseSettingStore } from "stores/settingStore";

const useSettingStore = UseSettingStore();
// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  // baseURL: Platform.is.electron ? "http://localhost:8889/api/v1" : "http://192.168.6.10:8888",
  // baseURL: (Platform.is.cros || Platform.is.electron) ? "http://localhost:8888" : "http://169.254.216.164:8888",
  // baseURL: "http://192.168.0.34:8888",
  baseURL: (useSettingStore.useSSL ? "https" : "http") + "://" + useSettingStore.middlePlatformIPAddress + ":8889/api/v1",
  // baseURL: "http://192.168.6.10:8889/api/v1",
  // baseURL: process.env.env_API,
  // baseURL: process.env.test_API,
  // withCredentials: true,
  timeout: 5000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  },
);
// export default boot(({ app }) => {
//   // for use inside Vue files (Options API) through this.$axios and this.$api
//
//   app.config.globalProperties.$axios = axios
//   // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
//   //       so you won't necessarily have to import axios in each vue file
//
//   app.config.globalProperties.$api = api
//   // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
//   //       so you can easily perform requests against your app's API
// })

export { api };
