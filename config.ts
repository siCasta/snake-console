import { createCells } from './funcs.ts'

export const columns = Math.floor(Deno.consoleSize().columns)
export const rows = Math.floor(Deno.consoleSize().rows - 4)
export const cells = createCells(columns, rows)
export const directions = {
    left: [-2, 0],
    right: [2, 0],
    up: [0, -1],
    down: [0, 1]
}
