<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PieceImage from './components/Piece.vue';
import type { Coordinates, Piece } from "@/types/types"
import { Game } from './model/Game';

const game = new Game()

const boardSize = ref<Coordinates | null>(null)

onMounted(() => {
  const { sizeX, sizeY } = game.getBoardSizes()
  boardSize.value = {
    x: sizeX,
    y: sizeY
  }
  // game.initGame()
})

const cellColorator = (coord: Coordinates) => {
  return (coord.x % 2) === ((coord.y % 2) === 0 ? 0 : 1)
}

const pieces = ref<Piece[]>([])

const handleTileClick = (x: number, y: number): void => {
  console.log(x, y)
}

</script>

<template>
  <div
    v-if="boardSize"
    class="board"
  >
    <div
      v-for="coordY in boardSize.y"
      :key="coordY"
      class="board--row"
    >
      <div
        v-for="coordX in boardSize.x"
        :key="coordX"
        @click="handleTileClick(coordX, coordY)"
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
