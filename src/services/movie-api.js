import Constants from './constants';
import { getJSON, generateParamsString, correctMov } from './base-api';

const { apiKey } = Constants;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let gengeList;

async function initGenreList() {
  const response = await getJSON(
    `https://api.themoviedb.org/3/genre/movie/list${generateParamsString({
      api_key: apiKey,
    })}`
  );
  gengeList = response.genres.reduce((accumulator, item) => {
    item.color = getRandomColor();
    accumulator[item.id] = item;
    return accumulator;
  }, {});
}
initGenreList();

export function getGenre(id) {
  return gengeList[id];
}

export async function searchMoviesAPI(string, page) {
  const response = await getJSON(
    `https://api.themoviedb.org/3/search/movie${generateParamsString({
      api_key: apiKey,
      query: string,
      page: page,
    })}`
  );
  response.totalResults = response.total_results;
  response.total_results = undefined;
  response.results = response.results.map((mov) => correctMov(mov));
  return response;
}

export async function getMoviesAPI(id) {
  const response = await getJSON(
    `https://api.themoviedb.org/3/movie/${id}${generateParamsString({
      api_key: apiKey,
      language: 'en-US',
    })}`
  );
  return {
    id: response.id,
    overview: response.overview,
    title: response.title,
    releaseDate: response.release_date,
    posterPath: response.poster_path,
    voteAverage: response.vote_average,
  };
}

export const getMovieList = (idList) => {
  return idList.map((id) => {
    return getMoviesAPI(id);
  });
};

export function getPosterLink(path) {
  return `https://image.tmdb.org/t/p/original/${path}`;
}
