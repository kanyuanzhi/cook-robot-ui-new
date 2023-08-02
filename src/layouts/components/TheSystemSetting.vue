<template>
  <div>
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

        <q-separator color="white"/>

        <q-item clickable v-close-popup @click="theUpdateConfirmDialog.show">
          <q-item-section side>
            <q-icon name="update" color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>更新软件</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="theQrScanDialog.show">
          <q-item-section side>
            <q-icon name="phone_iphone" color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>手机配对</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="router.push('/systemSettings')">
          <q-item-section side>
            <q-icon name="settings" color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>系统设置</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <TheUpdateConfirmDialog ref="theUpdateConfirmDialog"/>
    <TheQrScanDialog ref="theQrScanDialog"/>
  </div>

</template>

<script setup>
import { onMounted, ref } from "vue";
import { shutdown } from "src/api/system";
import { UseAppStore } from "stores/appStore";
import TheUpdateConfirmDialog from "layouts/components/TheUpdateConfirmDialog.vue";
import TheQrScanDialog from "layouts/components/TheQrScanDialog.vue";
import { useRouter } from "vue-router";
import { Platform } from "quasar";

const useAppStore = UseAppStore();
const router = useRouter();

const theUpdateConfirmDialog = ref(null);
const theQrScanDialog = ref(null)

const isFullscreen = ref(false);

onMounted(()=>{
  if (Platform.is.electron) {
    isFullscreen.value = window.windowAPI.isFullscreen();
  }
})


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
