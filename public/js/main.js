//'use strict';

$(function () {
    console.log("ready!");

    var socket = io();

    socket.on('connect', function () {
        console.log('socket.io connected');
    });

    socket.on('candlesticks', function (candlesticks) {
        console.log('candlesticks', candlesticks);
    });

    var chart = new CanvasJS.Chart("chartContainer",
        {
            title: {
                text: "Candlesticks"
            },
            exportEnabled: true,
            axisY: {
                includeZero: false,
                prefix: "$",
                title: "Prices",
            },
            axisX: {
                interval: 1,
                valueFormatString: "MMM-DD"
            },
            toolTip: {
                shared: true
            },
            data: [
                {
                    type: "candlestick",
                    showInLegend: true,
                    name: "Ericsson Stock Price",
                    dataPoints: [   // Y: [Open, High ,Low, Close]
                        {x: new Date(2013, 06, 31), y: [11.79, 11.83, 11.68, 11.73]},
                        {x: new Date(2013, 06, 30), y: [11.90, 11.91, 11.77, 11.84]},
                        {x: new Date(2013, 06, 29), y: [11.87, 11.89, 11.77, 11.78]},
                        {x: new Date(2013, 06, 26), y: [11.85, 11.87, 11.79, 11.81]},
                        {x: new Date(2013, 06, 25), y: [11.65, 11.84, 11.63, 11.82]},
                        {x: new Date(2013, 06, 24), y: [11.72, 11.75, 11.60, 11.68]},
                        {x: new Date(2013, 06, 23), y: [11.59, 11.70, 11.58, 11.66]},
                        {x: new Date(2013, 06, 22), y: [11.51, 11.65, 11.50, 11.63]},
                        {x: new Date(2013, 06, 19), y: [11.48, 11.67, 11.47, 11.57]},
                        {x: new Date(2013, 06, 18), y: [11.68, 11.71, 11.38, 11.60]},
                        {x: new Date(2013, 06, 17), y: [12.24, 12.25, 12.06, 12.18]},
                        {x: new Date(2013, 06, 16), y: [12.29, 12.32, 12.20, 12.26]},
                        {x: new Date(2013, 06, 15), y: [12.16, 12.26, 12.09, 12.25]},
                        {x: new Date(2013, 06, 12), y: [12.03, 12.12, 11.99, 12.07]},
                        {x: new Date(2013, 06, 11), y: [11.92, 11.98, 11.85, 11.98]},
                        {x: new Date(2013, 06, 10), y: [11.66, 11.73, 11.61, 11.71]},
                        {x: new Date(2013, 06, 09), y: [11.54, 11.57, 11.44, 11.5]},
                        {x: new Date(2013, 06, 08), y: [11.53, 11.56, 11.45, 11.4]},
                        {x: new Date(2013, 06, 05), y: [11.40, 11.46, 11.26, 11.3]},
                        {x: new Date(2013, 06, 03), y: [11.31, 11.50, 11.30, 11.4]},
                        {x: new Date(2013, 06, 02), y: [11.31, 11.44, 11.28, 11.3]},
                        {x: new Date(2013, 06, 01), y: [11.43, 11.47, 11.31, 11.3]}
                    ]
                },
                {
                    type: "candlestick",
                    showInLegend: true,
                    name: "Dell Stock Price",
                    dataPoints: [   // Y: [Open, High ,Low, Close]
                        {x: new Date(2013, 06, 31), y: [12.66, 12.98, 12.28, 12.66]},
                        {x: new Date(2013, 06, 30), y: [12.89, 12.92, 12.82, 12.86]},
                        {x: new Date(2013, 06, 29), y: [12.90, 12.95, 12.71, 12.87]},
                        {x: new Date(2013, 06, 26), y: [12.95, 12.97, 12.90, 12.94]},
                        {x: new Date(2013, 06, 25), y: [12.85, 12.99, 12.84, 12.98]},
                        {x: new Date(2013, 06, 24), y: [12.83, 13.25, 12.66, 12.92]},
                        {x: new Date(2013, 06, 23), y: [13.04, 13.05, 12.85, 12.88]},
                        {x: new Date(2013, 06, 22), y: [12.97, 13.12, 12.95, 13.02]},
                        {x: new Date(2013, 06, 19), y: [13.16, 13.17, 12.98, 13.14]},
                        {x: new Date(2013, 06, 18), y: [13.12, 13.22, 13.07, 13.12]},
                        {x: new Date(2013, 06, 17), y: [12.80, 12.99, 12.75, 12.88]},
                        {x: new Date(2013, 06, 16), y: [13.19, 13.19, 12.92, 13.02]},
                        {x: new Date(2013, 06, 15), y: [13.29, 13.30, 13.14, 13.15]},
                        {x: new Date(2013, 06, 12), y: [13.37, 13.39, 13.28, 13.32]},
                        {x: new Date(2013, 06, 11), y: [13.36, 13.46, 13.34, 13.34]},
                        {x: new Date(2013, 06, 10), y: [13.40, 13.40, 13.33, 13.33]},
                        {x: new Date(2013, 06, 09), y: [13.43, 13.48, 13.36, 13.36]},
                        {x: new Date(2013, 06, 08), y: [13.36, 13.44, 13.28, 13.44]},
                        {x: new Date(2013, 06, 05), y: [13.25, 13.25, 12.70, 13.03]},
                        {x: new Date(2013, 06, 03), y: [13.31, 13.37, 13.29, 13.31]},
                        {x: new Date(2013, 06, 02), y: [13.32, 13.39, 13.31, 13.38]},
                        {x: new Date(2013, 06, 01), y: [13.37, 13.39, 13.30, 13.31]}
                    ]
                }
            ]
        });
    chart.render();
});
