"use client";

import DramaCard from "@/components/DramaCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

interface Props {
  dramas: any[];
}

export default function Recommended({
  dramas,
}: Props) {
  return (
    <section className="space-y-4">

      <h2 className="text-3xl font-bold">
        Recomendados
      </h2>
      
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
          <SwiperSlide>
            <DramaCard
              key={drama.id}
              drama={drama}
            />
          </SwiperSlide>
        ))}
        
      </Swiper>

    </section>
  );
}