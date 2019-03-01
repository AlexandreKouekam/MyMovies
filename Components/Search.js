import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import MovieItem from './MovieItem'
import MoviesList from './MoviesList'
import IsLoading from  './IsLoading'
import { connect } from 'react-redux'
import { getMoviesFromApiWithSearchText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this._totalPages = 0
        this.state = {
            movies: [],
            page: 0,
            isLoading: false
        }
        this._searchedText = ''
    }

    _loadMovies() {
        if (this._searchedText.length > 0){
            this.setState( {isLoading: true})
            getMoviesFromApiWithSearchText(this._searchedText, this.state.page+1).then(data => {
                this._totalPages = data.total_pages
                this.setState(
                    {
                        page: data.page,
                        movies: [ ...this.state.movies, ...data.results],
                        isLoading: false
                    }
                )
            })
        }
    }

    _searchMovies(){
        this._totalPages = 0
        this.setState(
            {movies: [],
                page: 0
            },
            () => {this._loadMovies(this._searchedText, this.state.page)}
            )
    }

    _searchTextChanged(text) {
        this._searchedText = text
    }

    _displayingLoading(){
        if(this.state.isLoading){
            return(
                <IsLoading/>
            )
        }
    }

    _displayMovieDetails = (idMovie) => {
        this.props.navigation.navigate('MovieDetails', {idMovie: idMovie})
    }

    _isFavorite(movie){
        return  (this.props.favoriteMovies.findIndex(item => item.id === movie.id) !== -1)
    }

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={ (text) => this._searchTextChanged(text)}
                    onSubmitEditing={ () => this._searchMovies()}
                />
                <Button title='Rechercher' onPress={() => this._searchMovies()} />
                <MoviesList
                    movies = {this.state.movies}
                    page={this.state.page}
                    totalPages={this._totalPages}
                    loadMovies={this._loadMovies}
                />
                {this._displayingLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    }
})

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.favoriteMovies
    }
}

export default connect(mapStateToProps)(Search)