<template>
  <q-page>
    <div class="q-pa-sm">
      <q-splitter v-model="splitterModel">
        <template v-slot:before>
          <q-tabs
            v-model="tab"
            vertical
            class="text-teal-6"
            active-bg-color="teal-6"
            active-color="white"
          >
            <q-tab class="" :name="0" label="全部" />
            <q-tab
              v-for="cuisine in cuisines"
              :key="cuisine.uuid"
              :name="cuisine.id"
              :label="cuisine.name"
            />
            <q-separator />
            <q-route-tab
              class="bg-teal-5 text-white"
              label="菜品制作"
              to="/dishEdit"
            />
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
            <DishesPanel :name="0" :cuisine-id="0"></DishesPanel>
            <DishesPanel
              v-for="cuisine in cuisines"
              :key="cuisine.uuid"
              :name="cuisine.id"
              :cuisine-id="cuisine.id"
            ></DishesPanel>
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
  // tab.value = data.data[0].id;
  tab.value = 0;
});
</script>

<style lang="scss" scoped>
.dish-select-wrap {
  height: calc(100vh - 100px);
}

.my-splitter {
  height: 100%;
}

.my-tab-panels-right {
  height: 100%;
}

:deep(.q-tab__label) {
  font-weight: 600;
  font-size: 20px;
  letter-spacing: 10px;
  padding-top: 0px;
  padding-bottom: 0;
}

:deep(.q-tab) {
  min-height: 35px;
  height: 43.5px;
}
</style>
