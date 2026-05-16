import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const dramas = [
  "Crash Landing on You",
  "Goblin",
  "Vincenzo",
  "Itaewon Class",
  "Descendants of the Sun",
  "True Beauty",
  "Business Proposal",
  "Hotel Del Luna",
  "My Demon",
  "Start-Up",
  "Alchemy of Souls",
  "The Glory",
  "Mouse",
  "Flower of Evil",
  "While You Were Sleeping",
  "Happiness",
  "King the Land",
  "Extraordinary Attorney Woo",
  "Weak Hero Class 1",
  "Lovely Runner",
  "Twenty Five Twenty One",
  "Weightlifting Fairy Kim Bok Joo",
  "Fight for My Way",
  "Signal",
  "Kingdom",
  "Sweet Home",
  "All of Us Are Dead",
  "Moving",
  "Moon Lovers Scarlet Heart Ryeo",
  "Mr. Sunshine",
  "Sky Castle",
  "Penthouse",
  "Dr. Romantic",
  "Our Beloved Summer",
  "Twinkling Watermelon",
  "A Time Called You",
  "Revenant",
  "Celebrity",
  "See You in My 19th Life",
  "Doom at Your Service",
  "The Uncanny Counter",
  "The King Eternal Monarch",
  "Memories of the Alhambra",
  "Healer",
  "W",
  "Pinocchio",
  "Doctor Stranger",
  "The Heirs",
  "Boys Over Flowers",
  "My Love from the Star",
  "Legend of the Blue Sea",
  "Suspicious Partner",
  "What's Wrong with Secretary Kim",
  "Her Private Life",
  "Touch Your Heart",
  "Hometown Cha-Cha-Cha",
  "Because This Is My First Life",
  "Prison Playbook",
  "Hospital Playlist",
  "Reply 1988",
  "Reply 1994",
  "Reply 1997",
  "My Mister",
  "Misaeng",
  "Navillera",
  "Beyond Evil",
  "Big Mouth",
  "Little Women",
  "The Red Sleeve",
  "Mr. Queen",
  "Under the Queen's Umbrella",
  "Extraordinary You",
  "Tempted",
  "Cheese in the Trap",
  "The K2",
  "Vagabond",
  "Arthdal Chronicles",
  "The Fiery Priest",
  "Taxi Driver",
  "DP",
  "Bloodhounds",
  "Bad and Crazy",
  "Stranger",
  "Tunnel",
  "Life on Mars",
  "Voice",
  "Train",
  "Class of Lies",
  "Kairos",
  "Black",
  "Missing The Other Side",
  "Sell Your Haunted House",
  "Tomorrow",
  "Move to Heaven",
  "Daily Dose of Sunshine",
  "My Liberation Notes",
  "Thirty Nine",
  "Forecasting Love and Weather",
  "Love Alarm",
  "Do Do Sol Sol La La Sol",
  "Romance Is a Bonus Book",
  "Run On",
  "Encounter",
  "When the Camellia Blooms",
  "One Spring Night",
  "Something in the Rain",
  "Nevertheless",
  "Snowdrop",
  "Youth of May",
  "2521",
  "Abyss",
  "Cheer Up",
  "Semantic Error",
  "Color Rush",
  "Blue Birthday",
  "Duty After School",
  "The Penthouse",
  "Love to Hate You",
  "Marry My Husband",
  "Perfect Marriage Revenge",
  "Queen of Tears",
  "Doctor Slump",
  "Castaway Diva",
  "Destined With You",
  "My Lovely Liar",
  "The Matchmakers",
  "Flex X Cop",
  "Night Has Come",
  "Death's Game",
  "Island",
  "Big Bet",
  "The Worst of Evil",
  "A Shop for Killers",
  "Parasyte The Grey",
  "Pyramid Game",
  "Hierarchy",
  "The 8 Show",
  "Chicken Nugget",
  "Mask Girl",
  "Gyeongseong Creature",
  "Hellbound",
  "Squid Game",
  "Black Knight",
  "The Silent Sea",
  "Bulgasal",
  "Jirisan",
  "Awaken",
  "Psychopath Diary",
  "Law School",
  "Juvenile Justice",
  "Military Prosecutor Doberman",
  "Again My Life",
  "Why Her",
  "Insider",
  "Adamas",
  "Blind",
  "May It Please the Court",
  "Unlock My Boss",
  "Agency",
  "Brain Works",
  "Crash Course in Romance",
  "Call It Love",
  "Pandora Beneath the Paradise",
  "Dr. Cha",
  "Heartbeat",
  "Miraculous Brothers",
  "Behind Your Touch",
  "Strong Girl Nam Soon",
  "Moon in the Day",
  "Welcome to Samdal-ri",
  "Knight Flower",
  "Captivating the King",
  "Wedding Impossible",
  "Midnight Studio",
  "Lovely Boxer",
  "Connection",
  "The Midnight Romance in Hagwon",
  "Miss Night and Day",
  "Red Swan",
  "No Gain No Love",
  "Family By Choice",
  "Love Next Door",
  "Cinderella at 2 AM",
  "Serendipity's Embrace",
  "Dreaming of a Freaking Fairytale",
  "Bitter Sweet Hell",
  "Chief Detective 1958",
  "The Auditors",
  "Good Partner",
  "Your Honor",
  "Judge from Hell",
  "Study Group",
  "When the Phone Rings",
  "Brewing Love",
  "Parole Examiner Lee",
  "Iron Family",
  "Dongjae the Good or the Bastard",
  "The Frog",
  "Hide",
  "DNA Lover",
  "Dear Hyeri",
  "Light Shop",
  "The Trunk",
  "Mr. Plankton",
  "Love Scout",
  "Newtopia",
  "Motel California",
  "The Trauma Code Heroes on Call",
  "Undercover High School",
  "Buried Hearts",
  "When Life Gives You Tangerines",
  "Resident Playbook",
  "Heavenly Ever After"
];

