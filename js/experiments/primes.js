angularApp.controller('primesController', function () {
    this.total = 5000;
    this.primes = calcPrimes(this.total);
    this.prev = this.primes.length - 1;
    this.current = 0;
    this.next = 1;
    this.run = function () {
        run(this.primes);
    };
});

function run(primes) {

    new p5(function (s) {
        var maxIter = 100;
        var counter = 0;
        var iteration = 0;
        var rotation = 1;
        var p = p = primes[iteration];
        var len = 1;
        var movements = [];

        s.setup = function () {
            s.createCanvas(600, 600);
//            s.frameRate(30);
        };

        s.draw = function () {
            if (iteration >= primes.length) {
                return;
            }
            s.push();
            s.background(0);
            s.strokeWeight(2);
            s.stroke(255);
            s.translate(s.width / 2, s.height / 2);
            rotation = (rotation * p) % 360;
            len++;
            movements.push({
                rotation: rotation,
                dist: len
            });
            for (var i = 0; i < movements.length; i++) {
                var m = movements[i];
                s.rotate(s.radians(m.rotation));
                s.line(0, 0, 0, m.dist);
                s.translate(0, m.dist);
            }
            if (counter > maxIter) {
                counter = 0;
                rotation = 1;
                movements = [];
                len = 1;
                iteration++;
                p = primes[iteration];
            }
            counter++;
            s.pop();
        };


    }, "sketch-holder");
}

function calcPrimes(size) {
//                0       1      2     3
    var sieve = [false, false, true, true];
    var primes = [];
    for (var i = 0; i < size; i++) {
        if (typeof sieve[i] == "undefined" || sieve[i]) {
            var n = 2;
            while (n * i < size) {
                sieve[n * i] = false;
                n++;
            }
            primes.push(i);
        }
    }
    return primes;
}