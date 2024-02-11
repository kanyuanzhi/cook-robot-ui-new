<template>
  <q-dialog v-model="shown" position="top">
    <q-card style="width: 350px;margin-top: 200px">
      <q-card-section>
        <q-input v-model="useAppStore.searchFilter" :placeholder="$t('header.searchDish')" dense autofocus clearable
                 @clear="theHeaderKeyboard.setInput('', 'default')"/>
      </q-card-section>
    </q-card>
    <q-dialog
        v-model="shown"
        persistent
        position="bottom"
        no-focus
        no-refocus
        seamless
        full-width
    >
      <TheHeaderKeyboard ref="theHeaderKeyboard" @change="onChange"/>
    </q-dialog>
  </q-dialog>
</template>

<script setup>
import TheHeaderKeyboard from "layouts/components/TheHeaderKeyboard.vue";
import { ref } from "vue";
import { UseAppStore } from "stores/appStore";

const useAppStore = UseAppStore();

const shown = ref(false);
const theHeaderKeyboard = ref(null);

const show = () => {
  shown.value = true;
  setTimeout(() => {
    theHeaderKeyboard.value.setInput(useAppStore.searchFilter, "default");
  }, 100);
  // theHeaderKeyboard.value.setInput(useAppStore.searchFilter, "default")
};

const onChange = (input, name) => {
  useAppStore.setSearchFilter(input);
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>

</style>
