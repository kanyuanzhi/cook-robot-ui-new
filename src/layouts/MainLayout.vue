<template>
  <q-layout view="lHh Lpr lFf">
    <TheHeader/>
    <TheFooter/>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <TheControlDialog/>
  </q-layout>
</template>

<script setup>
import { UseControllerStore } from "stores/controllerStore";

import TheHeader from "layouts/components/TheHeader.vue";
import TheFooter from "layouts/components/TheFooter.vue";
import TheControlDialog from "layouts/components/TheControlDialog.vue";

const useControllerStore = UseControllerStore();

setInterval(useControllerStore.fetchStatus, 200);
</script>
