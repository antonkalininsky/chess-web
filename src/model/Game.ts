import type { Coordinates, Piece, Directions } from "@/types/types";
import {
  directionsBishop,
  directionsKnight,
  directionsRook,
  directionsQueen,
} from "./utils/directionsPieces";
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

  constructor() {}

  getBoardSizes() {
    return {
      sizeX: this.NUMBER_OF_CELLS,
      sizeY: this.NUMBER_OF_ROWS,
    };
  }

  getCurrentPosition() {
    return this.currentPosition.value;
  }

  getAllPieces() {
    return this.pieces.value;
  }

  getPieceByCoordinates(x: number, y: number) {
    return this.pieces.value.find(
      (piece) => piece.position.x === x && piece.position.y === y
    );
  }

  initGame() {
    this.pieces.value = initPieces;
  }

  input(pos: Coordinates) {
    this.previousPosition = this.currentPosition.value;
    this.currentPosition.value = pos;
  }

  existanceChecker(pos: Coordinates): Piece | undefined {
    return undefined
    // return this.pieces.find(
    //   (piece) => piece.position.x === pos.x && piece.position.y === pos.y
    // );
  }

  getPossibleMoves(piece: Piece): Coordinates[] {
    const borderCheck = (pos: Coordinates) => {
      return pos.x > 7 || pos.x < 0 || pos.y > 7 || pos.y < 0;
    };
    const result: Coordinates[] = [];
    switch (piece.name) {
      case "king":
        Object.keys(directionsQueen).forEach((key) => {
          if (
            !borderCheck({
              x: piece.position.x + directionsQueen[key].x,
              y: piece.position.y + directionsQueen[key].y,
            })
          ) {
            result.push({
              x: piece.position.x + directionsQueen[key].x,
              y: piece.position.y + directionsQueen[key].y,
            });
          }
        });
        break;
      case "bishop":
        Object.keys(directionsBishop).forEach((key) => {
          let counter = 1;
          while (
            !borderCheck({
              x: piece.position.x + directionsBishop[key].x * counter,
              y: piece.position.y + directionsBishop[key].y * counter,
            })
          ) {
            result.push({
              x: piece.position.x + directionsBishop[key].x * counter,
              y: piece.position.y + directionsBishop[key].y * counter,
            });
            counter++;
          }
        });
        break;
      case "knight":
        Object.keys(directionsKnight).forEach((key) => {
          if (
            !borderCheck({
              x: piece.position.x + directionsKnight[key].x,
              y: piece.position.y + directionsKnight[key].y,
            })
          ) {
            result.push({
              x: piece.position.x + directionsKnight[key].x,
              y: piece.position.y + directionsKnight[key].y,
            });
          }
        });
        break;
      case "pawn":
        console.log("todo");
        break;
      case "rook":
        Object.keys(directionsRook).forEach((key) => {
          let counter = 1;
          while (
            !borderCheck({
              x: piece.position.x + directionsRook[key].x * counter,
              y: piece.position.y + directionsRook[key].y * counter,
            })
          ) {
            result.push({
              x: piece.position.x + directionsRook[key].x * counter,
              y: piece.position.y + directionsRook[key].y * counter,
            });
            counter++;
          }
        });
        break;
      case "queen":
        Object.keys(directionsQueen).forEach((key) => {
          let counter = 1;
          while (
            !borderCheck({
              x: piece.position.x + directionsQueen[key].x * counter,
              y: piece.position.y + directionsQueen[key].y * counter,
            })
          ) {
            result.push({
              x: piece.position.x + directionsQueen[key].x * counter,
              y: piece.position.y + directionsQueen[key].y * counter,
            });
            counter++;
          }
        });
        break;
      default:
        throw new Error("unknown chess piece");
    }
    return result;
  }
}

export { Game };
