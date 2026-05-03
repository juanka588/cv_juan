import { Component, inject, OnInit, OnDestroy, ElementRef, ViewChildren, QueryList, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ScrollRevealDirective, StaggerRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective, StaggerRevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  private data = inject(DataService);
  private sanitizer = inject(DomSanitizer);
  utils = inject(UtilsService);

  projects: any[] = [];
  colors = ['blue', 'teal', 'indigo', 'deep-purple', 'cyan', 'blue-grey'];
  selectedProject: any = {};
  modalOpen = false;
  currentYear = '';
  showYearPill = false;
  private yearHideTimeout: any;

  @ViewChildren('yearMarker') yearMarkers!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.data.getList<any>('projects', 'time').subscribe((d) => (this.projects = d));
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    clearTimeout(this.yearHideTimeout);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateYearPill();
  }

  private updateYearPill(): void {
    if (!this.yearMarkers || this.yearMarkers.length === 0) return;

    const viewportTop = window.scrollY + 120;
    let visibleYear = '';

    this.yearMarkers.forEach((marker) => {
      const el = marker.nativeElement;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= viewportTop + 200) {
        visibleYear = el.dataset['year'] || '';
      }
    });

    if (visibleYear && visibleYear !== this.currentYear) {
      this.currentYear = visibleYear;
      this.showYearPill = true;
      clearTimeout(this.yearHideTimeout);
      this.yearHideTimeout = setTimeout(() => (this.showYearPill = false), 1500);
    }
  }

  getYear(timestamp: number): number {
    return new Date(timestamp * 1000).getFullYear();
  }

  isFirstOfYear(idx: number): boolean {
    if (idx === 0) return true;
    return this.getYear(this.projects[idx].time) !== this.getYear(this.projects[idx - 1].time);
  }

  getThumbnail(project: any): string {
    return `images/projects/${project.$key}.png`;
  }

  splitTech(tech: string): string[] {
    return tech ? tech.split(',').map((t: string) => t.trim()) : [];
  }

  openModal(p: any): void {
    this.selectedProject = { ...p };
    if (p.embeddable && p.link) {
      this.selectedProject.trustedLink = this.sanitizer.bypassSecurityTrustResourceUrl(p.link);
    }
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  getColor(idx: number): string {
    return this.colors[idx % this.colors.length];
  }
}
