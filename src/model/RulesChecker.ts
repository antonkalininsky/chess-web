import type { Coordinates, Piece, Directions } from "@/types/types"

class RulesChecker {
    constructor() {

    }

    getPossibleMoves(piece: Piece) {
        const directionsBishop: Directions = {
            'se': {
                x: 1,
                y: 1
            },
            'sw': {
                x: -1,
                y: 1
            },
            'nw': {
                x: -1,
                y: -1
            },
            'ne': {
                x: 1,
                y: -1
            }
        }

        const directionsKnight: Directions = {
            'sse': {
                x: 1,
                y: 2
            },
            'ssw': {
                x: -1,
                y: 2
            },
            'nnw': {
                x: -1,
                y: -2
            },
            'nne': {
                x: 1,
                y: -2
            },
            'nww': {
                x: -2,
                y: -1
            },
            'sww': {
                x: -2,
                y: 1
            },
            'nee': {
                x: 2,
                y: -1
            },
            'see': {
                x: 2,
                y: 1
            }
        }

        const directionsRook: Directions = {
            's': {
                x: 0,
                y: 1
            },
            'e': {
                x: 1,
                y: 0
            },
            'n': {
                x: 0,
                y: -1
            },
            'w': {
                x: -1,
                y: 0
            }
        }

        const directionsQueen: Directions = { ...directionsBishop, ...directionsRook }

        const borderCheck = (pos: Coordinates) => {
            return pos.x > 7 || pos.x < 0 || pos.y > 7 || pos.y < 0
        }
        const result: Coordinates[] = []
        switch (piece.name) {
            case 'king':
                Object.keys(directionsQueen).forEach(key => {
                    if (borderCheck({
                        x: piece.position.x + directionsQueen[key].x,
                        y: piece.position.y + directionsQueen[key].y
                    })) {
                        result.push({
                            x: piece.position.x + directionsQueen[key].x,
                            y: piece.position.y + directionsQueen[key].y
                        })
                    }
                })
                break
            case 'bishop':
                Object.keys(directionsBishop).forEach(key => {
                    let counter = 1
                    while (!borderCheck({
                        x: piece.position.x + directionsBishop[key].x * counter,
                        y: piece.position.y + directionsBishop[key].y * counter
                    })) {
                        result.push({
                            x: piece.position.x + directionsBishop[key].x * counter,
                            y: piece.position.y + directionsBishop[key].y * counter
                        })
                        counter++
                    }
                })
                break
            case 'knight':
                Object.keys(directionsKnight).forEach(key => {
                    if (borderCheck({
                        x: piece.position.x + directionsKnight[key].x,
                        y: piece.position.y + directionsKnight[key].y
                    })) {
                        result.push({
                            x: piece.position.x + directionsKnight[key].x,
                            y: piece.position.y + directionsKnight[key].y
                        })
                    }
                })
                break
            case 'pawn':
                console.log('todo')
                break
            case 'rook':
                Object.keys(directionsRook).forEach(key => {
                    let counter = 1
                    while (!borderCheck({
                        x: piece.position.x + directionsRook[key].x * counter,
                        y: piece.position.y + directionsRook[key].y * counter
                    })) {
                        result.push({
                            x: piece.position.x + directionsRook[key].x * counter,
                            y: piece.position.y + directionsRook[key].y * counter
                        })
                        counter++
                    }
                })
                break
            case 'queen':
                Object.keys(directionsQueen).forEach(key => {
                    let counter = 1
                    while (!borderCheck({
                        x: piece.position.x + directionsQueen[key].x * counter,
                        y: piece.position.y + directionsQueen[key].y * counter
                    })) {
                        result.push({
                            x: piece.position.x + directionsQueen[key].x * counter,
                            y: piece.position.y + directionsQueen[key].y * counter
                        })
                        counter++
                    }
                })
                break
            default:
                throw new Error('unknown chess piece')
        }
        console.log(result)
        return result
    }
}