import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { Database } from '@angular/fire/database';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Database, useValue: {} }],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => expect(service).toBeTruthy());
  it('should have getObject method', () => expect(service.getObject).toBeDefined());
  it('should have getList method', () => expect(service.getList).toBeDefined());
  it('should have getFilteredList method', () => expect(service.getFilteredList).toBeDefined());
});
