"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DramaCard from "@/components/DramaCard";

interface Genre {
  id: string;
  name: string;
}

export default function CategoriesPage() {

const searchParams = useSearchParams();

const searchFromUrl =
    searchParams.get("search");

const genreFromUrl =
    searchParams.get("genre");

const [selectedCategory, setSelectedCategory] =
    useState("Todos");

const [search, setSearch] =
    useState("");

const [dramas, setDramas] = useState<any[]>([]);

const [genres, setGenres] = useState<Genre[]>([]);

const [loading, setLoading] = useState(true);

useEffect(() => {

    if (genreFromUrl) {
        setSelectedCategory(genreFromUrl);
    }

    if (searchFromUrl) {
        setSearch(searchFromUrl);
    }

}, [genreFromUrl, searchFromUrl]);

useEffect(() => {
    const fetchData = async () => {
        try {
            const [dramasRes, genresRes] = await Promise.all([
                fetch("/api/dramas"),
                fetch("/api/genres")
            ]);
            
            if (dramasRes.ok) {
                const dramasData = await dramasRes.json();
                setDramas(dramasData);
            }
            
            if (genresRes.ok) {
                const genresData = await genresRes.json();
                setGenres(genresData);
            }
        } catch (error) {
            console.error("Erro:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);

const filteredDramas = useMemo(() => {

    return dramas.filter((drama) => {

    const matchesCategory =
        selectedCategory === "Todos"
        ? true
        : drama.genres.some((genre: Genre) => genre.name === selectedCategory);

    const matchesSearch =
        drama.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;

    });

}, [selectedCategory, search, dramas]);

const categories = ["Todos", ...genres.map(g => g.name)];


return (
    <main className="bg-[#0F0F14] min-h-screen text-white">

    <Navbar />

    {/* HERO */}

    <section className="relative overflow-hidden border-b border-white/10">

        <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">

            <span className="bg-purple-500 px-4 py-2 rounded-full text-sm">
                Explorar
            </span>

            <h1 className="text-6xl font-black mt-6">
                Categorias
            </h1>

            <p className="text-zinc-400 text-lg mt-6 max-w-2xl">
                Explore milhares de doramas através de gêneros e categorias.
            </p>

        </div>

    </section>

    {/* SEARCH */}

    <section className="max-w-7xl mx-auto px-6 pt-10">

        <div className="bg-[#18181F] border border-white/10 rounded-3xl p-4">

        <input
            type="text"
            placeholder="Buscar dorama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-white placeholder:text-zinc-500 text-lg"
        />

        </div>

    </section>

    {/* FILTERS */}

    <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-wrap gap-4">

        {categories.map((category) => (

            <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-4 rounded-2xl font-semibold transition ${
                selectedCategory === category
                ? "bg-purple-500"
                : "bg-[#18181F] hover:bg-purple-500"
            }`}
            >
            {category}
            </button>

        ))}

        </div>

    </section>

    {/* RESULTS */}

    <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="flex items-center justify-between mb-10">

        <div>

            <h2 className="text-4xl font-bold">
            Resultados
            </h2>

            <p className="text-zinc-400 mt-2">
            {loading ? "Carregando..." : `${filteredDramas.length} doramas encontrados`}
            </p>

        </div>

        <button className="text-purple-400">
            Mais populares
        </button>

        </div>

        {loading ? (
        <div className="bg-[#18181F] rounded-3xl p-20 text-center border border-white/5">
            <h3 className="text-3xl font-bold">
            Carregando dramas...
            </h3>
        </div>
        ) : filteredDramas.length === 0 ? (

        <div className="bg-[#18181F] rounded-3xl p-20 text-center border border-white/5">

            <h3 className="text-3xl font-bold">
            Nenhum dorama encontrado
            </h3>

            <p className="text-zinc-400 mt-4">
            Tente pesquisar outro nome ou categoria.
            </p>

        </div>

        ) : (

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

            {filteredDramas.map((drama) => (

            <DramaCard
                key={drama.id}
                drama={drama}
            />

            ))}

        </div>

        )}

    </section>

    <Footer />

    </main>
);
}