import React, { Component } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
class Map extends Component {
  render() {

    const { venues, marker, handleClickedMarker, clickedMarker } = this.props;
    // const animatevenue = this.props.clickedMarker;
    const style = {
      height: "100%"
    };

    const styleMap = {
      height: "100vh",
      width: "60%"
    };
    const InitMap = withScriptjs(
      withGoogleMap(props => (

        <GoogleMap
          defaultZoom={12}
          defaultCenter={{
            // lat: 51.656489, lng: 0.39032
            // Silver Spring MD
            
            lat: 39.077773,
            lng: -77.071404
          }}
        >
          {venues && venues.map(
            (venue, idx) => (
              <Marker
                position={{
                  lat: venue.venue.location.lat,
                  lng: venue.venue.location.lng
                }}
                key={idx}
                id={venue.venue.id}
                name={venue.venue.name}
                onClick={() => {
                  this.props.handleClickedMarker(idx);
                }}
                animation={
                  clickedMarker === idx
                    ? window.google.maps.Animation.DROP
                    : null
                }
              >
                {clickedMarker === idx && (
                  <InfoWindow onCloseClick={props.onToggleOpen}>
                    <div
                      className="venue-address-container"
                      tabIndex={0}
                      aria-label="venue-address-container"
                    >
                      <p className="venue-name">{venue.venue.name}</p>
                      <ul className="venue-list-address">
                        <li className="venue-address-item">
                          {venue.venue.location.formattedAddress[0]}
                        </li>
                        <li className="venue-address-item">
                          {venue.venue.location.formattedAddress[1]}
                        </li>
                        <li className="venue-address-item">
                          {venue.venue.location.formattedAddress[2]}
                        </li>
                      </ul>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            )
          )}
        </GoogleMap>
      ))
    );

    return (

          <InitMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzcAT2OqL9kldVDCiShPei3Ebkjxq8x0A&v=3.exp"
            loadingElement={<div className="map-loading-element"/>}
            containerElement={<div className="map-container" />}
            mapElement={<div className="map" />}
          />

    );
  }
}

export default Map;
