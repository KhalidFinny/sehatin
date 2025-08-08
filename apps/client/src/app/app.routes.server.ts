import { RenderMode, ServerRoute } from "@angular/ssr";
import { listOfArticles } from "@constants/list-of-articles";
import { getAllDistricts } from "indonesia-nodejs";

export const serverRoutes: ServerRoute[] = [
  {
    path: "admin/analitik/kecamatan/:id",
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const allDistricts = await getAllDistricts();
      const malangDistricts = allDistricts.filter(d => d.city_code === 3507);
      return malangDistricts.map(d => ({ id: String(d.city_code) }));
    },
  },
  {
    path: "artikel/:slug",
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return listOfArticles.map(a => ({ slug: a.slug }));
    },
  },
  {
    path: "**",
    renderMode: RenderMode.Prerender,
  },
];