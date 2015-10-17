$(function() {
    var $votes = $('#votes'),
        $users = $('#users'),
        socket = io.connect('/bulletin');

    socket.on('#user-changed', function(msg) {
        $users.text(msg);
    });

    socket.on('voted', function(msg) {
        $votes.text(msg);
    });
});
