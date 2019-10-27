import React from "react"
import Node from "../backend/node"
import Worker from "./calcWorker.worker"
import Loader from 'react-loader-spinner'

class InputBoard extends React.Component {
    constructor(props){
        super(props)
        this.state = { currentLayout: [[1, 2, 3], [4, 5, 6], [7, 8, 'O']], isEmptySelected: false, emptyCoordinates: {i: 2, j: 2}, result: "", timeElapsed: 0, calculatingResult: false }
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
                        this.state.result !== "" && !this.state.calculatingResult && this.state.result
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
            this.calculateResult(newLayout)
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
            this.setState({calculatingResult: false})
        })
        this.worker.postMessage(layout)
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