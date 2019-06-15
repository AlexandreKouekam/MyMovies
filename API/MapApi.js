export function getSnackPos () {

    const url = `http://192.168.1.140:4000/snack`
    return fetch(url, {method: 'GET'})
        .then((response) => {
            return response.json()
        })
        .catch((error) => console.log(error))
}

export function constructUrlMovieImageFromAPI(name){
    return `https://image.tmdb.org/t/p/w300${name}`
}