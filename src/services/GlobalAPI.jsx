import axios from "axios";

const key = "24525882e65d43b5b0102b87cb6ea329";
const axiosCreate = axios.create({
  baseURL: "https://api.rawg.io/api",
});

const getGenreList = axiosCreate.get("/genres?key=" + key);
const getAllGames = axiosCreate.get("/games?key=" + key);

export default { getGenreList, getAllGames };
