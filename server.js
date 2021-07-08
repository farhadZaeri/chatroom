const https = require('https');
const fs = require('fs');
const express = require('express');
const socketIo  =require('socket.io');
require('dotenv').config();
const structure = require('./structure')



const app = express();

app.use(express.static('public'))
//generate certificate 
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };



const server = https.createServer(options,app);

const io = socketIo(server,{
    cors:{
        origin: '*'
    }
})

io.on('connection',socket=>{
   let nsData = structure.map(namespaces=>{
    
       return{
          endpoint: namespaces.endpoint,
          title: namespaces.title
       } 
        
    })
        socket.emit('namespaces',nsData)
})
///////////////////////
//////////////////////////////////
structure.forEach(namespaces=>{

    io.of(namespaces.endpoint).on('connection',nsSocket=>{

        nsSocket.emit('roomLoad',namespaces.rooms)
        nsSocket.on('roomName',roomName=>{
            let lastRoomName =Array.from(nsSocket.rooms)[1]
            nsSocket.leave(lastRoomName);
            numberUserOnline(namespaces.endpoint,lastRoomName)


            nsSocket.join(roomName)
            //console.log(io.of(namespaces.endpoint).in(roomName).allSockets());
            numberUserOnline(namespaces.endpoint,roomName)

            let roomInfo = namespaces.rooms.find(rooms=>{return rooms.name === roomName})
            nsSocket.emit("roomInfo" , roomInfo)
        })
        const {username}= nsSocket.handshake.query
        //console.log(username);
        nsSocket.on('message',message=>{
            let userInfo = {
                avatar: 'avatar.png',
                username,
                text: message,
                time: new Date().toLocaleString()
            }
            let roomName =Array.from(nsSocket.rooms)[1]
            let room = namespaces.rooms.find(rooms=>{return rooms.name===roomName})
            room.addMessage(userInfo)

            io.of(namespaces.endpoint).in(roomName).emit('userInfo',userInfo)
        })

        nsSocket.on('disconnection',()=>{
            let lastRoomName =Array.from(nsSocket.rooms)[1]
            nsSocket.leave(lastRoomName);
            numberUserOnline(namespaces.endpoint,lastRoomName)
        })
    })
})


const numberUserOnline =async (endpoint,roomName)=>{
   let userOnline =await io.of(endpoint).in(roomName).allSockets();
   io.of(endpoint).in(roomName).emit('userOnline',Array.from(userOnline).length)
   //console.log(Array.from(userOnline).length);
}








server.listen(process.env.PORT,()=>{
    console.log(`server is running in port ${process.env.PORT}`);
});