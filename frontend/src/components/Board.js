import React from "react"
import Row from "./Row"

class Board extends React.Component {
    render() {
        return (
            <div style={style.container}>
                {
                    this.props.layout.map((row) => {
                        return <Row elements={row} />
                    })
                }
            </div>
        )
    }
}

const style = {
    container: {
        border: 'solid',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100px",
        borderRadius: "5px",
        color: "white",
        backgroundColor: "grey",
        borderColor: "black"
    }
}

export default Board