<template>
  <q-layout view="lHh Lpr lFf">
    <TheHeader/>
    <TheFooter/>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <TheControlDialog/>
    <TheDishQrScanningDialog/>
    <TheDishDetailsCard/>
  </q-layout>
</template>

<script setup>
import { UseControllerStore } from "stores/controllerStore";

import TheHeader from "layouts/components/TheHeader.vue";
import TheFooter from "layouts/components/TheFooter.vue";
import TheControlDialog from "layouts/components/TheControlDialog.vue";
import TheDishQrScanningDialog from "layouts/components/TheDishQrScanningDialog.vue";
import { UseAppStore } from "stores/appStore";
import TheDishDetailsCard from "layouts/components/dishDetails/TheDishDetailsCard.vue";
import { UseSoftwareInfoStore } from "stores/softwareInfoStore";
import { onMounted, onBeforeMount } from "vue";

const useControllerStore = UseControllerStore();
const useAppStore = UseAppStore();
const useSoftwareInfoStore = UseSoftwareInfoStore();

onBeforeMount(async () => {
  await useSoftwareInfoStore.fetch();
});

setInterval(useControllerStore.fetchStatus, 200);
</script>
