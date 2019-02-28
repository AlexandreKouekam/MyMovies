import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import MovieDetails from '../Components/MovieDetails'

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

export default createAppContainer(searchStackNavigator)