const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 3000;
let loggedUsers=[];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('newMsg', (msg) => {
    console.log(`Emitiendo nuevo mensaje: ${msg.content}`);
    io.emit('newMsg', msg);
  });


  socket.on('connected', (user) => {
    console.log(`User conectado: ${user.telefono}`);
    loggedUsers.push(user.telefono);
    console.log("Connected",loggedUsers);
    io.emit('connectedUsers', loggedUsers);
    
  });

  socket.on('disconnected', (user) => {
    console.log(`User desconectado: ${user.telefono}`);
    let index=loggedUsers.indexOf(user.telefono);
    loggedUsers.splice(index,1);
    console.log("Disconeccted",loggedUsers);
    io.emit('connectedUsers', loggedUsers);
  });

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
