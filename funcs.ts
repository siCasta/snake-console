import { Matrix } from './classes/Matrix.ts'
import { Cell } from './types/general.d.ts'

export function createCells(width: number, height: number) {
    const cells = new Matrix<Cell>()

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) cells.addItem([col, row])
    }

    return cells
}

export function sleep(seconds: number) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}
