/*global google*/
import React, {Component} from "react"
import { compose, withProps, withHandlers, withState, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"

// create a component
const GetPlaces = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBzcAT2OqL9kldVDCiShPei3Ebkjxq8x0A&libraries=places",
        loadingElement: <div style={{height: '100%'}} />,
        containerElement: <div style={{height: '400px'}} />,
        mapElement: <div style={{ height: '100%'}} />
}),
withScriptjs, withGoogleMap, withState('places', 'updatePlaces', ''),
withHandlers(() =>{
    const refs = {
        map: undefined,
    }
    return {
        onMapMounted: () => ref =>{
            refs.map = ref
        },
        fetchPlaces: ({ updatePlaces}) => {
            let places;
            const bounds = refs.map.getBounds();
            const service = new google.maps.places.PlacesService(refs.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
            const request = {
                bounds: bounds,
                type: ['hotel']
            };
            service.nearbySearch(request, (results, status) => {
                if (status === google.maps.places.PlacesService.OK){
                    console.log(results);
                    updatePlaces(results);
                }
            })
        }
    }
}),
)((props) => {
    return (
        <GoogleMap
        onTilesLoaded={props.fetchPlaces}
        ref={props.onMapMounted}
        onBoundsChanged={props.fetchPlaces}
        defaultZoom={14}
        defaultCenter={{ lat: 39.077773, lng: -77.071404 }}
        >
{props.places && props.places.map((place, i) =>
    <Marker
    key={i} position={{lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}} />

)}
        </GoogleMap>
    )
});

//make this component available to the app
export default class AllGetPlaces extends React.PureComponent {
    render() {
        return (
            <GetPlaces />
        )
    }
}
