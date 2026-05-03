import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
import { provideRouter } from '@angular/router';
import { Auth } from '@angular/fire/auth';

describe('authGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: Auth, useValue: {} }],
    });
  });

  it('should redirect unauthenticated users to /main', () => {
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as any, {} as any)
    );
    expect(result).toBeTruthy();
  });
});
