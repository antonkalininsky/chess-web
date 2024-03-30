<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import PieceComponent from './components/PieceComponent.vue';
import type { Coordinates } from "@/types/types"
import { Game } from './model/Game';

const game = new Game()

const boardSize = ref<Coordinates | null>(null)

const currentPosition = computed(() => {
  return game.getCurrentPosition()
})

onMounted(() => {
  console.log('hello world')
  const { sizeX, sizeY } = game.getBoardSizes()
  boardSize.value = {
    x: sizeX,
    y: sizeY
  }
  game.initGame()
})

const cellColorator = (x: number, y: number) => {
  return (x % 2) === ((y % 2) === 0 ? 0 : 1)
}

const cellCursorCheck = (x: number, y: number) => {
  return x === currentPosition.value?.x && y === currentPosition.value?.y
}

const handleCellClick = (x: number, y: number): void => {
  game.input({x, y})
}

const pieceChecker = (x: number, y: number): object | null => {
  const result = game.getPieceByCoordinates(x, y)
  if (result) {
    return {
      name: result.name,
      color: result.color
    }
  }
  return null
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
        class="cell"
        :class="{
          'cursor' : cellCursorCheck(coordX, coordY),
          'cell--green' : cellColorator(coordX, coordY)
        }"
        @click="handleCellClick(coordX, coordY)"
      >
        <PieceComponent
          v-if="pieceChecker(coordX, coordY)"
          v-bind="pieceChecker(coordX, coordY)"
        />
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

.cursor {
  border: 3px solid red;
}
</style>
