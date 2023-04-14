import { createCells } from './funcs.ts'
export const columns = Deno.consoleSize().columns
export const rows = Deno.consoleSize().rows - 2
export const cells = createCells(columns, rows)
export const directions = {
    left: [-1, 0],
    right: [1, 0],
    up: [0, -1],
    down: [0, 1]
}
