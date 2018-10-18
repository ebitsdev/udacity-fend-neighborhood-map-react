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

    const { venues, clickedMarker } = this.props;

    const InitMap = withScriptjs(
      withGoogleMap(props => (

        <GoogleMap
          defaultZoom={12}
          defaultCenter={{

            // Silver Spring downtown
            lat: 38.996052, lng: -77.028183

          }}
        >
          {venues && venues.map(
            (venue, idx) => (
              <Marker
                position={{
                  lat: venue.location.lat,
                  lng: venue.location.lng
                }}
                key={idx}
                id={venue.id}
                name={venue.name}
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
                      <p className="venue-name">{venue.name}</p>
                      <ul className="venue-list-address">
                        <li className="venue-address-item">
                          {venue.location.formattedAddress[0]}
                        </li>
                        <li className="venue-address-item">
                          {venue.location.formattedAddress[1]}
                        </li>
                        <li className="venue-address-item">
                          {venue.location.formattedAddress[2]}
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
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyBzcAT2OqL9kldVDCiShPei3Ebkjxq8x0A&libraries=places'
            loadingElement={<div className="map-loading-element"/>}
            containerElement={<div className="map-container" />}
            mapElement={<div className="map" />}
          />

    );
  }
}

export default Map;
