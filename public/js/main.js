//'use strict';

$(function () {
    console.log("ready!");

    var socket = io()
        , MAX_DATA_POINTS = 100
        , data = []
        , dataIndex = {} // currencyPair2dataIndex
        ;

    socket.on('connect', function () {
        console.log('socket.io connected');
    });

    socket.on('candlesticks', onNewCandlesticks);

    var chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: ""
            },
            exportEnabled: true,
            axisY: {
                includeZero: false,
                prefix: "$",
                title: "Prices"
            },
            axisX: {
                interval: 1,
                valueFormatString: "HH:mm:ss"
            },
            toolTip: {
                shared: true
            },
            data: data
        });

    function onNewCandlesticks(candlesticks) {
        _.each(candlesticks, function (candlestick) {
            var index = -1;

            if (!_.isUndefined(dataIndex[candlestick.currencyPair])) {
                index = dataIndex[candlestick.currencyPair];

                console.log('exists');
            }
            else {
                data.push({
                    type: "candlestick",
                    showInLegend: true,
                    name: candlestick.currencyPair,
                    dataPoints: []
                });

                console.log('new');

                dataIndex[candlestick.currencyPair] = index = data.length - 1;
            }

            if (index === -1) {
                return;
            }

            data[index].dataPoints.push({
                x: new Date(candlestick.timestamp * 1000),
                y: [
                    candlestick.open,
                    candlestick.high,
                    candlestick.low,
                    candlestick.close
                ]
            });

            if (data[index].dataPoints.length > MAX_DATA_POINTS) {
                data[index].dataPoints.shift();
            }
        });

        chart.render();
    }

    chart.render();
});
