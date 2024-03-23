import type { Directions } from "@/types/types";

const directionsBishop: Directions = {
  se: {
    x: 1,
    y: 1,
  },
  sw: {
    x: -1,
    y: 1,
  },
  nw: {
    x: -1,
    y: -1,
  },
  ne: {
    x: 1,
    y: -1,
  },
};

const directionsKnight: Directions = {
  sse: {
    x: 1,
    y: 2,
  },
  ssw: {
    x: -1,
    y: 2,
  },
  nnw: {
    x: -1,
    y: -2,
  },
  nne: {
    x: 1,
    y: -2,
  },
  nww: {
    x: -2,
    y: -1,
  },
  sww: {
    x: -2,
    y: 1,
  },
  nee: {
    x: 2,
    y: -1,
  },
  see: {
    x: 2,
    y: 1,
  },
};

const directionsRook: Directions = {
  s: {
    x: 0,
    y: 1,
  },
  e: {
    x: 1,
    y: 0,
  },
  n: {
    x: 0,
    y: -1,
  },
  w: {
    x: -1,
    y: 0,
  },
};

const directionsQueen: Directions = {
  ...directionsBishop,
  ...directionsRook,
};

export { directionsBishop, directionsKnight, directionsRook, directionsQueen };
