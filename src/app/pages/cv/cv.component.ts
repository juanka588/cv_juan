import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';
import { ScrollRevealDirective, StaggerRevealDirective } from '../../directives/scroll-reveal.directive';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, RouterLink, ScrollRevealDirective, StaggerRevealDirective],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
})
export class CvComponent implements OnInit {
  private data = inject(DataService);
  private sanitizer = inject(DomSanitizer);
  utils = inject(UtilsService);

  contact: any = {};
  education: any[] = [];
  languages: any[] = [];
  programming: any[] = [];
  network: Record<string, any> = {};
  tools: Record<string, any> = {};
  contests: any[] = [];
  work: any[] = [];
  mainProjects: any[] = [];
  selectedProject: any = {};
  modalOpen = false;

  ngOnInit(): void {
    this.data.getObject<any>('contact').subscribe((c) => (this.contact = c || {}));
    this.data.getList<any>('education', 'time').subscribe((d) => (this.education = d));
    this.data.getList<any>('languages').subscribe((d) => (this.languages = d));
    this.data.getList<any>('programming_experience').subscribe((d) => (this.programming = d));
    this.data.getObject<any>('network_experience').subscribe((d) => (this.network = d || {}));
    this.data.getObject<any>('programming_tools').subscribe((d) => (this.tools = d || {}));
    this.data.getList<any>('contests').subscribe((d) => (this.contests = d));
    this.data.getList<any>('work_experience', 'time').subscribe((d) => (this.work = d));
    this.data.getFilteredList<any>('projects', 'principal', true).subscribe((d) => (this.mainProjects = d));
  }

  objectKeys(obj: any): string[] {
    if (!obj) return [];
    return Object.keys(obj).filter((k) => k !== '$key' && !k.startsWith('$'));
  }

  splitTech(tech: string): string[] {
    return tech ? tech.split(',').map((t: string) => t.trim()) : [];
  }

  openProjectModal(p: any): void {
    this.selectedProject = { ...p };
    if (p.embeddable && p.link) {
      this.selectedProject.trustedLink = this.sanitizer.bypassSecurityTrustResourceUrl(p.link);
    }
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }
}
