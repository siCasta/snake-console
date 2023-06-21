import { Cell } from '../types/general.d.ts'
import { Game } from './Game.ts'
import { compareArrays } from './Matrix.ts'
import { Snake } from './Snake.ts'

interface AppleOptions {
    snake: Snake
    game: Game
}

export class Apple {
    snake
    game
    pos

    constructor(options: AppleOptions) {
        this.snake = options.snake
        this.game = options.game
        this.pos = this.placeApple()
    }

    placeApple() {
        let col = Math.floor(Math.random() * (this.game.getWidth - 4)) + 2
        let row = Math.floor(Math.random() * (this.game.getHeight - 2)) + 1

        while (col % 2 !== 0 || this.snake.hasItem([col, row])) {
            col = Math.floor(Math.random() * (this.game.getWidth - 4)) + 2
            row = Math.floor(Math.random() * (this.game.getHeight - 2)) + 1
        }

        return [col, row] as Cell
    }

    collision() {
        if (compareArrays(this.snake.getHead, this.pos)) {
            this.game.setScore = this.game.getScore + 1
            this.game.setScoreText = this.game.getScore
            this.pos = this.placeApple()
            this.snake.matrix
            this.snake.setEaten = true
        }
    }

    update() {
        this.collision()
    }
}
