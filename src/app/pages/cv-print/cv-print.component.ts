import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-cv-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-print.component.html',
  styleUrl: './cv-print.component.scss',
})
export class CvPrintComponent implements OnInit {
  private data = inject(DataService);
  utils = inject(UtilsService);
  contact: any = {};
  education: any[] = [];
  languages: any[] = [];
  programming: any[] = [];
  work: any[] = [];
  contests: any[] = [];

  ngOnInit(): void {
    this.data.getObject<any>('contact').subscribe((c) => (this.contact = c || {}));
    this.data.getList<any>('education', 'time').subscribe((d) => (this.education = d));
    this.data.getList<any>('languages').subscribe((d) => (this.languages = d));
    this.data.getList<any>('programming_experience').subscribe((d) => (this.programming = d));
    this.data.getList<any>('work_experience', 'time').subscribe((d) => (this.work = d));
    this.data.getList<any>('contests').subscribe((d) => (this.contests = d));
  }
}
