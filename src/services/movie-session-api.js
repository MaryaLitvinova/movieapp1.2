import { getJSON, generateParamsString, correctMov } from './base-api';
import Constants from './constants';

const apiKey = Constants.apiKey;

let sessionId = false;

export async function makeSessionId() {
  if (!sessionId) {
    const response = await getJSON(
      `https://api.themoviedb.org/3/authentication/guest_session/new${generateParamsString({
        api_key: apiKey,
      })}`
    );
    sessionId = response.guest_session_id;
    return response;
  }
}

export async function addMovieRated(idMovie, rate) {
  makeSessionId().then(async (res) => {
    console.log(res);
    const response = await getJSON(
      `https://api.themoviedb.org/3/movie/${idMovie}/rating${generateParamsString({
        api_key: apiKey,
        guest_session_id: sessionId,
      })}`,
      {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          value: rate,
        }),
      }
    );
    window.dispatchEvent(new Event('changeRate'));
    return response;
  });
}

export async function getMovieRated(page) {
  const response = await getJSON(
    `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies${generateParamsString({
      api_key: apiKey,
      language: 'en-US',
      sort_by: 'created_at.asc',
      page: page,
    })}`
  );
  response.results = response.results.map((mov) => correctMov(mov));
  response.totalResults = response.total_results;
  console.log(response);
  return response;
}
