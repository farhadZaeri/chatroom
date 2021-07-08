const joinRoom = (roomName)=>{
    nsSocket.off('roomInfo');
    nsSocket.off('userOnline')
    nsSocket.off('userInfo')

  nsSocket.emit('roomName',roomName)
  nsSocket.on('roomInfo',roomInfo=>{
      $('.roomName').html(roomInfo.title)
      $('.chatBox').html('')
      roomInfo.history.forEach(userInfo=>{
        $('.chatBox').append(`
        <div class="messageBox">
        <img src=${userInfo.avatar}>
        <p class="font-weight-bold userName">${userInfo.username}</p>
        <p>I${userInfo.text}</p>
        <span class="time">${userInfo.time}</span>
    </div>
        `)
      })
  })
  nsSocket.on('userOnline',userCount=>{
      $('.onlineCount').html(userCount)
  })

  nsSocket.on('userInfo',userInfo=>{
      //$('.chatBox').html('')
      $('.chatBox').append(`
      <div class="messageBox">
      <img src=${userInfo.avatar}>
      <p class="font-weight-bold userName">${userInfo.username}</p>
      <p>I${userInfo.text}</p>
      <span class="time">${userInfo.time}</span>
  </div>
      `)
      
  })

}

$('.sendMsg').click(()=>{
    let message=  $('.msgBox').val()
    nsSocket.emit('message',message)
    $('.msgBox').val('')
})



