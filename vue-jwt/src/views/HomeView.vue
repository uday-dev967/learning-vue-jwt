<template>
  <div class="home-page-wrapper">
    <div class="">Home</div>
    <div class="" @click="onOpenMultilevelPopup">Open Multilevel Popup</div>
    <MultiLevelPopup 
      v-if="showMutilevelPopup" 
      :headingText="'Multi-level Popup'"
      class="" 
      @closePopup="onCloseMultiLevelPopupClose"
    >
      <template #multilevelBody="employeeList">
        <div class="employee-list-wrapper">
          <div v-for="employee in employeeList" :key="employee.name" class="employee-list-item-wrapper">
            <div class="employee-detail">
              <div class="property">Name:</div>
              <div class="property-value">{{ employee.name }}</div>
            </div>
            <div class="employee-detail">
              <div class="property">Role:</div>
              <div class="property-value">{{ employee.role }}</div>
            </div>
          </div>
        </div>
      </template>
    </MultiLevelPopup>
  </div>
</template>
<script setup>
import { ref } from "vue";
import MultiLevelPopup from "../components/multiLevelPopup.vue"

let showMutilevelPopup = ref(false)
function onOpenMultilevelPopup () {
  showMutilevelPopup.value = true
}

function onCloseMultiLevelPopupClose () {
  showMutilevelPopup.value = false
}

</script>

<style lang="scss">
.home-page-wrapper {
  .employee-list-wrapper {
    width: 25rem;
    .employee-list-item-wrapper {
      margin-top: 0.5rem;
      .employee-detail {
        display: grid;
        align-items: center;
        gap: 0.5rem;
        grid-template-columns: 25% 75%;
        .property {
          font-weight: 700;
          
        }
        .property-value {
          color: goldenrod;
          font-weight: 700;
        }
      }
    }
  }
}

</style>