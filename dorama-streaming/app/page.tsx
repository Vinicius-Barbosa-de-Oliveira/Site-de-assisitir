import { MainContainer } from "@/components/layout/MainContainer";

import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { HeroBanner } from "@/components/sections/HeroBanner";
import { SectionRow } from "@/components/sections/SectionRow";

import { EpisodeCard } from "@/components/cards/EpisodeCard";

import DoramaCarousel from "@/components/sections/DoramaCarousel";

import { getFeaturedDorama } from "@/lib/queries/dorama/getFeaturedDorama";

import { getTrendingDoramas } from "@/lib/queries/dorama/getTrendingDoramas";

import { getLatestEpisodes } from "@/lib/queries/dorama/getLatestEpisodes";

import { getPopularDoramas } from "@/lib/queries/dorama/getPopularDoramas";

import { getRecentlyAdded } from "@/lib/queries/dorama/getRecentlyAdded";

export default async function HomePage() {
  // HERO

  const featured =
    await getFeaturedDorama();

  // SECTIONS

  const trending =
    await getTrendingDoramas();

  const latestEpisodes =
    await getLatestEpisodes();

  const popular =
    await getPopularDoramas();

  const recent =
    await getRecentlyAdded();

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[#0B0B0F]
        text-white
      "
    >
      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      {featured && (
        <HeroBanner
          title={featured.title}
          description={
            featured.description
          }
          bannerUrl={
            featured.bannerImage?.url || ""
          }
          coverUrl={
            featured.coverImage?.url || ""
          }
          year={featured.year}
          country={featured.country}
          status={featured.status}
        />
      )}

      {/* CONTENT */}

      <MainContainer>
        <div className="space-y-20 py-16">
          {/* TRENDING */}

          <DoramaCarousel
            title="🔥 Trending Now"
            dramas={trending.map(
              (item) => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                year: item.year,
                popularityScore:
                  item.popularityScore,
                coverImage:
                  item.coverImage,
                status: item.status,
              })
            )}
          />

          {/* LATEST EPISODES */}

          <SectionRow
            title="📺 Últimos Episódios"
            viewAllHref="/episodes/latest"
          >
            {latestEpisodes.map(
              (episode) => (
                <EpisodeCard
                  key={episode.id}
                  id={episode.id}
                  title={episode.title}
                  thumbnail={
                    episode.thumbnail
                      ?.url || ""
                  }
                  doramaTitle={
                    episode.season.dorama
                      .title
                  }
                  episodeNumber={
                    episode.number
                  }
                  duration={
                    episode.duration
                  }
                />
              )
            )}
          </SectionRow>

          {/* POPULAR */}

          <DoramaCarousel
            title="⭐ Popular"
            dramas={popular.map(
              (item) => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                year: item.year,
                popularityScore:
                  item.popularityScore,
                coverImage:
                  item.coverImage,
                status: item.status,
              })
            )}
          />

          {/* RECENT */}

          <DoramaCarousel
            title="🆕 Adicionados Recentemente"
            dramas={recent.map(
              (item) => ({
                id: item.id,
                title: item.title,
                slug: item.slug,
                year: item.year,
                popularityScore:
                  item.popularityScore,
                coverImage:
                  item.coverImage,
                status: item.status,
              })
            )}
          />
        </div>
      </MainContainer>

      {/* FOOTER */}

      <Footer />
    </main>
  );
}