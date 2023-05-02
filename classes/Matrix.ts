type MatrixItemType<T> = [T] extends [unknown[]] ? T : T[]
type MatrixType<T> = MatrixItemType<T>[]

type MatrixFindItemCallback<T> = (
    value: MatrixItemType<T>,
    index?: number
) => boolean

type MatrixFilterItemCallback<T> = (
    value: MatrixItemType<T>,
    index?: number
) => boolean

export class Matrix<T> {
    #matrix

    static compareItems<T>(
        value: MatrixItemType<T>,
        ...items: MatrixItemType<T>[]
    ) {
        return items.every(e => value.every((v, i) => v === e[i]))
    }

    constructor(matrix: MatrixType<T> = []) {
        this.#matrix = matrix
    }

    addItem(item: MatrixItemType<T>, index?: number) {
        if (!index) {
            if (this.#matrix.length < 1) index = 0
            else index = this.#matrix.length - 1
        } else {
            if (index < 0 && this.#matrix.length - index > -1)
                index = this.#matrix.length - 1
            else throw new Error("can't add an item in a negative index")
        }

        this.#matrix.splice(index, 0, item)
    }

    removeItem(index?: number) {
        if (!index) {
            if (this.#matrix.length < 1) index = 0
            else index = this.#matrix.length - 1
        } else {
            if (index < 0 && this.#matrix.length - index > -1)
                index = this.#matrix.length - 1
            else throw new Error("can't remove an item in a negative index")
        }

        this.#matrix.splice(index, 0)
    }

    selectItem(index: number) {
        return this.#matrix.at(index)
    }

    findItem(callback: MatrixFindItemCallback<T>) {
        let i = 0

        for (const item of this.#matrix) {
            if (callback(item, i)) {
                return item
            }

            i++
        }
    }

    filterItem(callback: MatrixFindItemCallback<T>) {
        let i = 0
        const items: MatrixType<T> = []

        for (const item of this.#matrix) {
            if (callback(item, i)) {
                items.push(item)
            }

            i++
        }

        return items
    }

    hasItem(item: MatrixItemType<T>) {
        return this.#matrix.some(e => item.every((v, i) => v === e[i]))
    }

    get getMatrix() {
        return this.#matrix
    }
}

type AA = [number, string]

const a = new Matrix<AA>([
    [0, '0'],
    [2, '2'],
    [3, '3'],
    [4, '4']
])
const aa = a.getMatrix

for (const item of aa) {
}

console.log(Matrix.compareItems([2], [2]))
