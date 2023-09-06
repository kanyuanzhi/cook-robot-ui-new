<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-8">
          <TheEasyStepList v-if="useAppStore.useEasyStepList"/>
          <TheStepList v-else/>
        </div>
        <div class="col-4">
          <TheOperatorBtns/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import TheStepList from "pages/dishEdit/components/TheStepList.vue";
import TheOperatorBtns from "pages/dishEdit/components/TheOperatorBtns.vue";
import { UseAppStore } from "stores/appStore";
import TheEasyStepList from "pages/dishEdit/components/TheEasyStepList.vue";

const useAppStore = UseAppStore();
useAppStore.setPageTitle("菜品制作");

const dish = ref(useAppStore.editingDish);

onUnmounted(() => {
  useAppStore.setBackBtnShown(false);
})

</script>

<style lang="scss" scoped>


</style>
