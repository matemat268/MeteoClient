let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log('uzytkownik polaczony');

  socket.on('nowa-wiadomosc', (message) => {
    console.log(message);
    io.emit('nowa-wiadomosc', message);
  });
});

server.listen(port, () => {
  console.log(`rozpoczeto nasluch na porcie: ${port}`);
});
