
const initialState = {favoriteMovies: []}

function toggleFavorite(state = initialState, action){
    let nextState
    switch (action.type) {
        case ('TOGGLE_FAVORITE'):
            const favoriteMovieIndex = state.favoriteMovies.findIndex(item => item.id === action.value.id)
            if (favoriteMovieIndex !== -1){
                nextState = {
                    ...state,
                    favoriteMovies: state.favoriteMovies.filter(
                        (item, index) => index !== favoriteMovieIndex)
                }
            } else {
                nextState = {
                    ...state,
                    favoriteMovies: [...state.favoriteMovies, action.value]
                }
            }
            return nextState || state
        default:
            return state
    }
}

export default toggleFavorite