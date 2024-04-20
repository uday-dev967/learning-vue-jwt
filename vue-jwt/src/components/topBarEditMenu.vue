<template>
  <div class="edit-menu">
    <div
      v-for="(button, index) in buttonConfig" 
      :key="index"
      class="menu-item"
      @click="handleButtonClick(button)"
    >
      <div v-if="button.icon" class="icon">
        <div v-html="button.icon"></div>
      </div>
      <div v-if="button.label" class="label">
        {{ button.label }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { toRefs } from 'vue';


const props = defineProps({
  buttonConfig: {
    type: Array,
    required: false,
    default: () => []
  }
})

const {buttonConfig} = toRefs(props);

function handleButtonClick(button) {

  if (button.callBack) {
    button.callBack(button)
  }

}

</script>

<style lang="scss" scoped>
.edit-menu {
  width: 100%;
  height: 40px;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  .menu-item {
    background: black;
    color: goldenrod;
    &:hover {
      background: #595959;
      color: white;
    }
  }
}
</style>