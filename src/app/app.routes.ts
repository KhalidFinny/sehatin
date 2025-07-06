import { Routes } from "@angular/router";
import { Error404 } from "errors/404.component";
import { Beranda } from "views/beranda/beranda.component";
import { Masuk } from "views/masuk/masuk.component";
import { DaftarComponent } from "views/daftar/daftar.component";
import { TentangKami } from "views/tentang-kami/tentang-kami.component";
import { DashboardAdminComponent } from "views/dashboard-admin/dashboard-admin.component";
import { DashboardUserComponent } from "views/dashboard-user/dashboard-user.component";

export const routes: Routes = [
  { path: "", component: Beranda },
  { path: "beranda", component: Beranda },
  { path: "tentang-kami", component: TentangKami },
  { path: "masuk", component: Masuk },
  { path: "daftar", component: DaftarComponent },
  { path: "dashboard-admin", component: DashboardAdminComponent },
  { path: "dashboard-user", component: DashboardUserComponent },
  { path: "**", component: Error404 },
];
