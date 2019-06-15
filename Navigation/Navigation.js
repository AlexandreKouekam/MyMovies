import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Search from '../Components/Search'
import MovieDetails from '../Components/MovieDetails'
import Favorite from '../Components/Favorite'
import Map from '../Components/Map'
import { Image, StyleSheet } from "react-native";
import React from 'react'

const searchStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rechercher'
        }
    },
    MovieDetails: {
        screen: MovieDetails,
        navigationOptions: {
            title: 'Details'
        }
    }
})

const favoriteStackNavigator = createStackNavigator({
    Favorite: {
        screen: Favorite,
        navigationOptions: {
            title: 'Favorie'
        }
    },
    MovieDetails: {
        screen: MovieDetails,
        navigationOptions: {
            title: 'Details'
        }
    }
})

const mapStackNavigator = createStackNavigator({
    Map: {
        screen: Map,
        navigationOptions: {
            title: 'Geoloc'
        }
    }
})

const MoviesTabNavigator = createBottomTabNavigator({
    Search: {
        screen: searchStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../Images/ic_search.png')}
                    style={styles.tab_image}
                />
            }
        }
    },
    Map: {
        screen: mapStackNavigator,
        navigationOptions: {
            tabBarIcon: () => {
                return <Image
                    source={require('../Images/ic_search.png')}
                    style={styles.tab_image}
                />
            }
        }
    },
    Favorite: {
        screen: favoriteStackNavigator,
        navigationOptions:{
            tabBarIcon: () => {
                return <Image
                    source={require('../Images/ic_favorite.png')}
                    style={styles.tab_image}
                />
            }
        }
    }
},
    {
        tabBarOptions: {
            activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
            inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
            showLabel: false, // On masque les titres
            showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
        }
    }
)

const styles = StyleSheet.create({
    tab_image: {
        height: 25,
        width: 25
    }
})

export default createAppContainer(MoviesTabNavigator)