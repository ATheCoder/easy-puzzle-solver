module.exports = class Node {
    constructor(data, parent, parentDir) {
        if(data === null){
            this.data = null
            return
        }
        if(!data.length || !data.every((row) => {
            return row.length
        })){
            throw new Error("Invalid node data")
        }
        
        this.data = data
        this.parent = parent
        this.parentDir = parentDir
        this['T'] = null
        this['B'] = null
        this['R'] = null
        this['L'] = null
    }

}