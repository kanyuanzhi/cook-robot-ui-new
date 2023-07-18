<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-teal-6">
      <q-toolbar>
        <q-btn flat round dense icon="home" to="/"/>
        <q-toolbar-title>
          Cook Robot
        </q-toolbar-title>
        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>
