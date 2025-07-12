import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { Subject } from "rxjs";

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
}

@Injectable({ providedIn: "root" })
export class AuthService {
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

  private currentUser: User | null = null;
  public authStateChanged = new Subject<void>();

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) return;
    this.currentUser = JSON.parse(savedUser);
  }

  login(email: string, password: string): boolean {
    console.log("Login attempt:", { email, password });

    const user = this.users.find((u) => u.email === email && u.password === password);

    if (!user) {
      console.log("Login failed: user not found");
      return false;
    }

    this.currentUser = user;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    }

    console.log("Login successful, user set:", this.currentUser);
    this.authStateChanged.next();
    return true;
  }

  redirectToDashboard(): void {
    if (!this.currentUser) return;

    const role = this.currentUser.role;
    const route = role === "admin" ? "/admin/dasbor" : "/pengguna/dasbor";

    console.log("Redirecting user:", role);
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
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem("currentUser");
    this.authStateChanged.next();
    this.router.navigate(["/masuk"]);
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === "admin";
  }

  isUser(): boolean {
    return this.currentUser?.role === "user";
  }
}