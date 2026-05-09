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
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        breakpoints={{
          320: {
            slidesPerView: 1.2,
          },
          640: {
            slidesPerView: 2.2,
          },
          1024: {
            slidesPerView: 4.2,
          },
          1400: {
            slidesPerView: 5.2,
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