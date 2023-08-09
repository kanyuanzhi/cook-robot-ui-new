<template>
  <q-btn
    unelevated
    :color="color"
    :size="size"
    style="width: 14vw; height: 80px"
  >
    <div class="column items-center no-wrap">
      <q-icon :name="icon" />
      <div class="text-center label-text">
        {{ label }}
      </div>
    </div>
  </q-btn>
</template>

<script setup>
const props = defineProps(["color", "label", "size", "icon"]);
</script>

<style lang="scss" scoped>
.label-text {
  white-space: nowrap;
}
</style>
