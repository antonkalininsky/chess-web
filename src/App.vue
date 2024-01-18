<script setup lang="ts">
import Piece from './components/Piece.vue';

const NUMBER_OF_CELLS = 64

const numberChecker = (num: number) => {
  const offset: number = Math.floor(num / 8) % 2
  if (offset === 1) {
    return (num % 2) === 0
  }
  return (num % 2) === 1
}

// todo typing
const pieces = [
  {
    name: 'king',
    color: 'b',
    position: {
      x: 7,
      y: 0
    }
  }
]

interface Coordinates {
  x: number,
  y: number
}

const rowInCoordinatesConverter = (num: number): Coordinates => {
  const preX = num % 8
  const coordX = (preX === 0 ? 8 : preX) - 1
  const preY = Math.floor(num / 8)
  const coordY = preX === 0 ? preY - 1 : preY
  return {
    x: coordX,
    y: coordY
  }
}

const existanceChecker = (num: number): any => {
  console.log('called on number: ', num)
  const position: Coordinates = rowInCoordinatesConverter(num)
  const piece = pieces.find((piece) => {
    return piece.position.x === position.x && piece.position.y === position.y
  })
  return piece
}

</script>

<template>
  <div class="board">
    <div v-for="num in NUMBER_OF_CELLS" :key="num" class="cell" :class="{
      'cell--green': numberChecker(num - 1),
      'cell--white': !numberChecker(num - 1)
    }">
      <div class="piece">
        <Piece v-if="existanceChecker(num)" :name="existanceChecker(num).name" :color="existanceChecker(num).color" />
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
