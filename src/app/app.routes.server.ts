import { RenderMode, ServerRoute } from "@angular/ssr";
import { getAllDistricts } from "indonesia-nodejs";

export const serverRoutes: ServerRoute[] = [
  {
    path: "admin/kecamatan/:id",
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const allDistricts = await getAllDistricts();
      const malangDistricts = allDistricts.filter(d => d.city_code === 3507);
      return malangDistricts.map(d => ({ id: String(d.city_code) }));
    }
  },
  {
    path: "**",
    renderMode: RenderMode.Prerender,
  },
];