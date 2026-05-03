import { TestBed } from '@angular/core/testing';
import { UtilsService } from './utils.service';
import { Database } from '@angular/fire/database';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Database, useValue: {} }],
    });
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should default language to en', () => {
    expect(service.language).toBe('en');
  });

  it('should return "cargando" when key not found', () => {
    expect(service.getName('nonexistent')).toBe('cargando');
  });

  describe('nth()', () => {
    it('should return "st" for 1', () => expect(service.nth(1)).toBe('st'));
    it('should return "nd" for 2', () => expect(service.nth(2)).toBe('nd'));
    it('should return "rd" for 3', () => expect(service.nth(3)).toBe('rd'));
    it('should return "th" for 4-9', () => {
      for (let i = 4; i <= 9; i++) expect(service.nth(i)).toBe('th');
    });
  });

  describe('factorial()', () => {
    it('should return 1 for factorial(0)', () => expect(service.factorial(0)).toBe(1));
    it('should return 1 for factorial(1)', () => expect(service.factorial(1)).toBe(1));
    it('should return 120 for factorial(5)', () => expect(service.factorial(5)).toBe(120));
    it('should return 720 for factorial(6)', () => expect(service.factorial(6)).toBe(720));
  });

  describe('timestamp()', () => {
    it('should convert date string to timestamp', () => {
      expect(service.timestamp('2024-01-01')).toBeGreaterThan(0);
    });
  });

  describe('formatDate()', () => {
    it('should format timestamp to month year', () => {
      const ts = new Date('2024-12-15').getTime() / 1000;
      expect(service.formatDate(ts)).toBe('December 2024');
    });
    it('should format January correctly', () => {
      const ts = new Date('2020-01-15').getTime() / 1000;
      expect(service.formatDate(ts)).toBe('January 2020');
    });
  });

  describe('shuffle()', () => {
    it('should return array of same length', () => {
      expect(service.shuffle([1, 2, 3, 4, 5]).length).toBe(5);
    });
    it('should contain same elements', () => {
      const arr = [1, 2, 3, 4, 5];
      const result = service.shuffle(arr);
      arr.forEach((n) => expect(result).toContain(n));
    });
    it('should not mutate original array', () => {
      const arr = [1, 2, 3];
      service.shuffle(arr);
      expect(arr).toEqual([1, 2, 3]);
    });
  });

  describe('months and weekdays', () => {
    it('should have 12 months', () => expect(service.months.length).toBe(12));
    it('should have 7 weekdays', () => expect(service.weekdays.length).toBe(7));
    it('should start months with January', () => expect(service.months[0]).toBe('January'));
    it('should start weekdays with Sunday', () => expect(service.weekdays[0]).toBe('Sunday'));
  });
});
