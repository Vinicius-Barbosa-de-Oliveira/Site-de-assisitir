import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dramas = [
  {
    title: "The Prisoner of Beauty",
    slug: "the-prisoner-of-beauty",
    description:
      "Uma história intensa de vingança, romance e poder dentro da alta sociedade coreana.",
    coverImage:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
    bannerImage:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
    country: "Coreia do Sul",
    year: 2025,
    rating: 9.1,
    status: "Em lançamento",
    genres: ["Romance", "Drama", "Vingança"],
    scheduleDay: "Segunda",
    scheduleTime: "22:30",
  },

  {
    title: "Moonlight Destiny",
    slug: "moonlight-destiny",
    description:
      "Dois jovens conectados pelo destino enfrentam conspirações políticas.",
    coverImage:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
    bannerImage:
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
    country: "Coreia do Sul",
    year: 2024,
    rating: 8.8,
    status: "Completo",
    genres: ["Romance", "Drama", "Política"],
    scheduleDay: "Terça",
    scheduleTime: "21:00",
  },

  {
    title: "Silent Hearts",
    slug: "silent-hearts",
    description:
      "Um romance dramático entre dois músicos marcados pelo passado.",
    coverImage:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    bannerImage:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    country: "Japão",
    year: 2023,
    rating: 8.5,
    status: "Completo",
    genres: ["Romance", "Drama", "Slice of Life"],
    scheduleDay: "Quarta",
    scheduleTime: "20:00",
  },

  {
    title: "Crimson Love",
    slug: "crimson-love",
    description:
      "Uma assassina se apaixona pelo homem que deveria eliminar.",
    coverImage:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491",
    bannerImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    country: "China",
    year: 2025,
    rating: 9.3,
    status: "Em lançamento",
    genres: ["Romance", "Ação", "Suspense"],
    scheduleDay: "Quinta",
    scheduleTime: "23:00",
  },

  {
    title: "Winter Sonata Reborn",
    slug: "winter-sonata-reborn",
    description:
      "Uma releitura moderna do clássico romance coreano.",
    coverImage:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66",
    bannerImage:
      "https://images.unsplash.com/photo-1517602302552-471fe67acf66",
    country: "Coreia do Sul",
    year: 2025,
    rating: 8.9,
    status: "Em lançamento",
    genres: ["Romance", "Drama"],
    scheduleDay: "Sexta",
    scheduleTime: "19:30",
  },

  {
    title: "Tokyo Mirage",
    slug: "tokyo-mirage",
    description:
      "Mistério psicológico envolvendo desaparecimentos em Tóquio.",
    coverImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    bannerImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    country: "Japão",
    year: 2024,
    rating: 8.6,
    status: "Completo",
    genres: ["Mistério", "Suspense", "Sobrenatural"],
    scheduleDay: "Sábado",
    scheduleTime: "18:00",
  },

  {
    title: "My Eternal Summer",
    slug: "my-eternal-summer",
    description:
      "Amigos de infância se reencontram após anos separados.",
    coverImage:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    bannerImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    country: "Tailândia",
    year: 2025,
    rating: 8.7,
    status: "Em lançamento",
    genres: ["Romance", "Comédia", "Slice of Life"],
    scheduleDay: "Domingo",
    scheduleTime: "20:30",
  },

  {
    title: "Blue Flame",
    slug: "blue-flame",
    description:
      "Um bombeiro e uma médica enfrentam tragédias juntos.",
    coverImage:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    bannerImage:
      "https://images.unsplash.com/photo-1487180144351-b8472da7d491",
    country: "Coreia do Sul",
    year: 2023,
    rating: 8.4,
    status: "Completo",
    genres: ["Romance", "Drama", "Medicina"],
    scheduleDay: "Segunda",
    scheduleTime: "18:00",
  },

  {
    title: "Hidden Kingdom",
    slug: "hidden-kingdom",
    description:
      "Um príncipe exilado tenta recuperar o trono perdido.",
    coverImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    bannerImage:
      "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
    country: "China",
    year: 2025,
    rating: 9.0,
    status: "Em lançamento",
    genres: ["Ação", "Histórico", "Política"],
    scheduleDay: "Terça",
    scheduleTime: "22:00",
  },

  {
    title: "Dreams of Seoul",
    slug: "dreams-of-seoul",
    description:
      "Jovens artistas tentando sobreviver na capital coreana.",
    coverImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    bannerImage:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    country: "Coreia do Sul",
    year: 2024,
    rating: 8.2,
    status: "Completo",
    genres: ["Drama", "Slice of Life", "Escolar"],
    scheduleDay: "Quarta",
    scheduleTime: "21:30",
  },
];

async function main() {
  await prisma.episode.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.drama.deleteMany();

  for (const drama of dramas) {
    await prisma.drama.create({
      data: {
        ...drama,

        episodes: {
          create: [
            {
              number: 1,
              title: "Episódio 1",
              thumbnail: drama.coverImage,
              videoUrl: "https://example.com/video1",
              duration: 58,
              releaseDate: new Date(),
            },

            {
              number: 2,
              title: "Episódio 2",
              thumbnail: drama.bannerImage,
              videoUrl: "https://example.com/video2",
              duration: 61,
              releaseDate: new Date(),
            },
          ],
        },
      },
    });
  }

  console.log("Banco populado com dramas");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });