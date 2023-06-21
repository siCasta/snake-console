type MatrixItemType<T> = [T] extends [unknown[]] ? T : T[]
type MatrixType<T> = MatrixItemType<T>[]

export class Matrix<T> {
    matrix

    constructor(matrix: MatrixType<T> = []) {
        this.matrix = matrix
    }

    hasItem(item: MatrixItemType<T>) {
        return this.matrix.some(e => item.every((v, i) => v === e[i]))
    }
}

export const compareArrays = <T>(
    value: MatrixItemType<T>,
    ...items: MatrixItemType<T>[]
) => items.every(e => value.every((v, i) => v === e[i]))
