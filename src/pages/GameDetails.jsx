import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from "react-icons/fa";
import { SiNintendoswitch } from "react-icons/si";
import { useTheme } from "../context/theme/useTheme";
import GlobalAPI from "../services/GlobalAPI";

function GameDetails() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [activeTab, setActiveTab] = useState("about");
  const [loading, setLoading] = useState(true);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const [gameRes, screenshotsRes, moviesRes] = await Promise.all([
          GlobalAPI.getGameDetails(id),
          GlobalAPI.getGameScreenshots(id),
          GlobalAPI.getGameMovies(id)
        ]);

        setGame({ ...gameRes.data, movies: moviesRes.data.results });
        setScreenshots(screenshotsRes.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching game details:", error);
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const getPlatformIcon = (platform) => {
    const icons = {
      pc: <FaWindows className="text-xl" />,
      playstation: <FaPlaystation className="text-xl" />,
      xbox: <FaXbox className="text-xl" />,
      ios: <FaApple className="text-xl" />,
      mac: <FaApple className="text-xl" />,
      linux: <FaLinux className="text-xl" />,
      android: <FaAndroid className="text-xl" />,
      nintendo: <SiNintendoswitch className="text-xl" />,
    };
    return icons[platform.toLowerCase()] || null;
  };

  const formatRequirements = (requirementsText) => {
    if (!requirementsText) return [];

    // Remove HTML tags if present
    const cleanText = requirementsText.replace(/<[^>]*>/g, "");

    // Split by newlines or specific requirements indicators
    const requirements = cleanText
      .split(/\n|Minimum:|Recommended:|•/)
      .filter((req) => req.trim().length > 0 && !req.includes("Requirements:"));

    return requirements.map((req) => req.trim());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Video/Screenshot */}
      <div className="relative h-[600px] w-full">
        {game.movies && game.movies[0] ? (
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            poster={game.background_image}
          >
            <source src={game.movies[0].data.max} type="video/mp4" />
          </video>
        ) : (
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50"></div>

        {/* Game Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {game.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                {game.parent_platforms?.map(({ platform }) => (
                  <span key={platform.id} className="text-white">
                    {getPlatformIcon(platform.name)}
                  </span>
                ))}
              </div>
              {game.metacritic && (
                <span
                  className={`px-2 py-1 rounded text-white font-bold ${
                    game.metacritic >= 80
                      ? "bg-green-500"
                      : game.metacritic >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {game.metacritic}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2">
                <p className="text-lg text-gray-200 line-clamp-3">
                  {game.description_raw}
                </p>
              </div>
              <div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg font-bold text-lg transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto">
          {["about", "features", "media", "requirements"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold capitalize transition-all relative
                ${
                  activeTab === tab
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }
                whitespace-nowrap
              `}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400"></span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === "about" && (
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                About {game.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                {game.description_raw}
              </p>

              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Release Date
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {game.released}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Developer
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {game.developers?.map((dev) => dev.name).join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Publisher
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {game.publishers?.map((pub) => pub.name).join(", ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Genres
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {game.genres?.map((genre) => genre.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "media" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {screenshots.map((screenshot) => (
                <div
                  key={screenshot.id}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={screenshot.image}
                    alt="Game Screenshot"
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === "features" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {game.tags?.slice(0, 6).map((tag) => (
                <div key={tag.id} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {tag.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {tag.description || "Feature description"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "requirements" &&
            game.platforms?.find((p) => p.platform.name === "PC")
              ?.requirements && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-4">
                    Minimum Requirements
                  </h3>
                  <ul className="space-y-3">
                    {formatRequirements(
                      game.platforms.find((p) => p.platform.name === "PC")
                        .requirements.minimum
                    ).map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white mb-4">
                    Recommended Requirements
                  </h3>
                  <ul className="space-y-3">
                    {formatRequirements(
                      game.platforms.find((p) => p.platform.name === "PC")
                        .requirements.recommended
                    ).map((req, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
