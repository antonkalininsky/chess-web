<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PieceImage from './components/Piece.vue';
import type { Coordinates, Piece } from "@/types/types"
import { Game } from './model/Game';

const game = new Game()

const possibleMoves = ref<Coordinates[]>([])

let clickNumber: number = 0

const NUMBER_OF_CELLS: number = 8
const NUMBER_OF_ROWS: number = 8

let clickStatus: string = 'empty'

const numberChecker = (num: number) => {
  const offset: number = Math.floor(num / 8) % 2
  if (offset === 1) {
    return (num % 2) === 0
  }
  return (num % 2) === 1
}

const cellColorator = (coord: Coordinates) => {
  return (coord.x % 2) === ((coord.y % 2) === 0 ? 0 : 1)
}

const piecesTest = computed(() => game.pieces)

onMounted(() => {
  // game.initGame()
})


const pieces = ref<Piece[]>([])

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

const possibleMovesChecker = (num: number): any => {
  const position: Coordinates = rowInCoordinatesConverter(num)
  const move = possibleMoves.value.find((move) => {
    return move.x === position.x && move.y === position.y
  })
  return move
}

const handleTileClick = (num: number): void => {
  const {x, y} = rowInCoordinatesConverter(num)

  // const piece = existanceChecker(num)
  // if (piece) {
  //   // update start coordinates
  //   clickNumber = num
  //   clickStatus = 'figure'
  //   possibleMoves.value = game.getPossibleMoves(piece)
  // } else {
  //   if (clickStatus === 'figure') {
  //     // move
  //     const targetPiece = existanceChecker(clickNumber)
  //     const newPosition = rowInCoordinatesConverter(num)
  //     targetPiece.position.x = newPosition.x
  //     targetPiece.position.y = newPosition.y
  //   }
  //   clickStatus = 'empty'
  // }
}

</script>

<template>
  <div class="board">
    <div
      v-for="coordY in NUMBER_OF_ROWS"
      :key="coordY"
      class="board--row"
    >
      <div
        v-for="coordX in NUMBER_OF_CELLS"
        :key="coordX"
        class="cell"
        :class="{ 'cell--green' : cellColorator({x: coordX, y: coordY}) }"
      >
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
  grid-template-rows: repeat(8, 1fr);
}

.board--row {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
}

.cell {
  width: 100px;
  height: 100px;

  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  vertical-align: center;

  background-color: lightgray;
}

.cell--white {
  background-color: lightgray;
}

.cell--green {
  background-color: teal;
}

.cell--possible {
  border: 3px solid red;
}
</style>
