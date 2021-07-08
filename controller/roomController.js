class roomController {
    constructor(name,title){
        this.name = name,
        this.title = title,
        this.history = []
    }
    addMessage(msg){
        this.history.push(msg)
    }
}

module.exports = roomController;