import { Injectable } from "@angular/core";
import { AuthService } from "@services/auth.service";
import { SidebarConfig } from "./sidebar.component";

@Injectable({ providedIn: "root" })
export class SidebarService {
  constructor(private authService: AuthService) {}

  getSidebarConfig(): SidebarConfig {
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      return {
        userType: "user",
        userName: "User Name",
        userEmail: "user@email.com",
        userInitial: "U",
      };
    }

    return {
      userType: currentUser.role as "admin" | "user",
      userName: currentUser.name,
      userEmail: currentUser.email,
      userInitial: currentUser.name.charAt(0).toUpperCase(),
    };
  }

  // Helper method untuk mendapatkan config berdasarkan user type
  getConfigByUserType(userType: "admin" | "user"): SidebarConfig {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.role === userType) {
      return {
        userType: currentUser.role as "admin" | "user",
        userName: currentUser.name,
        userEmail: currentUser.email,
        userInitial: currentUser.name.charAt(0).toUpperCase(),
      };
    }

    // Fallback config
    return {
      userType: userType,
      userName: userType === "admin" ? "Admin Sehatin" : "User Sehatin",
      userEmail: userType === "admin" ? "admin@sehatin.com" : "user@sehatin.com",
      userInitial: userType === "admin" ? "A" : "U",
    };
  }
}