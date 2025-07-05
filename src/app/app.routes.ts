import { Routes } from "@angular/router";
import { Error404 } from "errors/404.component";
import { Beranda } from "views/beranda/beranda.component";
import { Masuk } from "views/masuk/masuk.component";
import { TentangKami } from "views/tentang-kami/tentang-kami.component";

export const routes: Routes = [
  { path: "", component: Beranda },
  { path: "tentang-kami", component: TentangKami },
  { path: "masuk", component: Masuk },
  { path: "**", component: Error404 },
];