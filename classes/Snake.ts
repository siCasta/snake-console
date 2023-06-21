import { KeyPressEvent, keypress } from 'keypress'
import { directions } from '../utils/config.ts'
import { Cell } from '../types/general.d.ts'
import { Matrix, compareArrays } from './Matrix.ts'
import { Game } from './Game.ts'

interface SnakeOptions {
    pos: Cell
    game: Game
}

export class Snake extends Matrix<Cell> {
    private game
    private direction
    private eaten
    private inputLoaded

    constructor(options: SnakeOptions) {
        super([options.pos])

        this.game = options.game
        this.direction = directions.left
        this.eaten = false
        this.inputLoaded = false
    }

    private get touchingBorder() {
        const head = this.matrix[0]

        return (
            head[0] <= 1 ||
            head[0] >= this.game.getWidth - 2 ||
            head[1] <= 0 ||
            head[1] >= this.game.getHeight - 1
        )
    }

    // getters
    get getHead() {
        return this.matrix[0]
    }

    // setter
    set setEaten(bool: boolean) {
        this.eaten = bool
    }

    movement() {
        const head = this.getHead
        const direction = this.direction
        const newHead = [head[0] + direction[0], head[1] + direction[1]] as Cell

        this.matrix.unshift(newHead)

        if (!this.eaten) this.matrix.pop()

        this.eaten = false
    }

    detectDirection(
        headDirection: 'up' | 'down' | 'left' | 'right',
        keyEvent: KeyPressEvent
    ) {
        const direction = this.direction
        const bodyLength = this.matrix.length

        const directions = {
            up:
                (keyEvent.key === 'w' || keyEvent.key === 'up') &&
                (bodyLength === 1 || direction[1] !== 1),
            down:
                (keyEvent.key === 's' || keyEvent.key === 'down') &&
                (bodyLength === 1 || direction[1] !== -1),
            left:
                (keyEvent.key === 'a' || keyEvent.key === 'left') &&
                (bodyLength === 1 || direction[0] !== 2),
            right:
                (keyEvent.key === 'd' || keyEvent.key === 'right') &&
                (bodyLength === 1 || direction[0] !== -2)
        }

        return directions[headDirection]
    }

    input() {
        this.inputLoaded = true

        keypress().addEventListener('keydown', e => {
            if (this.detectDirection('up', e)) {
                setTimeout(() => {
                    this.direction = directions.up
                }, 10)
            } else if (this.detectDirection('down', e)) {
                setTimeout(() => {
                    this.direction = directions.down
                }, 10)
            } else if (this.detectDirection('left', e)) {
                setTimeout(() => {
                    this.direction = directions.left
                }, 10)
            } else if (this.detectDirection('right', e)) {
                setTimeout(() => {
                    this.direction = directions.right
                }, 10)
            }

            if (e.ctrlKey && e.key === 'c') Deno.exit(1)
        })
    }

    collisions() {
        const head = this.matrix[0]
        const body = this.matrix.filter((_, i) => i !== 0)

        if (body.length > 0) {
            for (const bodyPart of body)
                if (compareArrays(head, bodyPart)) this.game.setGameOver = true
        }

        if (this.touchingBorder) this.game.setGameOver = true
    }

    update() {
        if (!this.inputLoaded) this.input()

        this.movement()
        this.collisions()
    }
}
