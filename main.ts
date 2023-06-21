import { Game } from './classes/Game.ts'
import { columns, rows } from './utils/config.ts'

const game = new Game({ width: columns, height: rows })

game.run()
