import * as Config from "../config";
import { getInstance } from "./AppApi";

const instance = getInstance();

export const cancelTokenSource = () => {
  return instance.CancelToken.source();
};

export const searchMovies = async (
  cancelToken,
  searchType,
  searchParam,
  pageNumber
) => {
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

  try {
    const response = await instance.get(method, {
      params: params,
      cancelToken: cancelToken
    });

    const movies = response.data.results;
    return { movies: movies, total: response.data.total_results };
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};

export const getMovieDetails = async (cancelToken, id) => {
  let params = {
    append_to_response: "credits,images"
  };
  const method = Config.MOVIE_API + "/" + id;
  try {
    const response = await instance.get(method, {
      params: params,
      cancelToken: cancelToken
    });
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};
