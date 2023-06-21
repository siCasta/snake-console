import { tty } from 'tty'
import { keypress } from 'keypress'
import { bgRgb24, brightGreen, brightRed, green, red, rgb24 } from 'colors'
import { Apple } from './Apple.ts'
import { Snake } from './Snake.ts'
import { cells } from '../utils/config.ts'
import { Cell } from '../types/general.d.ts'
import { compareArrays } from './Matrix.ts'

interface GameOptions {
    width: number
    height: number
}

export class Game {
    private width
    private height
    private isGameOver
    private isGameWon
    private snake
    private apple
    private intervalId?: number
    private score
    private scoreText
    private screen: string[]

    constructor(options: GameOptions) {
        this.width = options.width
        this.height = options.height
        this.isGameOver = false
        this.isGameWon = false
        this.snake = new Snake({
            pos: [Math.floor(this.width / 2), Math.floor(this.height / 2)],
            game: this
        })
        this.apple = new Apple({
            snake: this.snake,
            game: this
        })
        this.score = 0
        this.scoreText = ` Score ${this.score} `
        this.screen = []
    }

    // getters
    get getWidth() {
        return this.width
    }

    get getHeight() {
        return this.height
    }

    get getScore() {
        return this.score
    }

    get getScreen() {
        return this.screen.join('')
    }

    // setters
    get getGameOver() {
        return this.gameOver
    }

    set setGameOver(bool: boolean) {
        this.isGameOver = bool
    }

    set setScoreText(score: number) {
        this.scoreText = ` Score ${score} `
    }

    set setScore(score: number) {
        this.score = score
    }

    set setScreen(string: string) {
        this.screen.push(string)
    }

    // score
    drawScore(n: number) {
        return this.scoreText[n - 6]
    }

    // screen
    isScore(cell: Cell) {
        return (
            cell[0] >= 6 && cell[0] < 6 + this.scoreText.length && cell[1] === 0
        )
    }

    isBorder(cell: Cell) {
        return (
            cell[0] <= 1 ||
            cell[0] >= this.width - 2 ||
            cell[1] === 0 ||
            cell[1] === this.height - 1
        )
    }

    isSnake(cell: Cell) {
        return (
            this.snake.hasItem([cell[0] - 1, cell[1]]) ||
            this.snake.hasItem(cell)
        )
    }

    isApple(cell: Cell) {
        return (
            compareArrays(this.apple.pos, [cell[0] - 1, cell[1]]) ||
            compareArrays(this.apple.pos, cell)
        )
    }

    drawScreen() {
        tty.cursorHide()
        this.screen = []

        for (const cell of cells.matrix) {
            if (this.isScore(cell))
                this.setScreen = bgRgb24(
                    rgb24(this.drawScore(cell[0]), 0x617a55),
                    0xe3f2c1
                )
            else if (this.isBorder(cell)) this.setScreen = rgb24('█', 0x617a55)
            else if (this.isSnake(cell)) this.setScreen = rgb24('█', 0xaac8a7)
            else if (this.isApple(cell)) this.setScreen = rgb24('█', 0xbe5a83)
            else this.setScreen = bgRgb24(' ', 0xe3f2c1)

            if (cell[0] === this.width - 1) this.setScreen = '\n'
        }

        console.log(this.getScreen, 'Exit ctrl + c')
    }

    gameOver() {
        if (
            this.score >=
            Math.floor((this.width - 4) / 2) * Math.floor(this.height - 2) - 1
        ) {
            console.clear()
            this.intervalId = undefined
            console.log(`You win, your score is ${this.score}`)
            console.log('Exit ctrl + c')
        } else if (this.isGameOver) {
            this.intervalId = undefined
            console.clear()
            console.log(`You lose, your score is ${this.score}`)
            console.log('Exit ctrl + c')
        }
    }

    run() {
        if (!this.intervalId) {
            this.intervalId = setInterval(() => {
                console.clear()
                this.snake.update()
                this.apple.update()
                this.drawScreen()
                this.gameOver()
            }, 100)
        } else {
            this.intervalId = undefined
        }
    }
}
