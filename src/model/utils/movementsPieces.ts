import {
  directionsBishop,
  directionsKnight,
  directionsRook,
  directionsQueen,
} from "./directionsPieces";
import type { Movements, MovementsMap } from "@/types/types";

const bishop: Movements = {
  directions: directionsBishop,
  isContinuous: true,
};

const knight: Movements = {
  directions: directionsKnight,
  isContinuous: false,
};

const rook: Movements = {
  directions: directionsRook,
  isContinuous: true,
};

const queen: Movements = {
  directions: directionsQueen,
  isContinuous: true,
};

const king: Movements = {
  directions: directionsQueen,
  isContinuous: false,
};

const allMovements: MovementsMap = {
  king,
  queen,
  rook,
  knight,
  bishop,
};

export { allMovements };
