<script setup lang="ts">
import { ref } from 'vue'
import PieceImage from './components/Piece.vue';
import type { Coordinates, Piece } from "@/types/types"

const clickPosition = ref<Coordinates>({
  x: 0,
  y: 0
})

let clickNumber: number = 0

const NUMBER_OF_CELLS = 64

let clickStatus: string = 'empty'

const numberChecker = (num: number) => {
  const offset: number = Math.floor(num / 8) % 2
  if (offset === 1) {
    return (num % 2) === 0
  }
  return (num % 2) === 1
}

const pieces = ref<Piece[]>([
  {
    name: 'king',
    color: 'b',
    position: {
      x: 7,
      y: 0
    }
  }
])


const rowInCoordinatesConverter = (num: number): Coordinates => {
  const preX = num % 8
  const x = (preX === 0 ? 8 : preX) - 1
  const preY = Math.floor(num / 8)
  const y = preX === 0 ? preY - 1 : preY
  return {
    x,
    y
  }
}

// todo - typing
const existanceChecker = (num: number): any => {
  const position: Coordinates = rowInCoordinatesConverter(num)
  const piece = pieces.value.find((piece) => {
    return piece.position.x === position.x && piece.position.y === position.y
  })
  return piece
}

const handleTileClick = (num: number): void => {
  const piece = existanceChecker(num)
  if (piece) {
    // update start coordinates
    clickNumber = num
    clickStatus = 'figure'
  } else {
    if (clickStatus === 'figure') {
      // move
      const targetPiece = existanceChecker(clickNumber)
      const newPosition = rowInCoordinatesConverter(num)
      targetPiece.position.x = newPosition.x
      targetPiece.position.y = newPosition.y
    }
    clickStatus = 'empty'
  }
}

</script>

<template>
  <div class="board">
    <div v-for="num in NUMBER_OF_CELLS" :key="num" class="cell" :class="{
      'cell--green': numberChecker(num - 1),
      'cell--white': !numberChecker(num - 1)
    }">
      <div class="piece" @click="handleTileClick(num)">
        <PieceImage v-if="existanceChecker(num)" :name="existanceChecker(num).name"
          :color="existanceChecker(num).color" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.piece {
  width: 80px;
  height: 80px;
}

.board {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
}

.cell {
  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  vertical-align: center;
}

.cell--white {
  background-color: lightgray;
}

.cell--green {
  background-color: teal;
}
</style>
