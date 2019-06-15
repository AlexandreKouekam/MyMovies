import React from 'react';
import {Platform, Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getSnackPos } from "../API/MapApi";

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

class Map extends React.Component {
    constructor() {
        super()

        this.state = {
            location: null,
            errorMessage: null,
            markers: []
        }

        this._getSnackPos = this._getSnackPos.bind(this)
    }

    componentWillMount() {
        this._getLocationAsync();
    }

    componentDidMount() {
        this._getSnackPos();
    }

    _getSnackPos = () => {
        getSnackPos().then(markers => {
            console.log(markers)
            this.setState({markers})
        })
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    render() {
        let text = null;
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            text = this.state.location;
        }

        return (

            <View style={styles.container}>
                <View style={styles.search_container}>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        minLength={2} // minimum length of text to search
                        autoFocus={false}
                        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                        keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                        listViewDisplayed='auto'    // true/false/undefined
                        fetchDetails={true}
                        renderDescription={row => row.description} // custom description render
                        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            this.setState({location : {coords: {latitude: details.geometry.location.lat, longitude: details.geometry.location.lng}}})
                        }}

                        getDefaultValue={() => ''}

                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyBYvP8qn5fg70MVAIMZwgOT32-528mYBt4',
                            language: 'fr', // language of the results
                            types: '(cities)' // default: 'geocode'
                        }}

                        styles={{
                            textInputContainer: {
                                width: '100%'
                            },
                            description: {
                                fontWeight: 'bold'
                            },
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            }
                        }}

                        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                        currentLocationLabel="Current location"
                        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                        GoogleReverseGeocodingQuery={{
                            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                        }}
                        GooglePlacesSearchQuery={{
                            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            rankby: 'distance',
                            type: 'cafe'
                        }}

                        GooglePlacesDetailsQuery={{
                            // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                            fields: 'formatted_address',
                        }}

                        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                        predefinedPlaces={[homePlace, workPlace]}

                        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        renderLeftButton={()  => <Text>=></Text>}
                        renderRightButton={() => <Text>Custom text after the input</Text>}
                    />
                </View>
                {text && text.coords && <Text style={styles.paragraph}>{text.coords.latitude}</Text>}
                <View style={styles.map_container}>
                    { text && text.coords && (
                        <MapView
                            style={ styles.map }
                            region={{
                                latitude: text.coords.latitude,
                                longitude: text.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                        {this.state.markers.map(marker => (
                            <MapView.Marker
                                key={marker._id}
                                coordinate={{
                                    latitude: marker.location.coordinates[1],
                                    longitude: marker.location.coordinates[0]
                                }}
                                title={marker.name}
                                description={marker.food}
                            />
                        ))}
                        </MapView>
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },
    map_container: {
        flex: 1
    },
    search_container: {
        flex: 1
    },
    map: {
        flex: 1,
        backgroundColor: "#000"
    },
    paragraph: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
    }
});

export default Map




