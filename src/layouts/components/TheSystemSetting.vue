<template>
  <q-btn-dropdown flat round dense dropdown-icon="more_vert">
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

      <q-item clickable v-close-popup @click="operateScreen('close')">
        <q-item-section side>
          <q-icon name="close" color="white"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>退出程序</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { ref } from "vue";
import { shutdown } from "src/api/system";

const isFullscreen = ref(false);
if (process.env.MODE === "electron") {
  console.log(window.myWindowAPI)
  isFullscreen.value = window.myWindowAPI.isFullscreen();
}

const operateScreen = (flag) => {
  if (process.env.MODE !== "electron") return;
  switch (flag) {
    case "minimize":
      window.myWindowAPI.minimize();
      return;
    case "close":
      shutdown()
      window.myWindowAPI.close();
      return;
    case "toggle-screen":
      window.myWindowAPI.toggle();
      isFullscreen.value = window.myWindowAPI.isFullscreen();
      return;
    default:
      return;
  }
};

</script>

<style lang="scss" scoped>

</style>
