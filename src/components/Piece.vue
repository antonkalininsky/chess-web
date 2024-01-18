<script setup lang="ts">
import Pawn from '@/components/pieces/Pawn.vue'
import Bishop from '@/components/pieces/Bishop.vue'
import King from '@/components/pieces/King.vue'
import Knight from '@/components/pieces/Knight.vue'
import Queen from '@/components/pieces/Queen.vue'
import Rook from '@/components/pieces/Rook.vue'

const props = defineProps({
    name: String,
    color: String
})

type Dict = { [key: string]: typeof Pawn };

const piecesMap: Dict = {
    pawn: Pawn,
    bishop: Bishop,
    king: King,
    knight: Knight,
    queen: Queen,
    rook: Rook
}
</script>

<template>
    <component :is="piecesMap[props.name as string]" class="piece" :color="props.color" />
</template>

<style scoped>
.piece {
    display: block;
}
</style>