import { consoleSize, createCells } from './funcs.ts'

export const { w: columns, h: rows } = consoleSize(40, 20)
export const cells = createCells(columns, rows)
export const directions = {
    left: [-2, 0],
    right: [2, 0],
    up: [0, -1],
    down: [0, 1]
}
