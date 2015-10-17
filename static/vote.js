$(function() {
    var socket = io.connect('/vote'),
        $up_button = $('#up-button'),
        $down_button = $('#down-button');

    $up_button.on('touchstart' , function() {
        $up_button.addClass('fa-thumbs-up');
        $up_button.removeClass('fa-thumbs-o-up');
        socket.emit('vote', '+1');
    });

    $up_button.on('touchend', function() {
        $up_button.addClass('fa-thumbs-o-up');
        $up_button.removeClass('fa-thumbs-up');
    });

    $down_button.on('touchstart', function() {
        $down_button.addClass('fa-thumbs-down');
        $down_button.removeClass('fa-thumbs-o-down');
        socket.emit('vote', '-1');
    });

    $down_button.on('touchend', function() {
        $down_button.addClass('fa-thumbs-o-down');
        $down_button.removeClass('fa-thumbs-down');
    });
});
