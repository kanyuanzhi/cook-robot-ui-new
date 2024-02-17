<template>
  <div class="row">
    <div class="col-4 offset-4">
      <q-list>
        <q-item>
          <q-btn label="打开水源阀" push color="teal-6" @click="sendCommand('open_water_source_valve')"/>
          <q-btn label="关闭水源阀" push class="q-ml-md" @click="sendCommand('close_water_source_valve')"/>
        </q-item>
        <q-item>
          <q-btn label="打开水泵阀" push color="teal-6" @click="sendCommand('open_water_pump_valve')"/>
          <q-btn label="关闭水泵阀" push class="q-ml-md" @click="sendCommand('close_water_pump_valve')"/>
        </q-item>
        <q-item>
          <q-btn label="打开喷头阀" push color="teal-6" @click="sendCommand('open_nozzle_valve')"/>
          <q-btn label="关闭喷头阀" push class="q-ml-md" @click="sendCommand('close_nozzle_valve')"/>
        </q-item>
        <q-item>
          <q-btn label="打开7号泵阀" push color="teal-6" @click="sendCommand('open_pump_7_valve')"/>
          <q-btn label="关闭7号泵阀" push class="q-ml-md" @click="sendCommand('close_pump_7_valve')"/>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script setup>
import { sendCommand } from "layouts/components/command";
</script>

<style lang="scss" scoped>
</style>
