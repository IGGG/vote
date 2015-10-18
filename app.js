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
    votes = (function() {
        var n_good = 0,
            n_poor = 0,
            good = function() {
                n_good += 1;
                io_namespace.bulletin.emit('good', n_good);
            },
            poor = function() {
                n_poor += 1;
                io_namespace.bulletin.emit('poor', n_poor);
            },
            get = function() {
                return { n_good: n_good, n_poor: n_poor };
            };

        return { good: good, poor: poor, get: get };
    })();

io_namespace.vote.on('connection', function(socket) {
    users.come();
    socket.on('vote', function(msg) {
        if (msg === '+1') {
            votes.good();
        } else if (msg === '-1') {
            votes.poor();
        }
    });
    socket.on('disconnect', function() {
        users.leave();
    });
});

io_namespace.bulletin.on('connection', function(socket) {
    socket.emit('#user-changed', users.get());
    socket.emit('voted', n_votes);
});
