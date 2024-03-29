import PawnPiece from "@/components/pieces/PawnPiece.vue";

interface PiecesMap {
  [key: string]: typeof PawnPiece
}

interface Coordinates {
  x: number;
  y: number;
}

interface Piece {
  name: string;
  color: string;
  position: Coordinates;
}

interface Directions {
  [key: string]: Coordinates;
}

interface Movements {
  directions: Directions;
  isContinuous: boolean;
}

interface MovementsMap {
    [key: string]: Movements
}

export type { Coordinates, Piece, Directions, Movements, MovementsMap, PiecesMap };
