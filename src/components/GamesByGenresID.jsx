import React from "react";
import { Link } from "react-router-dom";

function GamesByGenresID({ gameList, selectedGenresName }) {
  return (
    <div className="px-4 py-6">
      <h2 className="font-bold text-3xl dark:text-white mb-6 flex items-center">
        <span className="mr-2">{selectedGenresName}</span>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          ({gameList.length} games)
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gameList.map((item) => (
          <Link
            to={`/game/${item.id}`}
            key={item.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <img src={item.background_image} alt={item.name} className="w-full h-48 object-cover"
              />
              {item.metacritic && (
                <span
                  className={`absolute top-2 right-2 px-2 py-1 rounded-md text-sm font-bold
                              ${
                                item.metacritic >= 80
                                  ? "bg-green-500"
                                  : item.metacritic >= 60
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              } 
                              text-white`}
                >
                  {item.metacritic}
                </span>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold mb-2 dark:text-white line-clamp-1">
                {item.name}
              </h3>

              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span>{item.rating || "N/A"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-blue-500">💬</span>
                  <span>{item.reviews_count.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-red-500">🔥</span>
                  <span>{item.suggestions_count.toLocaleString()}</span>
                </div>
              </div>

              {item.genres && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.genres.slice(0, 3).map((genre) => (
                    <span key={genre.id} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GamesByGenresID;
