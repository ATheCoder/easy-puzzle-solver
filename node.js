module.exports = class Node {
    constructor(data) {
        if(!data.length || !data.every((row) => {
            return row.length
        })){
            throw new Error("Invalid node data")
        }
        
        this.data = data
        this['T'] = null
        this['B'] = null
        this['R'] = null
        this['L'] = null
    }

}