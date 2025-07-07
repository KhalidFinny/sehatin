import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      id: 1,
      email: 'admin@sehatin.com',
      password: 'admin123',
      name: 'Administrator',
      role: 'admin'
    },
    {
      id: 2,
      email: 'user@sehatin.com',
      password: 'user123',
      name: 'User Test',
      role: 'user'
    }
  ];

  private currentUser: User | null = null;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Cek apakah ada user yang sudah login dari localStorage
    if (isPlatformBrowser(this.platformId)) {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUser = JSON.parse(savedUser);
      }
    }
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return true;
    }
    return false;
  }

  register(email: string, password: string, name: string): boolean {
    // Cek apakah email sudah ada
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return false; // Email sudah terdaftar
    }

    // Buat user baru
    const newUser: User = {
      id: this.users.length + 1,
      email,
      password,
      name,
      role: 'user' // Default role adalah user
    };

    this.users.push(newUser);
    return true;
  }

  logout(): void {
    this.currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
    this.router.navigate(['/masuk']);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  isUser(): boolean {
    return this.currentUser?.role === 'user';
  }
}
