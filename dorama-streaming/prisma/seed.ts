import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const users = await prisma.user.findMany();

  const dramas = await prisma.drama.findMany();

  if (!users.length || !dramas.length) {

    console.log("❌ Crie usuários e dramas primeiro.");

    return;

  }

  for (const drama of dramas) {

    let total = 0;

    let count = 0;

    for (const user of users) {

      const randomRating =
        Math.floor(Math.random() * 3) + 8;
      // notas entre 8 e 10

      await prisma.rating.upsert({

        where: {
          userId_dramaId: {
            userId: user.id,
            dramaId: drama.id,
          },
        },

        update: {
          value: randomRating,
        },

        create: {

          value: randomRating,

          userId: user.id,

          dramaId: drama.id,

        },

      });

      total += randomRating;
      count++;

    }

    const average =
      Number((total / count).toFixed(1));

    await prisma.drama.update({

      where: {
        id: drama.id,
      },

      data: {
        rating: average,
      },

    });

  }

  console.log("✅ Ratings criados");

}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });