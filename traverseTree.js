const { expand, compare } = require('./methods')
const Node = require('./node')
module.exports = (element) => {
    let goal = new Node([[1, 2, 3], [4, 5, 6], [7, 8, 'O']])
    let frontier = [element]
    let alreadyVisited = []
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
        alreadyVisited.push(leafNode)
        frontier.push(leafNode.T)
        frontier.push(leafNode.B)
        frontier.push(leafNode.R)
        frontier.push(leafNode.L)
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
    return result
}