export default function MyWorker(args) {
    
        this.onmessage = e => {
            console.log("I got it !")
            console.log(e.data)
            let result = calculateTree(new Node(e.data))
            postMessage(result);
        }
    }

