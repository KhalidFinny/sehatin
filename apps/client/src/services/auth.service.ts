import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, Subject } from "rxjs";

export type User = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";
};

@Injectable({ providedIn: "root" })
export class AuthService {
  private user: User | null = null;
  private listOfUsers: User[] = [{
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
  }];

  public authStateChanged = new Subject<void>();
  public fetchLocalStorage = new BehaviorSubject<boolean>(false);

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedUser = localStorage.getItem("current-user");
    if (savedUser) this.user = JSON.parse(savedUser);
    this.fetchLocalStorage.next(true);
  }

  get currentUser(): User | null {
    return this.user;
  }

  login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      const user = this.listOfUsers.find((u) => u.email === email && u.password === password);
      if (!user) return resolve({ success: false, message: "Email atau kata sandi salah!" });

      this.user = user;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem("current-user", JSON.stringify(user));
        localStorage.setItem("login-timestamp", Date.now().toString());
      }

      this.authStateChanged.next();
      resolve({ success: true, message: "Berhasil masuk akun Anda!" });
    });
  }

  register(email: string, password: string, name: string): boolean {
    const userExists = this.listOfUsers.some((u) => u.email === email);
    if (userExists) return false;

    const newUser: User = {
      id: this.listOfUsers.length + 1,
      email,
      password,
      name,
      role: "user",
    };

    this.listOfUsers.push(newUser);
    return true;
  }

  logout(): void {
    this.user = null;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("current-user");
      localStorage.removeItem("login-timestamp");
    }

    this.authStateChanged.next();
    this.router.navigate(["/"]);
  }
}