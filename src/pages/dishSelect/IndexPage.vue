<template>
  <q-page>
    <div class="q-pa-sm">
      <q-splitter
          v-model="splitterModel"
      >
        <template v-slot:before>
          <q-tabs
              v-model="useAppStore.cuisineTab"
              vertical
              class="text-teal-6"
              active-bg-color="teal-6"
              active-color="white"
              switch-indicator>
            <q-tab :name="0" label="全部" class="cuisine-name"
                   style="border-top-right-radius: 20px;border-bottom-right-radius: 20px"/>
            <q-tab v-for="cuisine in cuisines" :key="cuisine.id" :name="cuisine.id" :label="cuisine.name"
                   class="cuisine-name" style="border-top-right-radius: 20px;border-bottom-right-radius: 20px"/>
            <q-separator/>
            <!--            <q-route-tab label="菜品制作" to="/dishEdit"/>-->
          </q-tabs>
          <q-tabs
              v-model="useAppStore.dishSourceTab"
              class="text-teal-6"
              active-bg-color="teal-6"
              active-color="white">
            <q-tab name="official" label="官方菜品" class="dish-source" :ripple="false"/>
            <q-tab name="personal" label="我的菜品" class="dish-source" :ripple="false"/>
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-tab-panels
              v-model="useAppStore.cuisineTab"
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up">
            <DishesPanel :cuisine-id="0" :name="0"/>
            <DishesPanel v-for="cuisine in cuisines" :key="cuisine.id" :cuisine-id="cuisine.id"
                         :name="cuisine.id"/>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import DishesPanel from "pages/dishSelect/components/DishesPanel.vue";
import { UseAppStore } from "stores/appStore";
import { getAPI } from "src/api";

const useAppStore = UseAppStore();
useAppStore.setPageTitle("菜品选择");

const splitterModel = ref(20);
const cuisines = ref([]);
const cuisineTab = ref(null);

onMounted(async () => {
  const { data } = await getAPI("/cuisine/list");
  cuisines.value = data.cuisines;
});

watch(cuisineTab, () => {
  useAppStore.setCuisineTab(cuisineTab.value);
});


</script>

<style lang="scss" scoped>
:deep(.cuisine-name .q-tab__label) {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 10px;
  padding-top: 0px;
  padding-bottom: 0;
}

:deep(.dish-source .q-tab__label) {
  font-weight: 600;
  font-size: 15px;
  //letter-spacing: 10px;
  //padding-top: 0px;
  //padding-bottom: 0;
}

:deep(.q-tab) {
  min-height: 35px;
  height: 43.5px;
}
</style>
