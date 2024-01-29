interface Coordinates {
    x: number,
    y: number
}

interface Piece {
    name: string,
    color: string,
    position: Coordinates
}

interface Directions {
    [key: string]: Coordinates
}

export type { Coordinates, Piece, Directions }