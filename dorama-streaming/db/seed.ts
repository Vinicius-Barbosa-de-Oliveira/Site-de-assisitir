import { db } from "@/db/db";

import {
  dorama,
  season,
  episode,
  images,
} from "@/db/schema";

const countries = [
  "Coreia do Sul",
  "Japão",
  "China",
  "Tailândia",
  "Taiwan",
];

const statuses = [
    "Em Lançamento",
    "Completo",
    "Em Hiato",
    "Cancelado",
    "Em breve",
] as const;

const dramaTitles = [
  "Moonlight Destiny",
  "Falling Stars",
  "Silent Love",
  "Crimson Heart",
  "Hidden Memories",
  "Winter Blossom",
  "Eternal Promise",
  "Dream Walker",
  "Shadow Kiss",
  "Blue Sky Lovers",
  "Scarlet Moon",
  "Golden Tears",
  "Whispering Winds",
  "Midnight Rain",
  "Starlight Sonata",
  "Frozen Hearts",
  "The Last Empress",
  "Lost in Seoul",
  "Beyond the Horizon",
  "Love Under Snow",
  "Celestial Fate",
  "The Hidden Prince",
  "Ocean of Memories",
  "Faded Dreams",
  "Love in Kyoto",
  "Mystic Garden",
  "The Silent Crown",
  "Broken Destiny",
  "Under Crimson Skies",
  "Echoes of Eternity",
  "Rose of Winter",
  "Ashes of Love",
  "The Blue Butterfly",
  "Golden Horizon",
  "Hearts in Bloom",
  "The Secret Melody",
  "Whispers of Spring",
  "A Thousand Nights",
  "The Forbidden Kiss",
  "Dreams of Sakura",
  "Lost Kingdom",
  "Midnight Blossom",
  "The Eternal Flame",
  "Crystal Hearts",
  "Dancing with Shadows",
  "The Snow Queen",
  "When Stars Fall",
  "The Scarlet Promise",
  "Shadow of the Moon",
  "Beyond the Stars",
  "City of Hearts",
  "Tears of the Ocean",
  "The Forgotten Path",
  "Destiny’s Echo",
  "The Last Sunrise",
  "Song of the Wind",
  "A Love Untold",
  "The Hidden Truth",
  "Whispering Souls",
  "The Crimson Night",
  "Beyond the Rain",
  "Love and Destiny",
  "Moonlit Secrets",
  "The Broken Crown",
  "Under the Sakura Tree",
  "Shadows of Yesterday",
  "The Endless Road",
  "Falling Petals",
  "The Silent Storm",
  "Stars Above Us",
  "The Winter Rose",
  "The Hidden Moon",
  "A Promise Forever",
  "Love in the Mist",
  "The Secret Garden",
  "Dream of Eternity",
  "The Last Letter",
  "Midnight Whispers",
  "The Golden Age",
  "Tears of Heaven",
  "The Frozen Promise",
  "A Melody of Love",
  "The Dark Prince",
  "Spring of Destiny",
  "Beyond the Clouds",
  "The Lonely Star",
  "Love Beyond Time",
  "The Mystic River",
  "Echoes of the Past",
  "The Silent Forest",
  "Shining Memories",
  "The Forgotten Love",
  "Under the Moonlight",
  "A Dance with Fate",
  "The Crimson Flower",
  "Falling into You",
  "The Secret Kingdom",
  "Dreams of Tomorrow",
  "The Eternal Sky",
  "Shadows in the Rain",
  "The Hidden Flame",
  "Love Across Worlds",
  "The Midnight Train",
  "Tears of Destiny",
  "The Scarlet Blade",
  "Whispers in the Dark",
  "The Frozen Garden",
  "Beyond Forever",
  "A Thousand Dreams",
  "The Silent Promise",
  "City of Dreams",
  "The Blue Rose",
  "Lost in Time",
  "The Eternal Kiss",
  "Whispers of Fate",
  "The Crimson Star",
  "Dreams Under Snow",
  "The Last Memory",
  "Love at Dawn",
  "The Hidden Song",
  "Moonlight Serenade",
  "The Forgotten Sky",
  "Shadows of Love",
  "The Silent Ocean",
  "The Golden Moon",
  "A Love Remembered",
  "The Mystic Flame",
  "Dreams in the Wind",
  "The Scarlet River",
  "Beyond the Night",
  "The Hidden Castle",
  "Whispering Hearts",
  "The Eternal Promise",
];

function randomItem<T>(
  array: readonly T[]
): T {
  return array[
    Math.floor(Math.random() * array.length)
  ];
}

function randomNumber(
  min: number,
  max: number
) {
  return Math.floor(
    Math.random() * (max - min + 1) + min
  );
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("🌱 Iniciando seed...");

  for (let i = 1; i <= 200; i++) {
    try {
      // COVER
      const [coverImage] = await db
        .insert(images)
        .values({
          url: `https://picsum.photos/400/600?random=cover-${i}`,
          alt: `Cover ${i}`,
        })
        .returning();

      // BANNER
      const [bannerImage] = await db
        .insert(images)
        .values({
          url: `https://picsum.photos/1600/900?random=banner-${i}`,
          alt: `Banner ${i}`,
        })
        .returning();

      const title = `${randomItem(
        dramaTitles
      )} ${i}`;

      // DORAMA
      const [createdDorama] = await db
        .insert(dorama)
        .values({
          title,

          slug: slugify(title),

          description:
            "Um dorama emocionante cheio de romance, mistério e reviravoltas.",

          coverImageId: coverImage.id,

          bannerImageId: bannerImage.id,

          trailer:
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

          country: randomItem(countries),

          year: randomNumber(2018, 2026),

          status: randomItem(statuses),

          popularityScore: randomNumber(
            1000,
            100000
          ),
        })
        .returning();

      // SEASON
      const [createdSeason] = await db
        .insert(season)
        .values({
          doramaId: createdDorama.id,

          number: 1,

          title: "Temporada 1",

          description:
            "Primeira temporada do dorama.",

          status: "Completo",

          qtdEpisodes: 16,
        })
        .returning();

      // EPISODES
      for (let ep = 1; ep <= 16; ep++) {
        const [thumbImage] = await db
          .insert(images)
          .values({
            url: `https://picsum.photos/1280/720?random=${i}-${ep}`,
            alt: `Episode ${ep}`,
          })
          .returning();

        await db.insert(episode).values({
          seasonId: createdSeason.id,

          number: ep,

          title: `Episódio ${ep}`,

          description:
            "Um episódio cheio de emoção e acontecimentos inesperados.",

          thumbnail: thumbImage.id,

          duration: randomNumber(45, 90),

          releaseDate: new Date(),
        });
      }

      console.log(
        `✅ Dorama ${i}/200 criado`
      );
    } catch (error) {
      console.error(
        `❌ Erro ao criar dorama ${i}`,
        error
      );
    }
  }

  console.log(
    "🎉 Seed finalizada com sucesso!"
  );

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});