import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-chrome',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chrome.component.html',
  styleUrl: './chrome.component.scss',
})
export class ChromeComponent {
  utils = inject(UtilsService);
  colors = ['#f44336', '#ff9800', '#2196f3', '#4caf50', '#673ab7', '#9e9e9e'];
  indices = [0, 1, 2, 3, 4, 5];
  pageElements = ['Navbar', 'Sidenav', 'Main container', 'Line', 'Title', 'Footer'];
  classNames = ['nav-test', 'aside-test', 'main-content-test', 'line-test', 'title-test', 'footer-test'];
  permutationNumber = 1;
  maxPermutations = this.utils.factorial(this.colors.length);

  sendNotification(): void {
    const title = 'CV notif';
    const options = { body: 'theBody', icon: 'images/me.jpg' };
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
      new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((p) => { if (p === 'granted') new Notification(title, options); });
    }
  }

  applyPermutation(): void {
    this.permutationNumber = (this.permutationNumber + 1) % this.maxPermutations;
    this.indices = this.permutate([...this.indices]);
  }

  getColor(idx: number): string {
    return this.colors[this.indices[idx]];
  }

  private permutate(arr: number[]): number[] {
    let x = -1;
    for (let i = 0; i < arr.length - 1; i++) { if (arr[i] < arr[i + 1]) x = i; }
    if (x === -1) return arr.reverse();
    let y = -1;
    for (let i = 0; i < arr.length; i++) { if (arr[x] < arr[i]) y = i; }
    [arr[x], arr[y]] = [arr[y], arr[x]];
    const tail = arr.splice(x + 1).reverse();
    return [...arr, ...tail];
  }
}
