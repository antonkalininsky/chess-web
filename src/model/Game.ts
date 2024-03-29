import type { Coordinates, Piece } from "@/types/types";
import { allMovements } from "./utils/movementsPieces";
import { initPieces } from "./utils/initPieces";
import { ref } from "vue";

class Game {
  // consts
  NUMBER_OF_CELLS: number = 8;
  NUMBER_OF_ROWS: number = 8;

  // variables
  pieces = ref<Piece[]>([]);
  status: string | null = null;
  previousPosition: Coordinates | null = null;
  currentPosition = ref<Coordinates | null>(null);
  possibleMoves = ref<Coordinates[]>([]);

  constructor() {}

  getBoardSizes() {
    return {
      sizeX: this.NUMBER_OF_CELLS,
      sizeY: this.NUMBER_OF_ROWS,
    };
  }

  getPossibleMoves(): Coordinates[] {
    return this.possibleMoves.value;
  }

  getCurrentPosition(): Coordinates | null {
    return this.currentPosition.value;
  }

  getAllPieces(): Piece[] {
    return this.pieces.value;
  }

  getPieceByCoordinates(x: number, y: number): Piece | undefined {
    return this.pieces.value.find(
      (piece) => piece.position.x === x && piece.position.y === y
    );
  }

  initGame(): void {
    this.pieces.value = initPieces;
  }

  input(pos: Coordinates): void {
    this.previousPosition = this.currentPosition.value;
    this.currentPosition.value = pos;
    if (this.currentPosition.value) {
      this.calculatePossibleMoves()
    }
    if (this.previousPosition && this.currentPosition.value) {
      this.handleMovement();
    }
  }

  handleMovement(): void {
    const piece1 = this.getPieceByCoordinates(
      this.previousPosition!.x,
      this.previousPosition!.y
    );
    const piece2 = this.getPieceByCoordinates(
      this.currentPosition.value!.x,
      this.currentPosition.value!.y
    );
    if (piece1 && !piece2) {
      // accept movement
      piece1.position.x = this.currentPosition.value!.x;
      piece1.position.y = this.currentPosition.value!.y;
      this.previousPosition = null;
      this.currentPosition.value = null;
    }
  }

  calculatePossibleMoves(): void {
    const borderCheck = (pos: Coordinates): boolean => {
      return pos.x > 8 || pos.x < 1 || pos.y > 8 || pos.y < 1;
    };
    const piece: Piece | undefined = this.getPieceByCoordinates(
      this.currentPosition.value!.x,
      this.currentPosition.value!.y
    );
    if (!piece) {
      this.possibleMoves.value = [];
      return;
    }
    if (piece.name === "pawn") {
      console.log("todo");
      this.possibleMoves.value = [];
      return;
    }
    if (!(piece.name in allMovements)) {
      throw Error("unknown chess piece!");
    }
    const result: Coordinates[] = [];
    const currentDirections = allMovements[piece.name].directions;
    const isContinuous = allMovements[piece.name].isContinuous;
    Object.keys(currentDirections).forEach((key) => {
      let counter: number = 1;
      const isBlocked: boolean = false;
      do {
        const x = piece.position.x + currentDirections[key].x * counter;
        const y = piece.position.y + currentDirections[key].y * counter;
        const isBlocked = borderCheck({ x, y });
        if (!isBlocked) {
          result.push({ x, y });
          counter++;
        }
      } while (isContinuous && isBlocked);
    });
    this.possibleMoves.value = result;
  }
}

export { Game };
