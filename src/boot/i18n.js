import { boot } from "quasar/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";
import { LocalStorage } from "quasar";

let i18n = createI18n({});

export default boot(({ app }) => {
  i18n = createI18n({
    locale: LocalStorage.getItem("lang") || "zh-CN",
    globalInjection: true,
    fallbackLocale: "zh-CN",
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});

export { i18n };
