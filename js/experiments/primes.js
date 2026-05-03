angularApp.controller('primesController', function () {
    this.total = 5000;
    this.primes = calcPrimes(this.total);
    this.prev = this.primes.length - 1;
    this.current = 0;
    this.iterations = 100;
    this.next = 1;
    this.increasing = false;
    this.len = 1;
    this.customNumber = -1;
    this.auto = false;

    this.nextNumber = function () {
        this.prev = this.current;
        this.current++;
        this.next = this.current + 1;
        this.validateRange();
    };
    this.prevNumber = function () {
        this.next = this.current;
        this.current--;
        this.prev = this.current - 1;
        this.validateRange();
    };

    this.validateRange = function () {
        if (this.current < 0) {
            this.current = this.total - 1;
        }
        if (this.prev < 0) {
            this.prev = this.total - 1;
        }
        if (this.next < 0) {
            this.next = this.total - 1;
        }
        this.current = this.current % this.total;
        this.next = this.next % this.total;
        this.prev = this.prev % this.total;
    };

    this.run = function () {
        run(this);
    };
});

function run(controller) {

    new p5(function (s) {
        const primes = controller.primes;
        let maxIter = controller.iterations;
        let counter = 0;
        let iteration = 0;
        let rotation = 1;
        let p = primes[iteration];
        let len = controller.len;
        let movements = [];

        s.setup = function () {
            s.createCanvas(600, 600);
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
            if (controller.increasing) {
                len++;
            } else {
                len = 30;
            }
            movements.push({
                rotation: rotation,
                dist: len
            });
            for (let i = 0; i < movements.length; i++) {
                const m = movements[i];
                s.rotate(s.radians(m.rotation));
                s.line(0, 0, 0, m.dist);
                s.translate(0, m.dist);
            }
            if (counter > maxIter) {
                nextNumber();
            }
            counter++;
            s.pop();
        };

        function nextNumber() {
            maxIter = controller.iterations;
            counter = 0;
            rotation = 1;
            movements = [];
            len = controller.len;
            if (controller.auto) {
                angular.element('#next-prime-btn').triggerHandler('click');
            }
            iteration = controller.current;
            p = primes[iteration];
        }


    }, "sketch-holder");
}


function calcPrimes(size) {
//                0       1      2     3
    const sieve = [false, false, true, true];
    const primes = [];
    for (let i = 0; i < size; i++) {
        if (sieve[i] == null || sieve[i]) {
            let n = 2;
            while (n * i < size) {
                sieve[n * i] = false;
                n++;
            }
            primes.push(i);
        }
    }
    return primes;
}