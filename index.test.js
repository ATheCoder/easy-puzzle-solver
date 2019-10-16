const expand = require('./expand')
test("Should Expand", () => {
    let exampleState = [[1, 5, 7], [2, 'O', 6], [3, 4, 8]]
    let exampleStateT = [[1, 'O', 7], [2, 5, 6], [3, 4, 8]]

    let current = {
        state: exampleState
    }
    let expectedResult = {
        state: exampleState,
        T: {
            state: exampleStateT,
            parentDirection: 'T',
            parent: 
        }
    }
    expand(current)
    expect(current).toStrictEqual(expectedResult)
})