import { Routes } from "@angular/router";
import { AuthGuard } from "@guards/auth.guard";
import { Error404 } from "@errors/404.component";
import { Beranda } from "@views/unregistered/beranda/beranda.component";
import { TentangKami } from "@views/unregistered/tentang-kami/tentang-kami.component";
import { Kontak } from "@views/unregistered/kontak/kontak.component";
import { Masuk } from "@views/unregistered/masuk/masuk.component";
import { Daftar } from "@views/unregistered/daftar/daftar.component";
import { AnalitikKecamatan } from "@views/admin/analitik-kecamatan/analitik-kecamatan.component";
import { AnalitikPengguna } from "@views/admin/analitik-pengguna/analitik-pengguna.component";
import { DasborAdmin } from "@views/admin/dasbor/dasbor.component";
import { DetailAnalitikKecamatan } from '@views/admin/detail-analitik-kecamatan/detail-analitik-kecamatan.component';
import { Profil as ProfilAdmin } from "@views/admin/profil/profil.component";
import { DasborPengguna } from "@views/users/dasbor/dasbor.component";
import { RekapKesehatan } from "@views/users/rekap-kesehatan/rekap-kesehatan.component";
import { Profil as ProfilPengguna } from "@views/users/profil/profil.component";
import { EditComponent as EditProfilPengguna } from "@views/users/profil/edit/edit.component";
import { TambahRekapKesehatan } from "@views/users/tambah-rekap-kesehatan/tambah-rekap-kesehatan.component";
import { SkriningPtm } from "@views/users/skrining-ptm/skrining-ptm.component";

export const routes: Routes = [
  /**
   * Perutean untuk pengguna yang belum terautentikasi.
   */
  { path: "", component: Beranda },
  { path: "tentang-kami", component: TentangKami },
  { path: "kontak", component: Kontak },
  { path: "masuk", component: Masuk },
  { path: "daftar", component: Daftar },

  /**
   * Perutean untuk admin.
   */
  { path: "admin/dasbor", component: DasborAdmin, canActivate: [AuthGuard] },
  { path: "admin/analitik/kecamatan", component: AnalitikKecamatan, canActivate: [AuthGuard] },
  { path: "admin/analitik/kecamatan/:id", component: DetailAnalitikKecamatan, canActivate: [AuthGuard] },
  { path: "admin/analitik/pengguna", component: AnalitikPengguna, canActivate: [AuthGuard] },
  { path: "admin/profil", component: ProfilAdmin, canActivate: [AuthGuard] },

  /**
   * Perutean untuk pengguna.
   */
  { path: "pengguna/dasbor", component: DasborPengguna, canActivate: [AuthGuard] },
  { path: "pengguna/rekap-kesehatan", component: RekapKesehatan, canActivate: [AuthGuard] },
  { path: "pengguna/rekap-kesehatan/tambah", component: TambahRekapKesehatan, canActivate: [AuthGuard] },
  { path: "pengguna/skrining-ptm", component: SkriningPtm, canActivate: [AuthGuard] },
  { path: "pengguna/profil", component: ProfilPengguna, canActivate: [AuthGuard] },
  { path: "pengguna/profil/edit", component: EditProfilPengguna, canActivate: [AuthGuard] },

  /**
   * Perutean jika halaman tidak ditemukan.
   */
  { path: "**", component: Error404 },
];
