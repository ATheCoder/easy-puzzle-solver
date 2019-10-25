const Node = require("./node")
const traverseTree = require('./traverseTree')
let beginning = new Node([[1, 3, 5], [2, 'O', 7], [4, 8, 6]])
let result = traverseTree(beginning)
console.log("Found result: ", result)



// const crypto = require('crypto')
// console.time('hashingTime')
// let example = [[1, 2, 3], [6, 'O', 4], [7, 5, 8]]
// let hash = JSON.stringify(example)
// console.timeEnd('hashingTime')
// console.log(hash)