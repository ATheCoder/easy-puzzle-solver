const Node = require('./node')
const expand = (node) => {
    node["T"] = new Node(expandDir('T', node))
    node["B"] = new Node(expandDir('B', node))
    node["L"] = new Node(expandDir('L', node))
    node["R"] = new Node(expandDir('R', node))
}

const expandDir = (direction, node) => {
    let [i, j] = findEmptySquareCoordinates(node)
    let data = cloneArray(node.data)
    switch(direction) {
        case 'T':
            data[i][j] = data[i-1][j]
            data[i-1][j] = 'O'
            return data
        case 'B':
            data[i][j] = data[i+1][j]
            data[i+1][j] = 'O'
            return data
        case 'L':
            data[i][j] = data[i][j-1]
            data[i][j-1] = 'O'
            return data
        case 'R':
            data[i][j] = data[i][j+1]
            data[i][j+1] = 'O'
            return data
        default:
            throw new Error("Invalid direction")
    }
}

const findEmptySquareCoordinates = (node) => {
    let data = node.data
    for(let i = 0;i<data.length;i++) {
        for(let j = 0;j<data.length;j++) {
            if(data[i][j] === 'O'){
                return [i, j]
            }
        }
    }
}

const areArraysEqual = (array1, array2) => {
    return array1.length === array2.length && array1.every((value, index) => {
        return value === array2[index]
    })
}

const compare = (node1, node2) => {
    data1 = node1.data
    data2 = node2.data
    // console.log("data1: ", data1)
    // console.log("data2: ", data2)
    return data1.every((row, index) => {
        return areArraysEqual(row, data2[index])
    })
}

const cloneArray = (array) => {
    return array.map((element) => {
        return element.slice()
    })
}

module.exports = {expand, compare, findEmptySquareCoordinates, areArraysEqual}