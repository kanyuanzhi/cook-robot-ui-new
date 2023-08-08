<template>
  <q-tab-panel :name="name" class="q-py-xs">
    <div class="text-h6 q-mb-sm text-teal-6">{{ title }}</div>
    <q-separator/>
    <div class="text-subtitle2 text-teal-8"><q-icon v-if="summary !== undefined" name="info" size="16px"/>{{ summary }}</div>
    <div class="q-pa-md" :class="[summary===undefined?'wrap-no-summary':'wrap']">
      <slot></slot>
    </div>
  </q-tab-panel>
</template>

<script setup>
const props = defineProps(["title", "name", "summary"]);
</script>

<style lang="scss" scoped>
.wrap {
  height: calc(100vh - 50px - 50px - 4px - 4px - 1px - 32px - 8px - 22px - 1px - 32px);
}

.wrap-no-summary {
  height: calc(100vh - 50px - 50px - 4px - 4px - 1px - 32px - 8px - 1px - 32px);
}
</style>
