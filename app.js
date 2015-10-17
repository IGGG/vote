var io = require('socket.io').listen(process.env.VOTE_PORT || 3000),
    io_namespace = {
        vote: io.of('/vote'),
        bulletin: io.of('/bulletin')
    },
    users = (function() {
        var n_users = 0,
            come = function() {
                n_users += 1;
                io_namespace.bulletin.emit('#user-changed', n_users);
            },
            leave = function() {
                n_users -= 1;
                io_namespace.bulletin.emit('#user-changed', n_users);
            },
            get = function() {
                return n_users;
            };

        return { come: come, leave: leave, get: get };
    })(),
    n_votes = 0;

io_namespace.vote.on('connection', function(socket) {
    users.come();
    socket.on('vote', function(msg) {
        if (msg === '+1') {
            n_votes += 1;
        } else if (msg === '-1') {
            n_votes -= 1;
        }
        io_namespace.bulletin.emit('voted', n_votes);
    });
    socket.on('disconnect', function() {
        users.leave();
    });
});

io_namespace.bulletin.on('connection', function(socket) {
    socket.emit('#user-changed', users.get());
    socket.emit('voted', n_votes);
});
