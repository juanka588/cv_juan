import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { DataService } from '../../services/data.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  utils = inject(UtilsService);
  private data = inject(DataService);
  contact: any = {};

  ngOnInit(): void {
    this.data.getObject<any>('contact').subscribe((c) => (this.contact = c || {}));
  }
}
