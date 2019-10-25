const Node = require("./node")
const traverseTree = require('./traverseTree')
test("Find Path", () => {
    let beginning = new Node([[1, 2, 3], [4, 5, 6], [7, 'O', 8]])
    let result = traverseTree(beginning)
    expect(result).toBe("R")
})

test("A bit harder", () => {
    let beginning = new Node([[1, 8, 2], ['O', 4, 3], [7, 6, 5]])
    let result = traverseTree(beginning)
    expect(result).toBe("RTRBBLTRB")
})