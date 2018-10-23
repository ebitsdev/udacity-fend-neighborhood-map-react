import React, { Component } from "react";
import * as utilities from '../utils/utilities';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
class Map extends Component {

  render() {
    // Handle connection errors while loading google loading Google Maps
    window.gm_authFailure = () => {
      alert('There was an error while fetching Google Maps data, please try again.');
    };
    const { venues, clickedMarker } = this.props;
    const InitMap = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
        // Set map default options
          defaultZoom={15}
          defaultCenter={this.props.center}
          defaultOptions={{
            streetViewControl: false,
            scaleControl: false,
            mapTypeControl: false,
            panControl: false,
            zoomControl: false,
            rotateControl: false,
            fullscreenControl: false,
            disableDefaultUI: true
          }}
        >
          {venues &&
            venues.map((venue, idx) => (
              // Get african restaurant places
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
                      <div className="venue-address-street-view">
                      <img className="venue-address-item-street-view" alt={venue.name} src={utilities.getGMapImages(venue)}/>
                      </div>
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            ))}
        </GoogleMap>

      ))
    );

    return (
      <InitMap

        googleMapURL={utilities.gMapUrl()}
        loadingElement={<div className="map-loading-element" />}
        containerElement={
          <div
            role="application"
            aria-hidden="true"
            className="map-container"
            tabIndex={-1}
          />
        }
        mapElement={<div  className="map" />}
      />
    );

  }
}

export default Map;
