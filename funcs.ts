import { Position } from './types/general.d.ts'

export function createCells(width: number, height: number) {
    const cells: Position[] = []

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) cells.push([col, row])
    }

    return cells
}

export function sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}
