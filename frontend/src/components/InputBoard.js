import React from "react"
import Node from "../backend/node"
import Worker from "./calcWorker.worker"
import Loader from 'react-loader-spinner'

class InputBoard extends React.Component {
    constructor(props){
        super(props)
        this.state = { currentLayout: [[1, 2, 3], [4, 5, 6], [7, 8, 'O']], isEmptySelected: false, emptyCoordinates: {i: 2, j: 2}, result: "", timeElapsed: 0, calculatingResult: false, currentIndex: 0 }
    }

    componentDidMount() {
        this.worker = new Worker()
        this.worker.addEventListener("message", e => {
            let { result, timeElapsed } = e.data
            this.setState({ result, timeElapsed })
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
                                        return <div onClick={() => {this.onSelect(rowIndex, elementIndex)}} style={{...style.element, backgroundColor: element % 2 === 0 ? '#39ff14' : '#ff073a'}}>{element}</div>
                                    })
                                }
                            </div>
                        })
                    }
                </div>
                <div style={style.center}>
                    {
                        this.state.calculatingResult && <Loader type="Triangle" color="#ffffff" height={76} width={80} />
                    }
                </div>
                <div style={style.textContainer}>
                    {
                        this.state.result !== "" && !this.state.calculatingResult && <div>
                            <span style={{color: '#2b0000'}}>{this.state.result.substr(0, this.state.currentIndex)}</span>
                            <span style={{color: '#39ff14'}}>{this.state.result[this.state.currentIndex]}</span>
                            <span>{this.state.result.substr(this.state.currentIndex + 1)}</span>
                        </div>
                    }
                </div>
                <div style={style.textContainer}>
                    {
                        this.state.timeElapsed !== 0 && !this.state.calculatingResult && this.state.timeElapsed + "ms"
                    }
                </div>
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
            let currentDir = this.convertToDir(emptyCoordinates, {i: rowIndex, j: elementIndex})
            if(currentDir === this.state.result[this.state.currentIndex]) {
                this.setState({currentIndex: this.state.currentIndex + 1})
            }
            else if(this.state.currentIndex > 0 && currentDir === this.getNegativeOfDir(this.state.result[this.state.currentIndex - 1])){
                this.setState({currentIndex: this.state.currentIndex - 1})
            }
            else {
                this.calculateResult(newLayout)
            }
            this.setState({currentLayout: newLayout, emptyCoordinates: {i: rowIndex, j: elementIndex}})
        }
    }

    calculateResult = (layout) => {
        this.setState({calculatingResult: true})
        this.worker.terminate()
        this.worker = new Worker()
        this.worker.addEventListener("message", e => {
            let { result, timeElapsed } = e.data
            this.setState({ result, timeElapsed })
            this.setState({calculatingResult: false, currentIndex: 0})
        })
        this.worker.postMessage(layout)
    }

    convertToDir = (emptyCoordinates, elementCoordinates) => {
        let isT = emptyCoordinates.j === elementCoordinates.j && elementCoordinates.i + 1 === emptyCoordinates.i
        let isB = emptyCoordinates.j === elementCoordinates.j && elementCoordinates.i - 1 === emptyCoordinates.i
        let isR = emptyCoordinates.i === elementCoordinates.i && elementCoordinates.j - 1 === emptyCoordinates.j
        let isL = emptyCoordinates.i === elementCoordinates.i && elementCoordinates.j + 1 === emptyCoordinates.j

        if(isT) return "T";
        if(isB) return "B";
        if(isR) return "R";
        if(isL) return "L";
        throw new Error("This move is not allowed.")
    }

    getNegativeOfDir = (dir) => {
        if(dir === "T") return "B"
        if(dir === "L") return "R"
        if(dir === "R") return "L"
        if(dir === "B") return "T"
        throw new Error("Unknown dir: ", dir)
    }
}

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    element: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px',
        height: '50px',
        padding: '5px',
        fontSize: '30px',
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
        textAlign: "center",
        color: "white",
        fontSize: "30px"
    },
    center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
    }
}

export default InputBoard