import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/slider.css";

function TrendingGames({ gameList }) {
  return (
    <div className="mt-5 p-4">
      <h2 className="font-bold text-[30px] dark:text-white mb-6">
        Trending Games
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="w-full"
      >
        {gameList.map((game) => (
          <SwiperSlide key={game.id}>
            <div className="game-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-white">
                  {game.name}
                </h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                      {game.rating} ★
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {game.released?.split("-")[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TrendingGames;
