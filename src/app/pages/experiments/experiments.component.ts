import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-experiments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './experiments.component.html',
  styleUrl: './experiments.component.scss',
})
export class ExperimentsComponent {
  experiments = [
    { id: 1, name: 'Primes', image: 'images/primes.png' },
    { id: 2, name: 'Chrome API', image: 'images/primes.png' },
  ];
}
