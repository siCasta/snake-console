import { directions } from '../config.ts'
import { Cell } from '../types/general.d.ts'
import { Matrix } from './Matrix.ts'

interface SnakeOptions {
    pos: Cell
}

export class Snake extends Matrix<Cell> {
    direction
    eaten

    constructor(options: SnakeOptions) {
        super([options.pos])
        this.direction = directions.left
        this.eaten = false
    }

    update() {
        const head = this.getMatrix[0]
        const direction = this.direction
        const newHead: Cell = [head[0] - direction[0], head[1] - direction[1]]

        this.addItem(newHead, 0)

        if (!this.eaten) this.removeItem()

        this.eaten = true
    }
}
