<template>
  <div class="canvas-wrapper">
    <div class="canvas-top-bar">
      <TopBarEditMenu 
        v-if="showBrushMenu"
        :buttonConfig="brushButtonConfig"
      >

      </TopBarEditMenu>
    </div>
    <canvas class="canvas" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    <div class="button-container">
      <div class="canvas-button" :class="{'active': currentMode === modes.pan}" @click="toggleMode(modes.pan)">
        Toggle Pan
      </div>
      <div class="canvas-button" :class="{'active': currentMode === modes.draw}" @click="toggleMode(modes.draw)">
        Toggle Draw
      </div>
      <!-- <div class="canvas-button" :class="{'active': currentMode === modes.pan}" @click="toggleMode">
        Toggle Pan
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs, reactive } from 'vue';
import { fabric } from 'fabric';
import TopBarEditMenu from "./topBarEditMenu.vue"
const canvas = ref(null);

const props = defineProps({
  canvasWidth: {
    type: Number,
    default: 800 // Default canvas width
  },
  canvasHeight: {
    type: Number,
    default: 600 // Default canvas height
  }
})

const {canvasWidth, canvasHeight} = toRefs(props)
const backgroundImageUrl = ref("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWV9Gp7uaPqMXr9_r_095T0b-ly0ouYQtMJkiDfnc6z51S2WWo67PSj4zKUZrurYz9a7w&usqp=CAU")
const mouseClickOnCanvas = ref(false)
let fabricCanvas = ref({})
let currentMode = ref("")
let showBrushMenu = ref(false)
const burshButtonConfig = ref([{
  icon: "",
  label: "",
  callBack: (button) => {
    console.log(button)
  }
}])
const modes = {
  pan: 'pan',
  draw: 'draw'
}

onMounted(() => {
  // Initialize Fabric.js canvas
  fabricCanvas.value = new fabric.Canvas(canvas.value);

  // Example: Add a rectangle to the canvas
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'red',
    width: 100,
    height: 100
  });
  fabricCanvas.value.add(rect);

  if (backgroundImageUrl.value) {
    fabric.Image.fromURL(backgroundImageUrl.value, function(img) {
      fabricCanvas.value.setBackgroundImage(img, fabricCanvas.value.renderAll.bind(fabricCanvas.value), {
        scaleX: fabricCanvas.value.width / img.width,
        scaleY: fabricCanvas.value.height / img.height
      });
    });
  }

  
  // Event listener for mouse move
  fabricCanvas.value.on('mouse:move', handleMouseMove);
  fabricCanvas.value.on('mouse:down', () => {
    ToggleMouseUpAndDown(true)
  });
  fabricCanvas.value.on('mouse:up', () => {
    ToggleMouseUpAndDown(false)
  });
  fabricCanvas.value.selection = false

});

// Function to handle mouse move on canvas
function handleMouseMove(event) {
      
  const pointer = event.e;
  const mousePoint = new fabric.Point(pointer.movementX, pointer.movementY);
  if(mouseClickOnCanvas.value && currentMode.value === modes.pan) {
    fabricCanvas.value.setCursor('grab')
    console.log("event details on mouse:move",event)
    console.log('Mouse position:', pointer.x, pointer.y);
    // Add your logic here
    fabricCanvas.value.relativePan(mousePoint)
  }
  else if (mouseClickOnCanvas.value && currentMode.value === modes.draw) {
    // fabricCanvas.value.setCursor('pointer')
    // fabricCanvas.value.isDrawingMode = true;
  }
}

function ToggleMouseUpAndDown(data) {
  mouseClickOnCanvas.value = data
}
function toggleMode(mode) {
  if(mode === modes.pan) {
    if (currentMode.value === modes.pan) {
      currentMode.value = ""
    }
    else {
      currentMode.value = modes.pan;
      fabricCanvas.value.isDrawingMode = false
    } 
  }
  else if (mode === modes.draw) {
    if (currentMode.value === modes.draw) {
      fabricCanvas.value.isDrawingMode = false
      currentMode.value = ""
    }
    else {
      currentMode.value = modes.draw;
      fabricCanvas.value.isDrawingMode = true
    }
  }
}

</script>

<style lang="scss" scoped>
.canvas-wrapper {
  border: 2px solid black;
  height: 100%;
  flex-grow: 1;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 4px;
  .canvas {
    width: 100% !important;
    height: 100% !important;
  }
  .button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 5px;
    .canvas-button {
      padding: 4px 8px;
      border: 1px solid black;
      color: goldenrod;
      background: black;
      border-radius: 4px;
    }
    .active {
      font-weight: 700;
      border: 1px solid goldenrod;
      color: goldenrod;
      background: white;
    }
  }
}
</style>