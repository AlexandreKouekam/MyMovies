import React from 'react'
import { StyleSheet, View, TextInput, Button} from 'react-native'
import MoviesList from './MoviesList'
import IsLoading from  './IsLoading'
import { getMoviesFromApiWithSearchText } from '../API/TMDBApi'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this._totalPages = 0
        this.state = {
            page: 0,
            isLoading: false
        }
        this._searchedText = ''
    }

    _loadMovies = () => {
        if (this._searchedText.length > 0){
            this.setState( {isLoading: true})
            getMoviesFromApiWithSearchText(this._searchedText, this.state.page+1).then(data => {
                console
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

    render() {
        return (
            <View style={styles.main_container}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Nom du snack'
                    onChangeText={ (text) => this._searchTextChanged(text)}
                    onSubmitEditing={ () => this._searchMovies()}
                />
                <Button title='Rechercher' onPress={() => this._searchMovies()} />
                <MoviesList
                    movies = {this.state.movies}
                    page={this.state.page}
                    totalPages={this._totalPages}
                    loadMovies={this._loadMovies}
                    navigation={this.props.navigation}
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



export default Search