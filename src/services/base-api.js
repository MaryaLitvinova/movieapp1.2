export async function getJSON(url, obj) {
  let response;
  if (obj) {
    response = await fetch(url, obj);
  } else {
    response = await fetch(url);
  }
  const res = await response.json();
  return res;
}

export function generateParamsString(obj) {
  const arrayKeys = Object.keys(obj);
  const res = arrayKeys.reduce((accumulator, item) => `${accumulator}${item}=${obj[item]}&`, '?');
  return res;
}

export const correctMov = (mov) => {
  return {
    id: mov.id,
    overview: mov.overview,
    title: mov.title,
    rating: mov.rating,
    releaseDate: mov.release_date,
    posterPath: mov.poster_path,
    voteAverage: mov.vote_average,
    genreIds: mov.genre_ids,
  };
};
