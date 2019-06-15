const API_TOKEN = "";

export function getMoviesFromApiWithSearchText (text, page) {

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${text}&page=${page}`
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getMovieByIdFromApi(idMovie) {
    const url = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${API_TOKEN}&language=fr`
    return fetch(url)
        .then( (response) => response.json())
        .catch( (error) => console.log(error))
}

export function constructUrlMovieImageFromAPI(name){
    return `https://image.tmdb.org/t/p/w300${name}`
}