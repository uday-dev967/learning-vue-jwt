<template>
  <div>
    <BasicPopup
      @closePopup="onclosePopup"
    >

      <template #header>
        <div class="heading">{{ headingText }}</div>
      </template>
      <!-- multilevl slot -->
      <!-- <template #body>
        <slot name="multilevelBody"></slot>
      </template> -->

      <!-- multilevel slot with v-bind -->
      <template #body>
        <slot name="multilevelBody" v-bind="employeeList"></slot>
      </template>
    </BasicPopup>
  </div>
</template>

<script setup>
import { ref, toRefs } from 'vue';
import BasicPopup from './basicPopupComponent.vue';

const emit = defineEmits(['close-popup'])
const props = defineProps({
  headingText : {
    type: String,
    required: false,
    default: "popup"
  }
})
const {headingText} = toRefs(props)
const employeeList = ref([
  {name: "Uday", role: "jr.Fullstack Devloper"},
  {name: "Rajeev", role: "jr.Fullstack Devloper"},
  {name: "Taher", role: "Co-founder"},
])



function onclosePopup() {
  emit('close-popup')
}

</script>

<style lang="scss" scoped>
.heading {
  color: goldenrod;
  font-weight: 700;
  font-size: 2rem;
}
</style>