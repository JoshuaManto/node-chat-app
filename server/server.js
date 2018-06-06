const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;
// old way
// console.log(__dirname + '/../public');
// console.log(publicPath);
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>
{
  console.log('New user connected');

  // emits to single connection
  // socket.emit('newMessage',
  // {
  //   from: "mike",
  //   text: "LADADA random istufs",
  //   createdAt: 123
  //
  // });

  // soecket.emit from Admin text Welcome to the chat app
  socket.emit('newMessage',
  {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });
  // socket.broadcast.emit from Admin text new user joined
  socket.broadcast.emit('newMessage',
  {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) =>
  {
    console.log('createMessage', message);
    // emits to all connections
    // io.emit('newMessage',
    // {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });

    socket.broadcast.emit('newMessage',
    {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', () =>
  {
    console.log('User was disconnected');
  });
});



server.listen(port, () =>
{
  console.log(`Server is up on port ${port}`);
});
