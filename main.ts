import { tty } from 'tty'
import { keypress } from 'keypress'
import { cells, columns, directions, rows } from './config.ts'
import { Cell } from './types/general.d.ts'
import { sleep } from './funcs.ts'

interface GameOptions {
    width: number
    height: number
}

class Game {
    width
    height
    screen: string[]
    score
    scoreText
    applePos: Cell
    snakeBody: Cell[]
    direction
    eaten
    speed

    constructor(options: GameOptions) {
        this.width = options.width
        this.height = options.height
        this.screen = []
        this.score = 0
        this.scoreText = ` Score ${this.score} `
        this.snakeBody = [
            [Math.floor((columns - 2) / 2), Math.floor((rows - 2) / 2)]
        ]
        this.applePos = this.placeApple()
        this.direction = directions.right
        this.eaten = false
        this.speed = 0.1
    }

    appleCollision() {
        if (
            this.applePos[0] === this.snakeBody[0][0] &&
            this.applePos[1] === this.snakeBody[0][1]
        ) {
            this.score++
            this.speed *= 0.99
            this.changeScoreText()
            this.applePos = this.placeApple()
            this.eaten = true
        }
    }

    changeScoreText() {
        this.scoreText = ` Score ${this.score} `
    }

    setInput() {
        keypress().addEventListener('keydown', e => {
            if (
                (e.key === 'w' || e.key === 'up') &&
                (this.snakeBody.length === 1 || this.direction[1] !== 1)
            )
                this.direction = directions.up
            else if (
                (e.key === 's' || e.key === 'down') &&
                (this.snakeBody.length === 1 || this.direction[1] !== -1)
            )
                this.direction = directions.down
            else if (
                (e.key === 'a' || e.key === 'left') &&
                (this.snakeBody.length === 1 || this.direction[0] !== 1)
            )
                this.direction = directions.left
            else if (
                (e.key === 'd' || e.key === 'right') &&
                (this.snakeBody.length === 1 || this.direction[0] !== -1)
            )
                this.direction = directions.right

            if (e.ctrlKey && e.key === 'c') Deno.exit(1)
        })
    }

    updateSnake() {
        const newHead = [
            this.snakeBody[0][0] + this.direction[0],
            this.snakeBody[0][1] + this.direction[1]
        ]
        this.snakeBody.unshift(newHead as Cell)

        if (!this.eaten) this.snakeBody.pop()

        this.eaten = false
    }

    placeApple() {
        let pos = [
            Math.floor(Math.random() * (columns - 2)) + 1,
            Math.floor(Math.random() * (rows - 2)) + 1
        ] as Cell

        while (this.isSnake(pos)) {
            pos = [
                Math.floor(Math.random() * (columns - 2)) + 1,
                Math.floor(Math.random() * (rows - 2)) + 1
            ]
        }
        return pos
    }

    isBorder(cell: Cell) {
        return (
            cell[0] === 0 ||
            cell[0] === columns - 1 ||
            cell[1] === 0 ||
            cell[1] === rows - 1
        )
    }

    clearScreen() {
        this.screen = []
    }

    isScoreText(cell: Cell) {
        return (
            cell[0] >= 3 && cell[0] < 3 + this.scoreText.length && cell[1] === 0
        )
    }

    setScoreText(screen: string[], n: number) {
        screen.push(this.scoreText[n - 3])
    }

    isSnake(cell: Cell) {
        // return this.snakeBody.join(' ').split(' ').includes(cell.join(','))
        for (const snakePart of this.snakeBody) {
            if (snakePart[0] === cell[0] && snakePart[1] === cell[1])
                return true
        }
    }

    bodyCollision(head: Cell) {
        const newSnakeBody = this.snakeBody.filter((_, i) => i !== 0)

        if (newSnakeBody.length > 0) {
            for (const snakePart of newSnakeBody) {
                if (snakePart[0] === head[0] && snakePart[1] === head[1])
                    return true
            }
        }
    }

    printScreen() {
        this.clearScreen()
        tty.cursorHide()

        for (const cell of cells.getMatrix) {
            if (this.isScoreText(cell)) this.setScoreText(this.screen, cell[0])
            else if (this.isBorder(cell)) this.screen.push('█')
            else if (this.isSnake(cell)) {
                if (
                    this.snakeBody[0][0] === cell[0] &&
                    this.snakeBody[0][1] === cell[1]
                )
                    this.screen.push('#')
                else this.screen.push('O')
            } else if (
                cell[0] === this.applePos[0] &&
                cell[1] === this.applePos[1]
            )
                this.screen.push('@')
            else this.screen.push(' ')

            if (cell[0] === columns - 1) this.screen.push('\n')
        }

        console.log(this.screen.join(''), 'Exit ctrl + c')
    }

    async gameOver() {
        if (
            this.isBorder(this.snakeBody[0]) ||
            this.bodyCollision(this.snakeBody[0])
        ) {
            console.clear()
            console.log(`Your score was ${this.score}`)
            console.log('Exit ctrl + c')
            for await (const exit of keypress())
                if (exit.ctrlKey && exit.key === 'c') Deno.exit()
        }
    }

    async run() {
        this.setInput()

        while (true) {
            this.updateSnake()
            this.appleCollision()
            this.printScreen()
            await sleep(this.speed)
            console.clear()
            await this.gameOver()
        }
    }
}

const game = new Game({
    width: columns,
    height: rows
})

console.clear()
game.run()
