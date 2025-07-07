import { Routes } from "@angular/router";
import { Beranda } from "@views/unregistered/beranda/beranda.component";
import { TentangKami } from "@views/unregistered/tentang-kami/tentang-kami.component";
import { Kontak } from "@views/unregistered/kontak/kontak.component";
import { Masuk } from "@views/unregistered/masuk/masuk.component";
import { DaftarComponent } from "@views/unregistered/daftar/daftar.component";
import { DasborAdmin } from "@views/admin/dasbor/dasbor.component";
import { DasborPengguna } from "@views/users/dasbor/dasbor.component";
import { Error404 } from "@errors/404.component";

export const routes: Routes = [
  { path: "", component: Beranda },
  { path: "tentang-kami", component: TentangKami },
  { path: "kontak", component: Kontak },
  { path: "masuk", component: Masuk },
  { path: "daftar", component: DaftarComponent },
  { path: "admin/dasbor", component: DasborAdmin },
  { path: "pengguna/dasbor", component: DasborPengguna },
  { path: "**", component: Error404 },
];