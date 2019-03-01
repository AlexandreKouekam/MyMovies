import React from 'react'
import MovieItem from "./MovieItem";
import {FlatList} from "react-native";

class moviesList extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props)
        const { movies, loadMovies, page, totalPages } = this.props
        return (
            <FlatList
                data = {movies}
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem = { ( {item} ) => <MovieItem isFavorite={this._isFavorite(item)} displayMovieDetails={this._displayMovieDetails} movie={item}/>}
                onEndReachedThreshold={0.5}
                extraData={this.props.favoriteMovies}
                onEndReached={ () => {
                    if (page < totalPages) {
                        loadMovies()
                    }
                }}
            />
        )
    }
}

export default moviesList