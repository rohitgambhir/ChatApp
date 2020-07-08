 const path = require('path')
 const http = require('http')
const express = require('express');
const socketio = require('socket.io') ;
const Filter = require('bad-words');
// this create instance of websocket to work with our server , it gives us a function back , to work in this server , we need to call it .
const app = express();
// create http ,http library and method available on it , led us create a server , though express do it underhood.
const server = http.createServer(app);
// this is the function we acquire , we will pass it the server , so refracting will be done , when express creates it underhood we don't have access to server.
const io = socketio(server);

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname ,'../public');

app.use(express.static(publicDirectoryPath));

let msg ="Welcome";
io.on('connection' , (socket)=>{
    console.log('New WebSocket Connection')
    // server is emitting to particular client , the message of welcome , 
    // to send to every other client use io.emit
    // socket.emit('message' , msg)
    socket.emit('message' , msg);
    socket.broadcast.emit('message' , 'A new user has joined Cules');
     socket.on('sendMessage' , (txt , callback)=> {
        //   console.log(txt);
        //  let's have bad words thing 
            const filter = new Filter();
            if(filter.isProfane(txt)){
                 return callback('Profanity is not allowed!');
            }


          io.emit('message' , txt);
          callback(' Delivered!!');  // we have set acknowledgemnt to be sent to the one who is emitting , it process the data , then call that function . 
     })
    //  emitted by chat.js for sharing it's all cordinates.
     socket.on('sendLocation' , (obj , callback)=>{
            //  io.emit('location' , obj); one way is this ,
            // io.emit('rohit' , `Location: ${obj.lat} , ${obj.long}`);
            //  to send map as well , use https://google.com/maps?q=0,0 
            // q means lat = 0 , long = 0;
            // io.emit('message' , `https://google.com/maps?q=${obj.lat},${obj.long}`);
            // callback();
            //  we are going to emit different event as different params , for ourself
            io.emit('locationMessage' , `https://google.com/maps?q=${obj.lat},${obj.long}`);
            callback();
     })

})
// server side se connection setup krdiya , lekin client side se krna pdega toh , index.html mh jakr , socket.io/socket.io.js file ko add krdiya , aur phir apna , js folder mh chat.js bnakr , usme io functionality aagyi merepaas. toh call krdiya io() ko , 


// instead of app , we should use server.
server.listen(port , ()=>{
    console.log(`Server is up on port ${port}!`)
})