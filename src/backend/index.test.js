const Node = require('./node')
const { expand, compare, findEmptySquareCoordinates, areArraysEqual, isNodeInArray } = require('./methods')
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

test("Node is in an Array of Nodes", () => {
    let array = [new Node([[1, 2, 3], [4, 5, 6], [7, 8, 'O']]), new Node([[1, 5, 7], [2, 'O', 6], [3, 4, 8]])]
    let node = new Node([[1, 2, 3], [4, 5, 6], [7, 8, 'O']])
    expect(isNodeInArray(array, node)).toBe(true)
    expect(isNodeInArray(array, new Node([[1, 'O', 7], [2, 5, 6], [3, 4, 8]]))).toBe(false)
})

describe("Expand Function", () => {
    let exampleState = new Node([[1, 5, 7], [2, 'O', 6], [3, 4, 8]])
    test("Should expand to top", () => {
        let exampleStateT = new Node([[1, 'O', 7], [2, 5, 6], [3, 4, 8]])
        expand(exampleState)
        expect(compare(exampleState["T"], exampleStateT)).toBe(true)
    })
    test("Should expand to bottom", () => {
        let exampleStateB = new Node([[1, 5, 7], [2, 4, 6], [3, 'O', 8]])
        expect(compare(exampleState["B"], exampleStateB)).toBe(true)
    })
    test("Should expand to left", () => {
        let exampleStateL = new Node([[1, 5, 7], ['O', 2, 6], [3, 4, 8]])
        expect(compare(exampleState["L"], exampleStateL)).toBe(true)
    })
    test("Should expand to right", () => {
        let exampleStateR = new Node([[1, 5, 7], [2, 6, 'O'], [3, 4, 8]])
        expect(compare(exampleState["R"], exampleStateR)).toBe(true)
    })
})

describe("Edge Cases", () => {
    test("edge case right", () => {
        exampleNode = new Node([[1, 5, 7], [2, 6, 'O'], [3, 4, 8]])
        expand(exampleNode)
        expect(compare(exampleNode.R, null)).toBe(true)
    })
    test("edge case left", () => {
        exampleNode = new Node([[1, 5, 7], ['O', 6, 2], [3, 4, 8]])
        expand(exampleNode)
        expect(compare(exampleNode.L, null)).toBe(true)
    })
    test("edge case top", () => {
        exampleNode = new Node([[1, 'O', 7], [5, 6, 2], [3, 4, 8]])
        expand(exampleNode)
        expect(compare(exampleNode.T, null)).toBe(true)
    })
    test("edge case bottom", () => {
        exampleNode = new Node([[1, 4, 7], [5, 6, 2], [3, 'O', 8]])
        expand(exampleNode)
        expect(compare(exampleNode.B, null)).toBe(true)
    })
})