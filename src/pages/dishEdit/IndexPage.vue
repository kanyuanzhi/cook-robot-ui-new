<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-8">
          <TheStepList :dish="dish"/>
        </div>
        <div class="col-4">
          <TheOperatorBtns/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import TheStepList from "pages/dishEdit/components/TheStepList.vue";
import TheOperatorBtns from "pages/dishEdit/components/TheOperatorBtns.vue";
import { UseAppStore } from "stores/appStore";

const useAppStore = UseAppStore();

const dish = ref(useAppStore.editingDish);

</script>

<style lang="scss" scoped>


</style>
