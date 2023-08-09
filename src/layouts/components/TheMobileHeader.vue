<template>
  <q-header bordered class="bg-white row" style="border-radius: 10px">
    <q-toolbar class="col-4">
      <q-img fit="fill" src="~/assets/logo.png" style="width: 113px; height: 35px;" @click="router.push('/')"/>
    </q-toolbar>
    <q-toolbar class="col-8">
      <q-space/>
      <q-btn flat icon="crop_free" color="teal-6" @click="router.push('/mobile/scan')"/>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import TheSystemSetting from "layouts/components/TheSystemSetting.vue";
import { UseAppStore } from "stores/appStore";
import { UseSettingStore } from "stores/settingStore";
import { Notify, Platform } from "quasar";
import TheMoreOperations from "layouts/components/TheMoreOperations.vue";


const router = useRouter();
const useAppStore = UseAppStore();
const settingStore = UseSettingStore();
</script>

<style lang="scss" scoped>

</style>
