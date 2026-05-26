import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { authOptions } from "@/lib/auth";
import { db } from "@/db/db";

import { user } from "@/db/schema";


import ProfileHero from "@/components/profile/profile-hero";
import ProfileStats from "@/components/profile/profile-stats";
import ContinueWatching from "@/components/profile/continue-watching";
import FavoritesGrid from "@/components/profile/favorites-grid";

export default async function ProfilePage() {
  const session = await getServerSession(
    authOptions
  );

  if (!session?.user?.email) {
    redirect("/login");
  }

  const currentUser =
    await db.query.user.findFirst({
      where: eq(
        user.email,
        session.user.email
      ),

      with: {
        favorites: {
          with: {
            dorama: {
              with: {
                coverImage: true,
              },
            },
          },
        },

        watching: {
          with: {
            episode: {
              with: {
                thumbnail: true,

                season: {
                  with: {
                    dorama: {
                      with: {
                        coverImage: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

  if (!currentUser) {
    redirect("/login");
  }

  const continueWatching =
    currentUser.watching.filter(
      (item) => !item.completed
    );

  const completedEpisodes =
    currentUser.watching.filter(
      (item) => item.completed
    );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0B0B11] text-white">
        <ProfileHero user={currentUser} />

        <ProfileStats
          favorites={
            currentUser.favorites.length
          }
          watching={
            continueWatching.length
          }
          completed={
            completedEpisodes.length
          }
        />

        <ContinueWatching
          items={continueWatching}
        />

        <FavoritesGrid
          favorites={
            currentUser.favorites
          }
        />
      </main>

      <Footer />
    </>
  );
}