import { Injectable, inject, signal, computed } from '@angular/core';
import { Auth, signInWithPopup, signOut, user, User, FacebookAuthProvider } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  private currentUser = signal<User | null>(null);

  readonly firebaseUser = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    try {
      user(this.auth).subscribe((u) => this.currentUser.set(u));
    } catch {
      // No-op in test environment
    }
  }

  async signIn(): Promise<void> {
    try {
      await signInWithPopup(this.auth, new FacebookAuthProvider());
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}
