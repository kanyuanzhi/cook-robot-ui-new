<template>
  <q-card bordered flat class="my-card" style="width: 100%">
    <q-card-section class="text-center">
      <div class="text-subtitle1">步骤</div>
    </q-card-section>
    <q-separator inset/>
    <q-card-section>
<!--      <q-scroll-area class="bg-green-1" style="height: 425px;">-->
        <q-list class="scrollable-container" ref="stepList" bordered separator style="height: 425px;overflow-y: auto;">
          <q-slide-item v-for="(step, index) in dish.steps" :key="step.key" class="text-black"
                  @right="onDelete(index)" right-color="red">
            <template v-slot:right>
              <q-icon name="delete"/>
            </template>
            <q-item>
              <template v-if="step.type==='ingredient'">
                <q-item-section avatar>
                  <q-avatar rounded color="green" text-color="white" icon="fa-solid fa-wheat-awn" size="md"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{
                      index + 1 + ". 加" + step.name + step.weight + "克，使用菜盒" + step.slotNumber
                    }}
                  </q-item-label>
                </q-item-section>
              </template>
              <template v-if="step.type==='water'">
                <q-item-section avatar>
                  <q-avatar rounded color="blue" text-color="white" icon="water_drop" size="md"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{
                      index + 1 + ". 加" + step.name + step.weight + "克"
                    }}
                  </q-item-label>
                </q-item-section>
              </template>
              <template v-if="step.type==='oil'">
                <q-item-section avatar>
                  <q-avatar rounded color="orange" text-color="white" icon="fa-solid fa-bottle-droplet" size="md"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{
                      index + 1 + ". 加" + step.name + step.weight + "克"
                    }}
                  </q-item-label>
                </q-item-section>
              </template>
              <template v-if="step.type === 'heat'">
                <q-item-section avatar>
                  <q-avatar rounded color="red-7" text-color="white" icon="local_fire_department" size="md"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ index + 1 + ". " + step.name }}
                    <template v-if="step.judgeType===1||step.judgeType===2">
                      <span class="" style="font-size: 13px">，持续至{{ step.targetTemperature }}℃</span>
                    </template>
                    <template v-if="step.judgeType===3">
                      <span class="" style="font-size: 13px">，持续{{ step.duration }}秒</span>
                    </template>
                    <template v-if="step.judgeType===4">
                      <span class="" style="font-size: 13px">，无控制</span>
                    </template>
                  </q-item-label>
                </q-item-section>
              </template>
              <template v-if="step.type==='stir_fry'">
                <q-item-section avatar>
                  <q-avatar rounded color="brown-5" text-color="white" icon="mdi-pot-mix" size="md"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ index + 1 + ". " + step.name }}
                    <span class="" style="font-size: 13px">，持续{{ step.duration }}秒</span>
                  </q-item-label>
                </q-item-section>
              </template>
              <template v-if="step.type==='seasoning'">
                <q-item-section avatar>
                  <q-avatar rounded color="teal" text-color="white" icon="mdi-shaker" size="md"/>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ index + 1 + ". 加" + step.name }}
                  </q-item-label>
                </q-item-section>
              </template>
              <q-item-section avatar>
                <q-icon color="primary" name="drag_indicator" class="drag-item"/>
              </q-item-section>
            </q-item>
          </q-slide-item>
        </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>

import { onMounted, onUnmounted, ref } from "vue";
import Sortable from "sortablejs";

const props = defineProps(["dish"]);

const stepList = ref(null);

onMounted(() => {
  const sortable = new Sortable(stepList.value.$el, {
    onEnd: onSortEnd,
    // dragClass: "sortable-drag",
    // chosenClass: "sortable-chosen",
    animation: 150,  // ms, animation speed moving items when sorting, `0` — without animation
    easing: "cubic-bezier(1, 0, 0, 1)", // Easing for animation. Defaults to null. See https://easings.net/ for examples.
    handle: ".drag-item",  // Specifies which items inside the element should be draggable
  });
  onUnmounted(() => {
    sortable.destroy();
  });
});

const test = ref([1, 2, 3, 4, 5,7,8,9,10,11,12,13]);

const onSortEnd = (event) => {
  const draggedItem = props.dish.steps[event.oldIndex];
  // eslint-disable-next-line vue/no-mutating-props
  props.dish.steps.splice(event.oldIndex, 1);
  // eslint-disable-next-line vue/no-mutating-props
  props.dish.steps.splice(event.newIndex, 0, draggedItem);
};

const onDelete = (index) => {
  // eslint-disable-next-line vue/no-mutating-props
  props.dish.steps.splice(index, 1);
};
</script>

<style lang="scss" scoped>
.my-card {
  height: calc(100vh - 50px - 32px);
}

.sortable-drag {
  background: #1976d2;
}

.sortable-chosen {
  background: rgba(38, 166, 154, 0.5);
}

::-webkit-scrollbar {
  width: 3px;
  height: 0;
  background-color: transparent;
  //background-color: #009688;
}

/* 修改滑块样式 */
::-webkit-scrollbar-thumb {
  background-color: #009688;
  border-radius: 5px;
}

/* 修改滑轨样式 */
::-webkit-scrollbar-track {
  background-color: #f2f2f2;
}

</style>
