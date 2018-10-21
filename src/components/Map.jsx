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
    const { venues, clickedMarker } = this.props;
    const InitMap = withScriptjs(
      withGoogleMap(props => (
        // Bind the drag event to the map object
        <GoogleMap
          // onDragStart={this.mapMoving.bind(this)}
          /** To get a reference to the map object */
          // ref={this.mapLoaded.bind(this)}
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
                        <li className="venue-address-street-view">
                          {venue.location.formattedAddress[2]}
                        </li>
                        <li className="venue-address-item">
                        <img alt={venue.name} src={utilities.getGMapImages(venue)}/>
                        </li>
                      </ul>
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
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBzcAT2OqL9kldVDCiShPei3Ebkjxq8x0A&libraries=places"
        loadingElement={<div className="map-loading-element" />}
        containerElement={
          <div
            role="application"
            aria-hidden="true"
            className="map-container"
            tabIndex={-1}
          />
        }
        mapElement={<div className="map" />}
      />
    );
  }
}

export default Map;
