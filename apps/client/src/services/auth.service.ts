import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, Subject } from "rxjs";

type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
};

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUser: User | null = null;
  private users: User[] = [
    {
      id: 1,
      email: "admin@sehatin.com",
      password: "admin123",
      name: "Administrator",
      role: "admin",
    },
    {
      id: 2,
      email: "user@sehatin.com",
      password: "user123",
      name: "User Test",
      role: "user",
    },
  ];

  public authStateChanged = new Subject<void>();
  public fetchLocalStorage = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) this.currentUser = JSON.parse(savedUser);
    this.fetchLocalStorage.next(true);
  }

  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (!user || user === null) return false;

    this.currentUser = user;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("loginTimestamp", Date.now().toString());
    }

    this.authStateChanged.next();
    return true;
  }

  redirectToDashboard(): void {
    if (!this.currentUser) return;
    const route = this.currentUser.role === "admin" ? "/admin/dasbor" : "/pengguna/dasbor";
    this.router.navigate([route]);
  }

  register(email: string, password: string, name: string): boolean {
    const userExists = this.users.some((u) => u.email === email);
    if (userExists) return false;

    const newUser: User = {
      id: this.users.length + 1,
      email,
      password,
      name,
      role: "user",
    };

    this.users.push(newUser);
    return true;
  }

  logout(): void {
    this.currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("loginTimestamp");
    }
    this.authStateChanged.next();
    this.router.navigate(["/"]);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    if (this.currentUser === null) return false;
    return this.currentUser.role === "admin";
  }

  isUser(): boolean {
    if (this.currentUser === null) return false;
    return this.currentUser.role === "user";
  }
}