import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit {
  private data = inject(DataService);
  utils = inject(UtilsService);
  outcome: any[] = [];
  income: any[] = [];
  activeSection: 'outcome' | 'income' | null = null;

  ngOnInit(): void {
    this.data.getFilteredList<any>('accounts', 'type', 'outcome').subscribe((d) => (this.outcome = d));
    this.data.getFilteredList<any>('accounts', 'type', 'income').subscribe((d) => (this.income = d));
  }

  addItem(type: 'outcome' | 'income'): void {
    const amount = Math.random() * 100;
    const timestamp = Math.floor(Date.now() / 1000);
    this.data.addItem('accounts', {
      x: timestamp * 1000, y: amount, category: 'business',
      amount, time: timestamp, type,
    });
  }

  deleteItem(item: any): void {
    if (item.$key) this.data.removeItem('accounts', item.$key);
  }

  formatDate(timestamp: number): string {
    return this.utils.formatDate(timestamp);
  }

  toggle(section: 'outcome' | 'income'): void {
    this.activeSection = this.activeSection === section ? null : section;
  }
}
