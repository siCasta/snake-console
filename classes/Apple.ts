import { Cell } from '../types/general.d.ts'
import { Snake } from './Snake.ts'

interface AppleOptions {
    snake: Snake
    pos: Cell
}

export class Apple {
    snake
    pos

    constructor(options: AppleOptions) {
        this.snake = options.snake
        this.pos = options.pos
    }
}
