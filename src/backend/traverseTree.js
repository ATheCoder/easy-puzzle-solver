const { expand, compare, isNodeInArray } = require('./methods')
const Node = require('./node')
module.exports = (element) => {
    let goal = new Node([[1, 2, 3], [4, 5, 6], [7, 8, 'O']])
    let frontier = [element]
    let alreadyVisitedHashTable = {}
    while(frontier.length > 0){
        let leafNode = frontier[0]
        if(leafNode.data === null){
            frontier.shift()
            continue
        }
        frontier.shift()
        if(compare(leafNode, goal)){
            return getPath(leafNode)
        }
        expand(leafNode)
        alreadyVisitedHashTable[JSON.stringify(leafNode.data)] = true
        if(!alreadyVisitedHashTable[JSON.stringify(leafNode.T.data)]){
            alreadyVisitedHashTable[JSON.stringify(leafNode.T.data)] = true
            frontier.push(leafNode.T)
        }
        if(!alreadyVisitedHashTable[JSON.stringify(leafNode.B.data)]){
            alreadyVisitedHashTable[JSON.stringify(leafNode.B.data)] = true
            frontier.push(leafNode.B)
        }
        if(!alreadyVisitedHashTable[JSON.stringify(leafNode.R.data)]){
            alreadyVisitedHashTable[JSON.stringify(leafNode.R.data)] = true
            frontier.push(leafNode.R)
        }
        if(!alreadyVisitedHashTable[JSON.stringify(leafNode.L.data)]){
            alreadyVisitedHashTable[JSON.stringify(leafNode.L.data)] = true
            frontier.push(leafNode.L)
        }
    }
    return "fail"
}

const getPath = (node) => {
    let currentNode = node
    let result = ""
    while(currentNode){
        if(!currentNode.parentDir){
            break;
        }
        result += currentNode.parentDir
        currentNode = currentNode.parent
    }
    return result.split("").reverse().join("");
}