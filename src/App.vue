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

</script>

<template>
  <div class="board">
    <div v-for="num in NUMBER_OF_CELLS" :key="num" class="cell" :class="{
      'cell--green': numberChecker(num - 1),
      'cell--white': !numberChecker(num - 1)
    }">
      <div class="piece">
        <Piece name="king" color="w" />
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
