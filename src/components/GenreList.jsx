import React, { useEffect } from "react";
import GlobalAPI from "../services/GlobalAPI";

function GenreList() {
  useEffect(() => {
    getGenreList();
  }, []);

  const getGenreList = () => {
    GlobalAPI.getGenreList.then((response) => {
      console.log(response.data.results);
    });
  };

  return <div>GenreList</div>;
}

export default GenreList;
