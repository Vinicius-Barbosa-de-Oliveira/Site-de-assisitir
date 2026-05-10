"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import DramaCard from "@/components/DramaCard";

interface Props {
  dramas: any[];
}

export default function TrendingSection({
  dramas,
}: Props) {
  return (
    <section className="space-y-4">

      <div className="flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Populares da Semana
        </h2>

      </div>

      <Swiper
        className="latest-episodes-swiper"
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >

        {dramas.map((drama) => (

          <SwiperSlide key={drama.id}>

            <DramaCard drama={drama} />

          </SwiperSlide>

        ))}

      </Swiper>

    </section>
  );
}