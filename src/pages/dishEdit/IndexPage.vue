<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-8">
          <TheStepList :dish="dish"/>
        </div>
        <div class="col-4">
          <TheOperatorBtns :dish="dish"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import TheStepList from "pages/dishEdit/components/TheStepList.vue";
import TheOperatorBtns from "pages/dishEdit/components/TheOperatorBtns.vue";

const dish = ref({
  steps: [],
  name: "",
  cuisine: 1,
});

</script>

<style lang="scss" scoped>


</style>
