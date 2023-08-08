<template>
  <q-header bordered class="bg-white row" style="border-radius: 10px">
    <q-toolbar class="col-4">
      <q-img fit="fill" src="~/assets/logo.png" style="width: 113px; height: 35px;" @click="router.push('/')"/>
    </q-toolbar>
    <q-toolbar class="col-8">
      <q-space/>
      <TheMoreOperations/>
      <!--      <q-btn stretch v-if="!Platform.is.mobile" flat label="扫码炒菜" @click="useAppStore.showDishQrScanning"/>-->
      <!--      <q-separator v-if="!Platform.is.mobile" dark vertical/>-->
      <!--      <q-btn stretch flat label="菜品选择" @click="router.push('/dishSelect')"/>-->
      <!--      <q-separator dark vertical/>-->
      <!--      <q-btn stretch flat label="菜品制作" @click="router.push('/dishEdit')"/>-->

      <!--      <q-separator v-if="!Platform.is.mobile" dark vertical/>-->
      <!--      <q-btn v-if="!Platform.is.mobile" stretch flat label="系统设置" @click="router.push('/systemSettings')"/>-->
      <!--      <q-separator v-if="Platform.is.electron" dark vertical/>-->
      <!--      <TheSystemSetting v-if="Platform.is.electron" class="q-ml-sm"/>-->
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import TheSystemSetting from "layouts/components/TheSystemSetting.vue";
import { UseAppStore } from "stores/appStore";
import { UseSettingStore } from "stores/settingStore";
import { Platform } from "quasar";
import TheMoreOperations from "layouts/components/TheMoreOperations.vue";

const router = useRouter();
const useAppStore = UseAppStore();
const settingStore = UseSettingStore();
</script>

<style lang="scss" scoped>

</style>
