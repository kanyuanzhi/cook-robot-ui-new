<template>
  <q-btn-dropdown flat round dropdown-icon="more_vert">
    <q-list class="bg-teal-6 text-white">
      <q-item class="dropdown-bottom-border" clickable v-close-popup @click="operateScreen('minimize')">
        <q-item-section side>
          <q-icon name="remove" color="white"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>最小化</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="dropdown-bottom-border" clickable v-close-popup @click="operateScreen('toggle-screen')">
        <q-item-section side>
          <q-icon :name="isFullscreen ?'fullscreen_exit' : 'fullscreen'" color="white"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ isFullscreen ? "退出全屏" : "全屏" }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item class="dropdown-bottom-border" clickable v-close-popup @click="operateScreen('close')">
        <q-item-section side>
          <q-icon name="close" color="white"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>关闭软件</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { shutdown } from "src/api/system";
import { UseAppStore } from "stores/appStore";
import { useRouter } from "vue-router";
import { Platform } from "quasar";

const useAppStore = UseAppStore();
const router = useRouter();

const isFullscreen = ref(false);

onMounted(() => {
  if (Platform.is.electron) {
    isFullscreen.value = window.windowAPI.isFullscreen();
  }
});

const operateScreen = (flag) => {
  if (process.env.MODE !== "electron") return;
  switch (flag) {
    case "minimize":
      window.windowAPI.minimize();
      return;
    case "close":
      shutdown();
      window.windowAPI.close();
      return;
    case "toggle-screen":
      window.windowAPI.toggle();
      isFullscreen.value = window.windowAPI.isFullscreen();
      return;
    default:
      return;
  }
};

</script>

<style lang="scss" scoped>

</style>
