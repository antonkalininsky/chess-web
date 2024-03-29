<script setup lang="ts">
import PawnPiece from '@/components/pieces/PawnPiece.vue'
import BishopPiece from '@/components/pieces/BishopPiece.vue'
import KingPiece from '@/components/pieces/KingPiece.vue'
import KnightPiece from '@/components/pieces/KnightPiece.vue'
import QueenPiece from '@/components/pieces/QueenPiece.vue'
import RookPiece from '@/components/pieces/RookPiece.vue'
import type { PiecesMap } from '@/types/types'

const props = defineProps({
    name: {
      type: String,
      default: 'king'
    },
    color: {
      type: String,
      default: 'w'
    }
})

const piecesMap: PiecesMap = {
    pawn: PawnPiece,
    bishop: BishopPiece,
    king: KingPiece,
    knight: KnightPiece,
    queen: QueenPiece,
    rook: RookPiece
}
</script>

<template>
  <component
    :is="piecesMap[props.name as string]"
    class="piece"
    :color="props.color"
  />
</template>

<style scoped>
.piece {
    display: block;
}
</style>