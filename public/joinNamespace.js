function joinNamespace (endpoint){
   
nsSocket = io(`https://127.0.0.1:51111${endpoint}`,{
    query:{
        username
    }
})
nsSocket.on('connect',()=>{
})
nsSocket.on('roomLoad',roomData=>{
    $('.roomLoadData').html('')
    roomData.forEach(rooms => {
        $('.roomLoadData').append(`
        <div class="btnJoin mt-2 joinRoom" room="${rooms.name}">
                    ${rooms.title}
                </div>
        `) 
    });
    joinRoom(roomData[0].name)
})
   
}

$(document).on('click','.joinRoom', function(){
    joinRoom($(this).attr('room'))
})
//////////////////////////////////////////////////

