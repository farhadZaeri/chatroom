class nsController {
    constructor(endpoint,title){
        this.endpoint = endpoint,
        this.title = title,
        this.rooms = []
    }
    addRoom(room){
        this.rooms.push(room)
    }
}

module.exports = nsController;