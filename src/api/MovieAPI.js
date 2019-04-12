import * as Config from "../config";
import { getInstance } from "./AppApi";

/**
 * Axios instance from the AppApi
 */
const instance = getInstance();

/**
 * Returns cancel token of axios.
 */
export const cancelTokenSource = () => {
  return instance.CancelToken.source();
};

/**
 * Search the movies with given parameters.
 * @param {*} cancelTokenSource axios cancel token
 * @param {*} searchType Type of the movie listing.
 * @param {*} searchQuery Query to search movies.
 * @param {*} pageNumber Number of the page to return from server.
 */
export const searchMovies = async (
  cancelTokenSource,
  searchType,
  searchQuery,
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
      query: searchQuery,
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
      cancelToken: cancelTokenSource
    });

    const movies = response.data.results;
    return { movies: movies, total: response.data.total_results };
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};

/**
 * Search the movie details.
 * @param {*} cancelTokenSource axios cancel token
 * @param {*} id Id of the movie
 */
export const getMovieDetails = async (cancelTokenSource, id) => {
  let params = {
    append_to_response: "credits,images"
  };
  const method = Config.MOVIE_API + "/" + id;
  try {
    const response = await instance.get(method, {
      params: params,
      cancelToken: cancelTokenSource
    });
    return response.data;
  } catch (err) {
    console.log("Error: ", err);
    return null;
  }
};
