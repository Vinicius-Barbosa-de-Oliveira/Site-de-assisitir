import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import CategoriesClient from "@/components/categories/CategoriesClient";

import {
  getSearchDramas,
  getDramaGenres,
} from "@/app/services/dramas";

export default async function CategoriesPage() {

  const [dramas, genres] =
    await Promise.all([
      getSearchDramas(),
      getDramaGenres(),
    ]);

  return (

    <main className="bg-[#0F0F14] min-h-screen text-white">

      <Navbar />

      <CategoriesClient
        dramas={dramas}
        genres={genres}
      />

      <Footer />

    </main>

  );

}