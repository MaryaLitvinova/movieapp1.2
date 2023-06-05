let checkInit = false;

function analysisInit() {
  if (!checkInit) {
    initMovieRated();
    checkInit = true;
  }
}

export function initMovieRated() {
  localStorage.setItem('rated', JSON.stringify({}));
}

export function getMovieRated() {
  analysisInit();
  return JSON.parse(localStorage.getItem('rated'));
}

export function addMovieRated(movie) {
  analysisInit();
  const newObj = getMovieRated();
  newObj[movie.id] = movie;
  localStorage.setItem('rated', JSON.stringify(newObj));
  window.dispatchEvent(new Event('storage'));
  return 'add';
}
