const traverseTree = require('../backend/traverseTree')
const Node = require("../backend/node")

// Respond to message from parent thread
self.addEventListener('message', (event) => {
    console.log("Worker Started!")
    let beginTime = Date.now();
    let result = traverseTree(new Node(event.data))
    let endTime = Date.now()
    self.postMessage({result, timeElapsed: endTime - beginTime})
})