import { Routes } from "@angular/router";
import { AuthGuard } from "@guards/auth.guard";
import { Error404 } from "@errors/404.component";
import { Beranda } from "@views/unregistered/beranda/beranda.component";
import { TentangKami } from "@views/unregistered/tentang-kami/tentang-kami.component";
import { Kontak } from "@views/unregistered/kontak/kontak.component";
import { Masuk } from "@views/unregistered/masuk/masuk.component";
import { DaftarComponent } from "@views/unregistered/daftar/daftar.component";
import { DasborComponent } from "@views/admin/dasbor/dasbor.component";
import { DasborPengguna } from "@views/users/dasbor/dasbor.component";

export const routes: Routes = [
  { path: "", component: Beranda },
  { path: "tentang-kami", component: TentangKami },
  { path: "kontak", component: Kontak },
  { path: "masuk", component: Masuk },
  { path: "daftar", component: DaftarComponent },
  { path: "admin/dasbor", component: DasborComponent, canActivate: [AuthGuard] },
  { path: "pengguna/dasbor", component: DasborPengguna, canActivate: [AuthGuard] },
  { path: "**", component: Error404 },
];
