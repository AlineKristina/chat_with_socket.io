const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser({extended: false}));

app.post('/xet', (req, res) => {
  nickname = req.body.nickname;
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/home.html');
})

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', nickname + ': ' + msg);
  });
});

server.listen(3000, () => {
  console.log('Listening on PORT 3000');
});