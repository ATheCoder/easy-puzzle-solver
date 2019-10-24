import React from "react"

class Row extends React.Component {
    render() {
        return (
            <div style={style.container}>
                {
                    this.props.elements.map((element, index) => {
                        if(element === 'O') return <div style={style.element}>&nbsp;</div>
                        return <div style={{...style.element, borderRight: index > 1 ? 0 : "2px"}}>{element}</div>
                    })
                }
            </div>
        )
    }
}

const style = {
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    element: {
        padding: "5px",
        width: "8px",
        border: "solid",
        borderWidth: "2px"
    }
}

export default Row