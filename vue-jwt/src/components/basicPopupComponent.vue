<template>
  <div class="basic-popup-wrapper">
    <div class="popup-main-container" :class="{'open':isOpen, 'closing': isClosing }">
      <div class="close-popup" @click.stop="closePopup()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.8964 6L6 17.792" stroke="#E8E8E8" stroke-miterlimit="10" stroke-linecap="round"/>
          <path d="M18 18L6.20703 6.10449" stroke="#E8E8E8" stroke-miterlimit="10" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="header">
        <slot name="header">Popup</slot>
      </div>
      <slot name="body">popup body</slot>
      <div class="footer">
        <slot name="footer">
          <div class="footer-button-wrapper">
            <div class="button action-button">Confirm</div>
            <div class="button close-button" @click="closePopup">Close</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"


let isOpen = ref(false)
let isClosing = ref(false)
const emit = defineEmits(['close-popup'])

onMounted(() => {
  setTimeout(() => {
    isOpen.value = true
    // document.body.classList.add('modal-open');
    }, 100);
})

function closePopup() {
  isClosing.value = true;
    setTimeout(() => {
      isOpen.value = false;
      isClosing.value = false;
      // document.body.classList.remove('modal-open');
      emit("close-popup")
    }, 300); // Duration of closing animation
}

</script>

<style lang="scss" scoped>
.basic-popup-wrapper {
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(207, 207, 207, 0.737);
  display: grid;
  place-content: center;
  .popup-main-container {
    z-index: 1;
    background-color: black;
    padding: 3rem 4.5rem;
    position: relative;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: right center;
    color: white;
    min-width: 40rem;
    transition: transform 0.3s ease-in-out;

    /* Initial state */
    transform: scale(0);

    /* When the popup is open, scale to 1 */
    &.open {
      transform: scale(1);
    }

    /* When the popup is closing, scale back to 0.8 */
    &.closing {
      transform: scale(0);
    }
    .close-popup {
      position: absolute;
      top: 0px;
      left: 102%;
      display: grid;
      width: 2rem;
      height: 2rem;
      background-color: black;
      place-content: center;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0.6;
      &:hover {
          opacity: 1;
      }
      svg {
        fill: black;
        path {
          stroke: goldenrod;
        }
      }
    }
  }
  .footer-button-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2.5rem;
    .button {
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      background: goldenrod;
      color: black;
      font-weight: 700;
      cursor: pointer;
    }
    .close-button {
      background: none;
      color: goldenrod;
    }
  }
}





</style>