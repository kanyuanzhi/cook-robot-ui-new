<template>
  <q-page>
    <div class="q-pa-xs">
      <TheOperatorBtns />
      <TheStepList :dish="dish" />
      <!-- <div class="row q-col-gutter-md">
        <div class="col-8">
          <TheEasyStepList v-if="useAppStore.useEasyStepList"/>
          <TheStepList v-else/>
        </div>
        <div class="col-4">
          
        </div>
      </div> -->
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import TheStepList from "pages/dishEdit/components/TheStepList.vue";
import TheOperatorBtns from "pages/dishEdit/components/TheOperatorBtns.vue";
import { UseAppStore } from "stores/appStore";
import TheEasyStepList from "pages/dishEdit/components/TheEasyStepList.vue";

const useAppStore = UseAppStore();

const dish = ref(useAppStore.editingDish);
</script>

<style lang="scss" scoped></style>
