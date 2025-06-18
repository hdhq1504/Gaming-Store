import React, { useEffect, useState } from "react";
import GenreList from "../components/GenreList";
import GlobalAPI from "../services/GlobalAPI";
import Banner from "../components/Banner";
import TrendingGames from "../components/TrendingGames";

function Home() {
  const [allGameList, setAllGameList] = useState();

  useEffect(() => {
    getAllGamesList();
  }, []);

  const getAllGamesList = () => {
    GlobalAPI.getAllGames.then((response) => {
      setAllGameList(response.data.results);
    });
  };

  return (
    <div className="grid grid-cols-4 px-8">
      <div className="hidden md:block">
        <GenreList />
      </div>
      <div className="col-span-4 md:col-span-3">
        {allGameList?.length > 0 ? (
          <div>
            <Banner gameBanner={allGameList[0]} />
            <TrendingGames gameList={allGameList} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
