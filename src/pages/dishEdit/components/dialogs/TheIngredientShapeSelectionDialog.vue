<template>
  <q-dialog v-model="shown" @hide="onHide">
    <q-card class="column" style="width: 300px">
      <q-card-section>
        <div class="text-subtitle1">{{ $t("dishEdit.ingredientDialog.shapeSelect.title") }}</div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-list separator padding>
          <q-scroll-area style="height: 400px; max-width: 300px;">
            <q-item dense v-for="shape in shapes" :key="shape.id" clickable v-ripple
                    @click="onSelect($event, formatShapeName(shape))">
              <q-item-section>{{ formatShapeName(shape) }}</q-item-section>
            </q-item>
          </q-scroll-area>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { getAPI } from "src/api";
import { UseAppStore } from "stores/appStore";

const emit = defineEmits(["select"]);
const appStore = UseAppStore();

const shown = ref(false);

const shapes = ref([]);

const show = async () => {
  shown.value = true;
  try {
    const shapeData = await getAPI("ingredient-shape/list");
    shapes.value = shapeData.data.ingredientShapes;
  } catch (e) {
    console.log(e.toString());
  }
};

const formatShapeName = (shape) => {
  if (appStore.getLocal() === "cn") {
    return shape.name;
  } else if (appStore.getLocal() === "en") {
    return shape.nameEn;
  } else if (appStore.getLocal() === "tw") {
    return shape.nameTw;
  }
};

const onSelect = (e, val) => {
  emit("select", val);
  shown.value = false;
};

const onHide = () => {
  shapes.value = [];
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>

</style>
