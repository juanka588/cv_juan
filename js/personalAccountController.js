angularApp.controller('personalAccountController', function ($firebaseArray,utils) {
    var accountOutRef = firebaseApp.database().ref('accounts').orderByChild('type').startAt("outcome").endAt("outcome");
    var accountInRef = firebaseApp.database().ref('accounts').orderByChild('type').startAt("income").endAt("income");

    this.data = [];
    this.data[0] = $firebaseArray(accountOutRef);
    this.data[1] = $firebaseArray(accountInRef);
    this.initView=function(){
        $('.collapsible').collapsible();
    };

    this.addTemp = function (type) {
        var amount = Math.random() * 100;
        var timestamp = parseInt(new Date().getTime() / 1000);
        this.data[type].$add(
                {
                    x: timestamp * 1000,
                    y: amount,
                    category: "bussiness",
                    amount: amount,
                    time: timestamp,
                    type: type === 0 ? "outcome" : "income"
                }
        );
    };

    this.formatDate = function (timestamp) {
        return utils.formatDate(timestamp);
    };

    this.deleteItem = function (item, type) {
        this.data[type].$remove(item);
    };

    this.series = ['Outcome', 'Income'];
    this.labels = [];
    this.options = {
        pan: {
            enabled: true,
            mode: 'x',
            rangeMin: {
                // Format of min pan range depends on scale type
                x: null,
                y: null
            },
            rangeMax: {
                // Format of max pan range depends on scale type
                x: null,
                y: null
            }
        },
        zoom: {
            enabled: true,
            drag: true,
            mode: 'x',
            rangeMin: {
                // Format of min pan range depends on scale type
                x: null,
                y: null
            },
            rangeMax: {
                // Format of max pan range depends on scale type
                x: null,
                y: null
            }
        },
        scales: {
            xAxes: [{
                    type: 'time',
                    time: {
                        displayFormats: {
                            'millisecond': 'YY-MMM DD HH:mm',
                            'second': 'YY-MMM DD HH:mm',
                            'minute': 'YY-MMM DD HH:mm',
                            'hour': 'YY-MMM DD HH:mm',
                            'day': 'YY-MMM DD HH:mm',
                            'week': 'YY-MMM DD HH:mm',
                            'month': 'YY-MMM DD HH:mm',
                            'quarter': 'YY-MMM DD HH:mm',
                            'year': 'YY-MMM DD HH:mm'
                        }
                    }
                }]
        }
    };
});