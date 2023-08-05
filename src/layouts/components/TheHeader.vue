<template>
  <q-header class="bg-teal-6">
    <q-toolbar>
      <q-avatar>
        <q-btn flat round dense size="12px" icon="fa-solid fa-house" to="/"/>
      </q-avatar>

      <q-toolbar-title>
        <div style="padding-top: 2px">{{ settingStore.title }}</div>
      </q-toolbar-title>
      <q-btn stretch v-if="!Platform.is.mobile" flat label="扫码炒菜" @click="useAppStore.showDishQrScanning"/>
      <q-separator v-if="!Platform.is.mobile" dark vertical/>
      <q-btn stretch flat label="菜品选择" @click="router.push('/dishSelect')"/>
      <q-separator dark vertical/>
      <q-btn stretch flat label="菜品制作" @click="router.push('/dishEdit')"/>

      <q-separator v-if="!Platform.is.mobile" dark vertical/>
      <q-btn v-if="!Platform.is.mobile" stretch flat label="系统设置" @click="router.push('/systemSettings')"/>
      <q-separator v-if="Platform.is.electron" dark vertical/>
      <TheSystemSetting v-if="Platform.is.electron" class="q-ml-sm"/>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import TheSystemSetting from "layouts/components/TheSystemSetting.vue";
import { UseAppStore } from "stores/appStore";
import { UseSettingStore } from "stores/settingStore";
import { Platform } from "quasar";

const router = useRouter();
const useAppStore = UseAppStore();
const settingStore = UseSettingStore();
</script>

<style lang="scss" scoped>

</style>
