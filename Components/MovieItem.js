import React from  'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { constructUrlMovieImageFromAPI } from "../API/TMDBApi";

class MovieItem extends React.Component {

    _displayFavImage(){
        const isFavorite = this.props.isFavorite
        if (isFavorite){
            return(
                <Image
                    style={styles.favorite_image}
                    source={require('../Images/ic_favorite.png')}/>
            )
        }
    }

    render() {
        const { movie, displayMovieDetails} = this.props
        return (
            <TouchableOpacity
                style={styles.main_container}
                onPress={() => displayMovieDetails(movie.id)}>
                <Image
                    style={styles.image}
                    source={{uri: constructUrlMovieImageFromAPI(movie.poster_path)}}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {this._displayFavImage()}
                        <Text style={styles.movie_title} numberOfLines={2}> { movie.title } </Text>
                        <Text style={styles.movie_mark}> { movie.vote_average } </Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.movie_description} numberOfLines={6}> { movie.overview } </Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.movie_date}> Sortie le { movie.release_date }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        backgroundColor: 'lightgrey',
        marginTop: 30,
        height: 190,
        flexDirection: 'row'
    },
    image: {
        flex: 1
    },
    content_container: {
        flex: 2
    },
    header_container: {
        flex: 1,
        flexDirection: 'row'
    },
    description_container: {
        flex: 2,
        justifyContent: 'center'
    },
    favorite_image: {
      height: 20,
      width: 20
    },
    date_container: {
        alignItems: 'flex-end'
    },
    movie_title: {
        flex: 2,
        fontWeight: '700',
        fontSize: 20
    },
    movie_mark: {
        flex: 1,
        fontSize: 25
    },
    movie_description: {
        fontStyle: 'italic'
    },
    movie_date: {

    }
})

export default MovieItem