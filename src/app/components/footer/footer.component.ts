import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';
import { DataService } from '../../services/data.service';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  utils = inject(UtilsService);
  private data = inject(DataService);
  contact: any = {};
  currentYear = new Date().getFullYear();

  ngOnInit(): void {
    this.data.getObject<any>('contact').subscribe((c) => (this.contact = c || {}));
  }
}
