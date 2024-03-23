import type { Piece } from "@/types/types";

const initPieces: Piece[] = [
  {
    name: "queen",
    color: "b",
    position: {
      x: 7,
      y: 0,
    },
  },
  {
    name: "king",
    color: "b",
    position: {
      x: 3,
      y: 0,
    },
  },
  {
    name: "king",
    color: "2",
    position: {
      x: 0,
      y: 7,
    },
  },
];

export { initPieces }
