<template>
  <q-tab-panel style="padding-bottom: 0;padding-top: 0" :name="cuisineId" class="right-tab-panel">
    <div class="cards-wrapper">
      <div class="row q-col-gutter-sm my-right-list">
        <div class="col-6" v-for="dish in dishes" :key="dish.uuid">
          <DishPanelCard :dish-image="dish.image" :dish-name="dish.name" @click="useAppStore.showDishDetailsCard(dish.uuid)"/>
        </div>
      </div>
    </div>

    <!-- <div class="flex pagination-wrapper">
      <q-pagination
        v-model="pageCurrent"
        :max="pageMax"
        max-pages="3"
        direction-links
        gutter="10px"
        outline
        color="teal-6"
        active-design="unelevated"
        active-color="teal-6"
        :ellipses="true"
        boundary-numbers
        size="sm"
      />
    </div> -->
  </q-tab-panel>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { getAllDishes, getDishes } from "src/api/dish";
import { ceil } from "lodash";
import DishPanelCard from "pages/dishSelect/components/DishPanelCard.vue";
import { UseAppStore } from "stores/appStore";

const useAppStore = UseAppStore()

const pageSize = 100;

const props = defineProps(["cuisineId"]);
const dishes = ref([]);
const count = ref(0);
const pageMax = ref(0);
const pageCurrent = ref(1);

onMounted(async () => {
  let responseData
  if (props.cuisineId === 0){
    responseData = await getAllDishes(1, pageSize, props.cuisineId);
  }else {
    responseData = await getDishes(1, pageSize, props.cuisineId);
  }
  dishes.value = responseData.data.data.dishes;
  count.value = responseData.data.data.count;
  pageMax.value = ceil(count.value / pageSize);

  watch(pageCurrent,
    async (value) => {
      if (props.cuisineId === 0){
        responseData = await getAllDishes(pageCurrent.value, pageSize, props.cuisineId);
      }else {
        responseData = await getDishes(pageCurrent.value, pageSize, props.cuisineId);
      }
      dishes.value = responseData.data.data.dishes;
    });
});
</script>

<style lang="scss" scoped>
.cards-wrapper {
  height: calc(100vh - 50px - 32px - 20px - 20px - 10px - 10px);
  //height: 600px
  width: 100%;
}

.pagination-wrapper {
  background-color: white;
  position: absolute;
  //height: 20px;
  padding-top: 5px;
  padding-bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.my-right-list {
  // margin-bottom: 15px;
  width: 100%;
}

.right-tab-panel {
  padding: 3px;
  width: 79vw;
}

</style>
