import * as Config from "../config";
import Axios from "./axios";

export const searchMovies = async (searchType, searchParam, pageNumber) => {
  let method;
  let params = {
    language: "en-US",
    region: "US",
    page: pageNumber
  };
  if (searchType === Config.SEARCH_MOVIES) {
    method = "/" + Config.SEARCH_MOVIES + "/movie";
    params = {
      query: searchParam,
      language: "en-US",
      region: "US",
      page: pageNumber
    };
  } else {
    method = Config.MOVIE_API + "/" + searchType;
  }

  const response = await Axios.get(method, {
    params: params
  });

  const movies = response.data.results;
  return { movies: movies, total: response.data.total_results };
};

export const getMovieDetails = async id => {
  let params = {
    append_to_response: "credits,images,videos,reviews,similar"
  };
  const method = Config.MOVIE_API + "/" + id;
  const response = await Axios.get(method, {
    params: params
  });
  console.log("Movie details", response);
  return response.data;
};
