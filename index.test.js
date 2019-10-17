const Node = require('./node')
const { expand, compare, findEmptySquareCoordinates, areArraysEqual } = require('./methods')
test("should find empty coordinates", () => {
    let exampleNode = new Node([[1, 2, 3], [4, 5, 6], [7, 8, 'O']])
    const [i, j] = findEmptySquareCoordinates(exampleNode)
    expect(i).toBe(2)
    expect(j).toBe(2)
})

test("Arrays should be equal", () => {
    let exampleArray1 = [1, 2, 'O']
    let exampleArray2 = [1, 2, 'O']
    expect(areArraysEqual(exampleArray1, exampleArray2)).toBe(true)
})

test("Should Expand", () => {
    let exampleState = new Node([[1, 5, 7], [2, 'O', 6], [3, 4, 8]])
    let exampleStateT = new Node([[1, 'O', 7], [2, 5, 6], [3, 4, 8]])
    expand(exampleState)
    expect(compare(exampleState["T"], exampleStateT)).toBe(true)
})
