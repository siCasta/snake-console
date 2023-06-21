import { Matrix } from '../classes/Matrix.ts'
import { Cell } from '../types/general.d.ts'

export const consoleSize = (w: number, h: number) => {
    if (w % 2 !== 0) w -= 1

    return { w, h }
}

export const createCells = (width: number, height: number) => {
    const cells = new Matrix<Cell>()

    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) cells.matrix.push([col, row])
    }

    return cells
}

export const sleep = (seconds: number) =>
    new Promise(resolve => setTimeout(resolve, seconds * 1000))
