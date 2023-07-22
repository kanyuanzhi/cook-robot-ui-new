<template>
  <q-header class="bg-teal-6">
    <q-toolbar>
      <q-avatar>
        <q-btn flat round dense size="12px" icon="fa-solid fa-house" to="/"/>
      </q-avatar>
<!--      <q-btn flat round dense icon="mdi-home" to="/"/>-->
<!--      <q-btn flat round dense icon="home" to="/"/>-->
      <q-toolbar-title>
        <div style="padding-top: 2px">小智云炒</div>
      </q-toolbar-title>
      <q-btn stretch flat label="菜品选择"  @click="router.push('/dishSelect')"/>
      <q-separator dark vertical />
      <q-btn stretch flat label="菜品制作" @click="router.push('/dishEdit')"/>
      <q-separator dark vertical />
      <q-btn flat round dense icon="menu" class="q-ml-sm" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter()
</script>

<style lang="scss" scoped>

</style>
