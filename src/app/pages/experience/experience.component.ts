import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';
import { ScrollRevealDirective, StaggerRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, StaggerRevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements OnInit {
  private data = inject(DataService);
  utils = inject(UtilsService);
  work: any[] = [];

  ngOnInit(): void {
    this.data.getList<any>('work_experience', 'time').subscribe((d) => (this.work = d));
  }

  splitKeywords(keywords: string): string[] {
    return keywords ? keywords.split(',').map((k: string) => k.trim()) : [];
  }
}