const genres = [
  "Romance",
  "Drama",
  "Comedy",
  "Action",
  "Fantasy",
  "Thriller",
  "Mystery",
  "Slice of Life",
  "Historical",
  "School",
  "Sci-Fi",
  "Horror",
  "Crime",
  "Adventure",
  "Psychological",
  "Supernatural",
  "Martial Arts",
  "Medical",
  "Legal",
  "Political",
  "Military",
  "Music",
  "Sports",
  "Youth",
  "Melodrama",
  "Family",
  "Office",
  "Business",
  "Survival",
  "Time Travel",
  "Revenge",
  "Detective",
  "Investigation",
  "Zombie",
  "Apocalypse",
  "Game",
  "Mafia",
  "Gangster",
  "Espionage",
  "Psychiatric",
  "Dark Fantasy",
  "Mythology",
  "Royalty",
  "Cooking",
  "BL",
  "GL",
  "Friendship",
  "Coming of Age",
  "Magic",
  "Virtual Reality"
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function randomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function randomGenres() {
  const shuffled = [...genres].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 3) + 2);
}

async function main() {
  console.log("🌱 Iniciando seed...");

  for (const title of dramas) {
    const selectedGenres = randomGenres();

    const genreConnections = [];

    for (const genreName of selectedGenres) {
      const genre = await prisma.genre.upsert({
        where: {
          name: genreName,
        },

        update: {},

        create: {
          name: genreName,
        },
      });

      genreConnections.push({
        id: genre.id,
      });
    }

    const drama = await prisma.drama.upsert({
      where: {
        slug: slugify(title),
      },

      update: {},

      create: {
        title,

        slug: slugify(title),

        description:
          `${title} é um dorama incrível cheio de emoção, romance e reviravoltas.`,

        coverImage:
          `https://picsum.photos/400/600?random=${Math.floor(Math.random() * 9999)}`,

        bannerImage:
          `https://picsum.photos/1280/720?random=${Math.floor(Math.random() * 9999)}`,

        trailerUrl:
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

        country: "South Korea",

        year:
          Math.floor(Math.random() * 10) + 2015,

        rating:
          Number((Math.random() * 2 + 8).toFixed(1)),

        status:
          Math.random() > 0.5
            ? "Completed"
            : "Ongoing",

        scheduleDay: randomItem([
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ]),

        scheduleTime: `${String(Math.floor(Math.random() * 12) + 10).padStart(2, "0")}:00`,

        genres: {
          connect: genreConnections,
        },
      },
    });

    for (let i = 1; i <= 16; i++) {
      await prisma.episode.create({
        data: {
          number: i,

          title: `Episode ${i}`,

          description:
            `Descrição do episódio ${i} de ${title}.`,

          thumbnail:
            `https://picsum.photos/640/360?random=${Math.floor(Math.random() * 9999)}`,

          videoUrl:
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

          duration:
            Math.floor(Math.random() * 20) + 45,

          releaseDate:
            new Date(),

          dramaId: drama.id,
        },
      });
    }

    console.log(`✅ ${title}`);
  }

  console.log("🎉 Seed finalizada com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
