import { rows } from './config.ts'
import { columns } from './config.ts'

function placeApple() {
    return [
        Math.floor(Math.random() * (columns - 2)) + 1,
        Math.floor(Math.random() * (rows - 2)) + 1
    ]
}

while (true) {
    const pos = placeApple()
    console.log(pos)
    if (pos[0] < 1 || pos[0] > columns - 1 || pos[1] < 1 || pos[1] > rows - 1)
        break
}

console.log('err')
