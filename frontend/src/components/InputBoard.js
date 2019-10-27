import React from "react"
import Node from "../backend/node"
import calcWorker from "./calcWorker"
import WebWorker from "./workerSetup"

class InputBoard extends React.Component {
    constructor(props){
        super(props)
        this.state = { currentLayout: [[1, 2, 3], [4, 5, 6], [7, 8, 'O']], isEmptySelected: false, emptyCoordinates: {i: 2, j: 2}, result: "" }
    }

    componentDidMount() {
        this.worker = new WebWorker(calcWorker)
        this.worker.addEventListener("message", e => {
            console.log("Got your message, worker!")
            console.log(e.data)
        })
    }

    render() {
        return (
            <div>
                <div style = {style.container}>
                    {
                        this.state.currentLayout.map((row, rowIndex) => {
                            return <div style={style.row}>
                                {
                                    row.map((element, elementIndex) => {
                                        let emptyBoxStyle = this.state.isEmptySelected ? {...style.element, ...style.selectedEmpty} : {...style.element}
                                        if(element === 'O') return <div style={emptyBoxStyle} />
                                        return <div onClick={() => {this.onSelect(rowIndex, elementIndex)}} style={{...style.element, backgroundColor: element % 2 === 0 ? 'grey' : 'red'}}>{element}</div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <div style={style.textContainer}>
                    {
                        this.state.result !== "" && "Result: " + this.state.result
                    }
                </div>
                <button onClick={this.calculateResult}>
                    Calculate Result
                </button>
            </div>
        )
    }

    onSelectEmpty = (i, j) => {
        this.setState({isEmptySelected: !this.state.isEmptySelected, emptyCoordinates: {i, j}})
    }

    onSelect = (rowIndex, elementIndex) => {
        let emptyCoordinates = this.state.emptyCoordinates
        let canExchange = ((emptyCoordinates.i + 1 === rowIndex || emptyCoordinates.i - 1 === rowIndex)  && emptyCoordinates.j === elementIndex) ||
                            ((emptyCoordinates.j + 1 === elementIndex || emptyCoordinates.j - 1 === elementIndex) && emptyCoordinates.i === rowIndex)
        if(canExchange){
            let newLayout = this.state.currentLayout
            newLayout[emptyCoordinates.i][emptyCoordinates.j] = newLayout[rowIndex][elementIndex]
            newLayout[rowIndex][elementIndex] = 'O'
            this.setState({currentLayout: newLayout, emptyCoordinates: {i: rowIndex, j: elementIndex}})
        }
    }

    calculateResult = () => {
        console.log("hi ", this.worker)
        this.worker.postMessage(this.state.currentLayout)
        // let result = await calculateTree(new Node(this.state.currentLayout))
        // this.setState({result})
    }
}

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    element: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20px',
        height: '20px',
        padding: '5px',
        textAlign: 'center',
        color: 'white'
    },
    selectedEmpty: {
        border: 'solid',
        borderColor: 'red',
        paddingRight: 0,
        paddingBottom: 0,
        borderRadius: "3px"
    },
    textContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    }
}

export default InputBoard