import { Injectable, inject } from '@angular/core';
import { Database, ref, object } from '@angular/fire/database';
import { map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UtilsService {
  private db = inject(Database);
  private strings$: Observable<Record<string, Record<string, string>>>;
  private stringsCache: Record<string, Record<string, string>> = {};
  language = 'en';

  readonly weekdays = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
  ];
  readonly months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  constructor() {
    try {
      const stringsRef = ref(this.db, 'strings');
      this.strings$ = object(stringsRef).pipe(
        map((snap) => (snap.snapshot.val() as Record<string, Record<string, string>>) || {})
      );
      this.strings$.subscribe((val) => (this.stringsCache = val));
    } catch {
      this.strings$ = of({});
    }
  }

  getName(key: string): string {
    if (!this.stringsCache[key]) return 'cargando';
    return this.stringsCache[key][this.language] || key;
  }

  getName$(key: string): Observable<string> {
    return this.strings$.pipe(
      map((strings) => {
        if (!strings[key]) return 'cargando';
        return strings[key][this.language] || key;
      })
    );
  }

  shuffle<T>(array: T[]): T[] {
    const result = [...array];
    let currentIndex = result.length;
    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
    }
    return result;
  }

  nth(d: number): string {
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }

  formatDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    return this.months[date.getMonth()] + ' ' + date.getFullYear();
  }

  timestamp(str: string): number {
    return new Date(str).getTime();
  }

  factorial(n: number): number {
    let number = 1;
    for (let i = 1; i <= n; i++) {
      number = number * i;
    }
    return number;
  }
}
