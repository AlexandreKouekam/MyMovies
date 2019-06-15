import React from 'react'
import { View, Text } from 'react-native'
import MoviesList from './MoviesList'
import {connect} from "react-redux";

class Favorite extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props)
        const { favoriteMovies } = this.props
        return (
            <MoviesList
                isFavoriteView={true}
                movies={favoriteMovies}
                navigation={this.props.navigation}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.favoriteMovies
    }
}

export default connect(mapStateToProps)(Favorite)