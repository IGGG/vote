$(function() {
    var socket = io.connect('/vote');

    $('#up-button').click(function() {
        socket.emit('vote', '+1');
    });

    $('#down-button').click(function() {
        socket.emit('vote', '-1');
    });
});
