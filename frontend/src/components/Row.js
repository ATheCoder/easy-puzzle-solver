import React from "react"

class Row extends React.Component {
    render() {
        let color = {first: this.props.reverseColor ? 'red' : 'grey', second: this.props.reverseColor ? 'grey' : 'red'}
        return (
            <div style={style.container}>
                {
                    this.props.elements.map((element, index) => {
                        if(element === 'O') return <div key={index} style={{...style.element}}>&nbsp;</div>
                        return <div key={index} style={{...style.element, backgroundColor: index % 2 === 0 ? color.first : color.second}}>{element}</div>
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
        width: "20px",
        heigth: "20px",
        borderWidth: "2px",
        textAlign: 'center',
    }
}

export default Row