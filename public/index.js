const username = prompt('input your name')
const socket = io('https://127.0.0.1:51111',{
    query:{
        username
    }
});
let nsSocket = null

socket.on('namespaces', nsData=>{
    $('.nsLoad').html('')
    nsData.forEach(namespace=>{
        $('.nsLoad').append(`
        <div class="btnJoin mt-2 joinNameSpace" ns="${namespace.endpoint}">
                    ${namespace.title}
                </div>
        `)
    })
    joinNamespace(nsData[0].endpoint)
})


$(document).on('click','.joinNameSpace',function(){
    joinNamespace($(this).attr('ns'))
})

