<template>
  <q-page>
    <div class="q-pa-md">
      <q-splitter
        v-model="splitterModel"
      >
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="text-teal-6"
            active-bg-color="teal-6"
            active-color="white"
          >
            <q-tab v-for="cuisine in cuisines" :key="cuisine.uuid" :name="cuisine.id" :label="cuisine.name"
                   style="height: 50px"/>
            <q-separator/>
            <q-route-tab class="bg-teal-5 text-white" label="制作菜谱" style="height: 50px" to="/dishEdit"/>
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
            v-model="tab"
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <DishesPanel v-for="cuisine in cuisines" :key="cuisine.uuid" :name="cuisine.id"></DishesPanel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getCuisines } from "src/api/cuisine";
import DishesPanel from "pages/dishSelect/components/DishesPanel.vue";

const splitterModel = ref(20);
const cuisines = ref([]);
const tab = ref("");

onMounted(async () => {
  const { data } = await getCuisines();
  cuisines.value = data.data;
  tab.value = data.data[0].id;
});


</script>

<style lang="scss" scoped>
:deep(.q-tab__label) {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 10px;
}

:deep(.q-tab-panel) {
  padding-top: 0;
}
</style>
