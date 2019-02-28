import React from 'react'
import {ScrollView, Text, StyleSheet, View, Image, Button, TouchableOpacity} from 'react-native'
import { constructUrlMovieImageFromAPI, getMovieByIdFromApi } from '../API/TMDBApi'
import IsLoading from './IsLoading'
import moment from 'moment'
import { connect } from 'react-redux'

class MovieDetails extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            movie: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getMovieByIdFromApi(this.props.navigation.getParam('idMovie'))
            .then( data => {
                this.setState({
                    movie: data,
                    isLoading: false
                })
            }
        )
    }

    _displayLoading(){
     if(this.state.isLoading){
            return(
                <IsLoading />
            )
        }
    }

    _toggleFavorite(){
        const action = {type: 'TOGGLE_FAVORITE', value: this.state.movie}
        this.props.dispatch(action)
    }

    _displayFavoriteImage(){
        var sourceImage = require('../Images/ic_favorite_border.png')
        if (this.props.favoriteMovies.findIndex(item => item.id === this.state.movie.id) !== -1){
            sourceImage = require('../Images/ic_favorite.png')
        }
        return(
            <Image
                style={styles.movie_favorite}
                source={sourceImage}
            />
        )
    }

    _displayMovie(){
        const { movie } = this.state
        if( movie !== undefined){
            return (
                <ScrollView style={styles.movie_container}>
                    <Image
                        style={styles.image}
                        source={{uri: constructUrlMovieImageFromAPI(movie.backdrop_path)}}
                    />
                    <View style={styles.title_container}>
                        <Text style={styles.movie_title}>
                            {movie.title}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={ styles.favorite_container }
                        onPress={ () => this._toggleFavorite() }
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <View style={styles.description_container}>
                        <Text style={styles.movie_description}>
                            { movie.overview }
                        </Text>
                    </View>
                    <View style={styles.infos_container}>
                        <Text style={styles.movie_infos}>
                            Sortie le { moment(movie.release_date).format('DD/MM/YYYY') }
                        </Text>
                        <Text style={styles.movie_infos}>
                            Note : { movie.vote_average }
                        </Text>
                        <Text style={styles.movie_infos}>
                            Nombre de votes : { movie.vote_count }
                        </Text>
                        <Text style={styles.movie_infos}>
                            Budget : {movie.budget}
                        </Text>
                        <Text style={styles.movie_infos}>
                            Genre(s) : { movie.genres.map(function (genres) {
                                    return genres.name
                                }).join(' / ')
                            }
                        </Text>
                        <Text style={styles.movie_infos}>
                            Companie(s) : { movie.production_companies.map(function (companies) {
                                    return companies.name
                                }).join(' / ')
                            }
                        </Text>
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return(
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayMovie()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex: 1
    },
    movie_container: {
        flex: 1
    },
    favorite_container: {
        alignItems: 'center'
    },
    movie_favorite: {
        width: 40,
        height: 40
    },
    description_container: {
        flex: 2
    },
    title_container: {
        flex: 1
    },
    movie_title: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    movie_description: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    infos_container: {
        flex: 1
    },
    image:{
        height: 169,
        margin: 5
    }
})

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.favoriteMovies
    }
}

export default connect(mapStateToProps)(MovieDetails)