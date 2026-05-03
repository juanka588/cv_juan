import { Injectable, inject } from '@angular/core';
import {
  Database,
  ref,
  object,
  list,
  query,
  orderByChild,
  equalTo,
  push,
  remove,
} from '@angular/fire/database';
import { map, Observable, of, EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private db = inject(Database);

  getObject<T>(path: string): Observable<T> {
    try {
      return object(ref(this.db, path)).pipe(
        map((snap) => snap.snapshot.val() as T)
      );
    } catch {
      return of(null as T);
    }
  }

  getList<T>(path: string, orderBy?: string): Observable<T[]> {
    try {
      const dbRef = orderBy
        ? query(ref(this.db, path), orderByChild(orderBy))
        : ref(this.db, path);
      return list(dbRef).pipe(
        map((changes) => changes.map((c) => ({ $key: c.snapshot.key, ...c.snapshot.val() as object }) as T))
      );
    } catch {
      return of([]);
    }
  }

  getFilteredList<T>(path: string, orderBy: string, value: string | boolean): Observable<T[]> {
    try {
      const dbRef = query(ref(this.db, path), orderByChild(orderBy), equalTo(value));
      return list(dbRef).pipe(
        map((changes) => changes.map((c) => ({ $key: c.snapshot.key, ...c.snapshot.val() as object }) as T))
      );
    } catch {
      return of([]);
    }
  }

  addItem(path: string, item: object): Promise<void> {
    const listRef = ref(this.db, path);
    return push(listRef, item).then(() => {});
  }

  removeItem(path: string, key: string): Promise<void> {
    return remove(ref(this.db, `${path}/${key}`));
  }
}
