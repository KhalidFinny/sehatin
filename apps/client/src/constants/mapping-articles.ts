import type { Type } from "@angular/core";

export const articleComponentMap: Record<string, () => Promise<Type<unknown>>> = {
  "mengapa-semakin-banyak-orang-muda-di-indonesia-terkena-diabetes": async () => (await import("../articles/mengapa-semakin-banyak-orang-muda-di-indonesia-terkena-diabetes/mengapa-semakin-banyak-orang-muda-di-indonesia-terkena-diabetes.component")).MengapaSemakinBanyakOrangMudaDiIndonesiaTerkenaDiabetes,
  "tekanan-darah-tinggi-sering-tak-terasa-tapi-diam-diam-berbahaya": async () => (await import("../articles/tekanan-darah-tinggi-sering-tak-terasa-tapi-diam-diam-berbahaya/tekanan-darah-tinggi-sering-tak-terasa-tapi-diam-diam-berbahaya.component")).TekananDarahTinggiSeringTakTerasaTapiDiamDiamBerbahaya,
};