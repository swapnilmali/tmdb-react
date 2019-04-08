// TMDB API information
export const API_KEY = "08308f4c5d9eb1e0301d7a1887838bec";
export const BASE_API_URL = "https://api.themoviedb.org/3";

export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p";

// Genres
export const GENRES = Array(19);
GENRES[28] = { label: "Action", color: "#F34336" };
GENRES[12] = { label: "Adventure", color: "#E81E63" };
GENRES[16] = { label: "Animation", color: "#9B27AF" };
GENRES[35] = { label: "Comedy", color: "#673AB7" };
GENRES[80] = { label: "Crime", color: "#3F51B4" };
GENRES[99] = { label: "Documentary", color: "#4CAE50" };
GENRES[18] = { label: "Drama", color: "#FE9700" };
GENRES[10751] = { label: "Family", color: "#2195F2" };
GENRES[14] = { label: "Fantasy", color: "#8AC24A" };
GENRES[36] = { label: "History", color: "#FE5722" };
GENRES[27] = { label: "Horror", color: "#03A8F3" };
GENRES[10402] = { label: "Music", color: "#CCDB39" };
GENRES[9648] = { label: "Mystery", color: "#00BBD3" };
GENRES[10749] = { label: "Romance", color: "#E5D337" };
GENRES[878] = { label: "Science Fiction", color: "#9D9D9D" };
GENRES[10770] = { label: "TV Movie", color: "#FEC007" };
GENRES[53] = { label: "Thriller", color: "#607C8A" };
GENRES[10752] = { label: "War", color: "#9D9D9D" };
GENRES[37] = { label: "Western", color: "#785548" };

// Default images
export const DEFAULT_POSTER = "/assets/poster.png";
export const DEFAULT_PERSON_PHOTO = "/assets/photo.png";
export const DEFAULT_LOGO_PHOTO = "/assets/logo.png";

// API Methods / routes
export const MOVIE_API = "/movie";
export const COMPANY_API = "/company";
export const PERSON_API = "/person";
export const GENRE_API = "/genre";

// Types of movie listings
export const SEARCH_MOVIES = "search";
export const POPULAR_MOVIES = "popular";
export const TOP_RATED_MOVIES = "top_rated";
export const UPCOMING_MOVIES = "upcoming";
export const NOW_PLAYING_MOVIES = "now_playing";
