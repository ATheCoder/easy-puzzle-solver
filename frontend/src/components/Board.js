import React from "react"
import Row from "./Row"

class Board extends React.Component {
    render() {
        return (
            <div style={style.container}>
                {
                    this.props.layout.map((row, index) => {
                        return <Row key={index} elements={row} reverseColor={index % 2 == 0} />
                    })
                }
            </div>
        )
    }
}

const style = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: "solid",
        maxWidth: "90px",
        borderRadius: "5px",
        color: "white",
        borderColor: "black",
    }
}

export default Board