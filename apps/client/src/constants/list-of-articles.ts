export type Article = {
  slug: string;
  title: string;
  summary: string;
  image: string;
};

export const listOfArticles: Article[] = [
  {
    slug: "mengapa-semakin-banyak-orang-muda-di-indonesia-terkena-diabetes",
    title: "Mengapa Semakin Banyak Orang Muda di Indonesia Terkena Diabetes?",
    summary: "Gaya hidup modern bikin diabetes datang lebih cepat dari yang kita kira.",
    image: "/articles/diabetes-people.jpeg",
  },
  {
    slug: "tekanan-darah-tinggi-sering-tak-terasa-tapi-diam-diam-berbahaya",
    title: "Tekanan Darah Tinggi Sering Tak Terasa Tapi Diam-diam Berbahaya",
    summary: "Penting untuk cek tekanan darah secara rutin agar tidak kecolongan.",
    image: "/articles/hypertension.jpeg",
  },
];