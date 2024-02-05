<template>
  <q-btn-dropdown color="teal-6" flat dropdown-icon="add_circle_outline">
    <q-list class="bg-teal-6 text-white">
      <q-item class="dropdown-bottom-border" clickable v-close-popup @click="useAppStore.showDishQrScanning">
        <q-item-section side>
          <q-icon name="mdi-scan-helper" color="white" size="18px"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("header.moreOptions.qrScan") }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator dark inset/>

      <q-item class="dropdown-bottom-border" clickable v-close-popup @click="router.push('/dishSelect')">
        <q-item-section side>
          <q-icon name="bi-check2-square" color="white" size="18px"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("header.moreOptions.dishSelect") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator dark inset/>

      <q-item class="dropdown-bottom-border" clickable v-close-popup @click="router.push('/dishEdit')">
        <q-item-section side>
          <q-icon name="bi-pencil-square" color="white" size="18px"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("header.moreOptions.dishCook") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator dark inset/>

      <q-item class="dropdown-bottom-border" clickable v-close-popup @click="router.push('/systemSettings')">
        <q-item-section side>
          <q-icon name="bi-gear" color="white" size="18px"/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("header.moreOptions.systemSettings") }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup>
import { UseAppStore } from "stores/appStore";
import { useRouter } from "vue-router";

const useAppStore = UseAppStore();
const router = useRouter();

</script>

<style lang="scss" scoped>

</style>
