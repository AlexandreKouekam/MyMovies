import React from 'react'
import MovieItem from "./MovieItem";
import {FlatList} from "react-native";
import {connect} from "react-redux";

class moviesList extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            movies: []
        }
    }

    _isFavorite(movie){
        return  (this.props.favoriteMovies.findIndex(item => item.id === movie.id) !== -1)
    }

    _displayMovieDetails = (idMovie) => {
        this.props.navigation.navigate('MovieDetails', {idMovie: idMovie})
    }

    render(){
        const { movies, loadMovies, page, totalPages, isFavoriteView } = this.props
        return (
            <FlatList
                data={movies}
                isFavoriteView={isFavoriteView}
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem = { ( {item} ) => <MovieItem isFavorite={this._isFavorite(item)} displayMovieDetails={this._displayMovieDetails} movie={item}/>}
                onEndReachedThreshold={0.5}
                extraData={this.props.favoriteMovies}
                onEndReached={ () => {
                    if (page < totalPages && !isFavoriteView) {
                        loadMovies()
                    }
                }}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.favoriteMovies
    }
}

export default connect(mapStateToProps)(moviesList)