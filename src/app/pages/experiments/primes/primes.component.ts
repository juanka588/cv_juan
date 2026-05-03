import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

declare var p5: any;

@Component({
  selector: 'app-primes',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './primes.component.html',
  styleUrl: './primes.component.scss',
})
export class PrimesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sketchHolder') sketchHolder!: ElementRef;
  total = 5000;
  primes: number[] = [];
  prev = 0;
  current = 0;
  next = 1;
  iterations = 100;
  increasing = false;
  auto = false;
  customNumber = -1;
  private p5Instance: any;

  ngOnInit(): void {
    this.primes = this.calcPrimes(this.total);
    this.prev = this.primes.length - 1;
  }

  ngAfterViewInit(): void {
    this.loadP5();
  }

  ngOnDestroy(): void {
    if (this.p5Instance) this.p5Instance.remove();
  }

  private loadP5(): void {
    if (typeof p5 !== 'undefined') {
      this.runSketch();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/p5@1.4.2/lib/p5.min.js';
    script.onload = () => this.runSketch();
    document.body.appendChild(script);
  }

  private runSketch(): void {
    const ctrl = this;
    this.p5Instance = new p5((s: any) => {
      const primes = ctrl.primes;
      let maxIter = ctrl.iterations;
      let counter = 0;
      let iteration = 0;
      let rotation = 1;
      let p = primes[iteration];
      let len = 1;
      let movements: any[] = [];

      s.setup = () => { s.createCanvas(600, 600); };
      s.draw = () => {
        if (iteration >= primes.length) return;
        s.push(); s.background(0); s.strokeWeight(2); s.stroke(255);
        s.translate(s.width / 2, s.height / 2);
        rotation = (rotation * p) % 360;
        len = ctrl.increasing ? len + 1 : 30;
        movements.push({ rotation, dist: len });
        for (const m of movements) { s.rotate(s.radians(m.rotation)); s.line(0, 0, 0, m.dist); s.translate(0, m.dist); }
        if (counter > maxIter) { maxIter = ctrl.iterations; counter = 0; rotation = 1; movements = []; len = 1; if (ctrl.auto) ctrl.nextNumber(); iteration = ctrl.current; p = primes[iteration]; }
        counter++; s.pop();
      };
    }, this.sketchHolder.nativeElement);
  }

  nextNumber(): void {
    this.prev = this.current;
    this.current = (this.current + 1) % this.primes.length;
    this.next = (this.current + 1) % this.primes.length;
  }

  prevNumber(): void {
    this.next = this.current;
    this.current = this.current <= 0 ? this.primes.length - 1 : this.current - 1;
    this.prev = this.current <= 0 ? this.primes.length - 1 : this.current - 1;
  }

  private calcPrimes(size: number): number[] {
    const sieve: (boolean | null)[] = [false, false, true, true];
    const primes: number[] = [];
    for (let i = 0; i < size; i++) {
      if (sieve[i] == null || sieve[i]) {
        let n = 2;
        while (n * i < size) { sieve[n * i] = false; n++; }
        primes.push(i);
      }
    }
    return primes;
  }
}
