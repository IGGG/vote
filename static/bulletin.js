$(function() {
    var n_good = 0,
        n_poor = 0,
        n_users = 0,
        $user = $('#user'),
        $good = $('#good'),
        $poor = $('#poor'),
        $chart = $('#chart'),
        chart = $chart.epoch({
            type: 'pie',
            data: [{ label: 'Good', value: 1 }, { label: 'Poor', value: 1 }],
            inner: $chart.width() / 4
        }),
        socket = io.connect('/bulletin');

    var createChartData = function() {
        return [
            { label: 'Good', value: n_good },
            { label: 'Poor', value: n_poor }
        ];
    };

    var updateChart = function() {
        chart.update(createChartData());
    };


    socket.on('#user-changed', function(msg) {
        n_users = parseInt(msg);
        $user.text(n_users);
    });

    socket.on('good', function(msg) {
        n_good = parseInt(msg);
        $good.text(n_good);
        updateChart();
    });

    socket.on('poor', function(msg) {
        n_poor = parseInt(msg);
        $poor.text(n_poor);
        updateChart();
    });
});
