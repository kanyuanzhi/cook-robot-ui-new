<template>
  <q-layout view="lHh Lpr lFf">
    <TheMobileHeader v-if="!useMobileStore.isScanning"/>

    <q-page-container>
      <router-view/>
    </q-page-container>
    <TheMobileFooter v-if="!useMobileStore.isScanning"/>

    <TheControlDialog/>
    <TheDishQrScanningDialog/>
    <TheDishDetailsCard/>
  </q-layout>
</template>

<script setup>
import TheHeader from "layouts/components/TheHeader.vue";
import TheFooter from "layouts/components/TheFooter.vue";
import TheControlDialog from "layouts/components/TheControlDialog.vue";
import TheDishQrScanningDialog from "layouts/components/TheDishQrScanningDialog.vue";
import TheDishDetailsCard from "layouts/components/dishDetails/TheDishDetailsCard.vue";
import TheMobileFooter from "layouts/components/TheMobileFooter.vue";
import TheMobileHeader from "layouts/components/TheMobileHeader.vue";
import { UseMobileStore } from "stores/mobileStore";
import { UseControllerStore } from "stores/controllerStore";

const useMobileStore = UseMobileStore();
const useControllerStore = UseControllerStore();

setInterval(useControllerStore.fetchStatus, 200);
</script>
