import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ScrollRevealDirective } from '../../directives/scroll-reveal.directive';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  private data = inject(DataService);
  private sanitizer = inject(DomSanitizer);
  utils = inject(UtilsService);

  projects: any[] = [];
  currentIdx = 0;
  colors = ['blue', 'teal', 'indigo', 'deep-purple', 'cyan', 'blue-grey'];
  selectedProject: any = {};
  modalOpen = false;

  ngOnInit(): void {
    this.data.getList<any>('projects', 'time').subscribe((d) => (this.projects = d));
  }

  get currentProject(): any {
    return this.projects[this.currentIdx] || {};
  }

  nextProject(): void {
    if (this.projects.length === 0) return;
    this.currentIdx = (this.currentIdx + 1) % this.projects.length;
  }

  prevProject(): void {
    if (this.projects.length === 0) return;
    this.currentIdx = this.currentIdx <= 0 ? this.projects.length - 1 : this.currentIdx - 1;
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
