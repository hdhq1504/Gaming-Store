import React, { useEffect, useState } from "react";
import GenreList from "../components/GenreList";
import GlobalAPI from "../services/GlobalAPI";
import Banner from "../components/Banner";
import TrendingGames from "../components/TrendingGames";
import GamesByGenresID from "../components/GamesByGenresID";

function Home() {
  const [allGameList, setAllGameList] = useState();
  const [gameListByGenres, setGameListByGenres] = useState([]);

  useEffect(() => {
    getAllGamesList();
    getGameListByGenresID(4);
  }, []);

  const getAllGamesList = () => {
    GlobalAPI.getAllGames.then((response) => {
      setAllGameList(response.data.results);
    });
  };

  const getGameListByGenresID = (id) => {
    GlobalAPI.getGameListByGenreID(id).then((response) => {
      console.log("Game list by genre ID:", response.data.results);
      setGameListByGenres(response.data.results);
    })
  }

  return (
    <div className="grid grid-cols-4 px-8">
      <div className="hidden md:block">
        <GenreList genreID={(genreID) => (getGameListByGenresID(genreID))} />
      </div>
      <div className="col-span-4 md:col-span-3">
        {allGameList?.length > 0 ? (
          <div>
            <Banner gameBanner={allGameList[0]} />
            <TrendingGames gameList={allGameList} />
            <GamesByGenresID gameList={allGameList} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
