var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));
app.use('/client', express.static(__dirname + '/client'));

serv.listen(8080);
console.log('Shooter Server Started.');

var io = require('socket.io')(serv, {});
io.sockets.on('connection', (socket) => {
    console.log('Shooter Socket Connection.');

    socket.on('greet', (data) => {
        console.log(data.message);
        console.log('Why so ' + data.mood + '?');
    });

    socket.emit('respond', {
        message: 'Hello Planet Pluto.',
        mood: 'powerful'
    });
})