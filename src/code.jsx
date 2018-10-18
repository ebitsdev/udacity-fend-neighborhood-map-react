import React, { Component } from 'react';
import { compose, withProps, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBzcAT2OqL9kldVDCiShPei3Ebkjxq8x0A&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withHandlers({
    onMarkerClustererClick: () => (markerClusterer) => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    zoom={props.maps.zoom}
    center={{ lat: props.maps.lat, lng: props.maps.lng }}
    heading={5}
  >
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker key={marker.photo_id} position={{ lat: marker.latitude, lng: marker.longitude }} />
      ))}
    </MarkerClusterer>
    <Marker position={{ lat: props.maps.lat, lng: props.maps.lng }}>
      <InfoWindow>
        <p>test text</p>
      </InfoWindow>
    </Marker>
  </GoogleMap>
));

export default class DemoApp extends Component {
  render() {
    const markers = [
      { photo_id: 1, longitude: 76.91127, latitude: 11.032595 },
      { photo_id: 2, longitude: 75.806682, latitude: 11.259169 },
      { photo_id: 3, longitude: 77.21378, latitude: 28.617671 }
    ];

    const myMap = {
      lng: 78.138991,
      lat: 9.903245,
      zoom: 6
    };

    return <MyMapComponent markers={markers} maps={myMap} />;
  }
}