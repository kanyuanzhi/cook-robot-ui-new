<template>
  <div :style="{ width: keyboardWidth }" class="simple-keyboard"></div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import layout from "simple-keyboard-layouts/build/layouts/chinese";
import { onMounted, ref } from "vue";

const emit = defineEmits(["keyPress", "change", "clear", "enter"]);
const props = defineProps(["default"]);

const number = [
  "7 8 9",
  "4 5 6",
  "1 2 3",
  "{bksp} 0 {enter}"];

layout.layout.number = number;

let keyboard = null;
onMounted(() => {
  keyboard = new Keyboard({
    onChange: (input) => onChange(input),
    onKeyPress: (button) => onKeyPress(button),
    preventMouseDownDefault: true,
    ...layout,
    display: {
      "{bksp}": "删除",
      "{enter}": "提交",
      "{clear}": "clear",
      "{lock}": "caps",
      "{tab}": "tab",
      "{shift}": "shift",
      "{space}": "空格",
    },
  });
  if (props.default) {
    try {
      keyboard.setOptions({
        layoutName: props.default
      });
    }catch (e) {
      console.error( "layoutName wrong")
      keyboard.setOptions({
        layoutName: "default"
      });
    }
  }
});

const keyboardWidth = ref("100%");

function setInputName(name) {
  let layoutName;
  if (["weight", "min", "sec"].indexOf(name) > -1) {
    layoutName = "number";
    keyboardWidth.value = "50%";
  } else {
    layoutName = "default";
    keyboardWidth.value = "50%";
  }
  keyboard.setOptions({
    inputName: name,
    layoutName: layoutName,
  });
}

function setInput(value, name) {
  keyboard.setInput(value, name);
}

function onChange(input) {
  emit("change", input, keyboard.options.inputName);
}

function onKeyPress(button) {
  emit("keyPress", button);
  if (button === "{enter}") {
    emit("enter");
  }
  if (button === "{clear}") {
    keyboard.clearInput();
    emit("clear");
  }
  if (button === "{shift}" || button === "{lock}") handleShift();
}

function handleShift() {
  let currentLayout = keyboard.options.layoutName;
  let shiftToggle = currentLayout === "default" ? "shift" : "default";

  keyboard.setOptions({
    layoutName: shiftToggle,
  });
}

defineExpose({
  setInputName,
  setInput,
});
</script>

<style lang="scss" scoped></style>
