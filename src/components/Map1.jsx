import React, { Component } from 'react';

import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

class Map extends Component {

  render () {

    const places = this.props.cafes;
    const animatePlace = this.props.clickedPlace;

/* create Google Map App and markers, infowindow from FourSquare API from https://github.com/tomchentw/react-google-maps/blob/master/src/docs/configuration.md
and https://tomchentw.github.io/react-google-maps/#infowindow and https://github.com/tomchentw/react-google-maps/issues/753 */

    const style = {
      height: '100%'
    }

    const styleMap = {
      height: '600px',
      width: '100%'
    }

    //define map with markers and infowindow then return it below to display within container div
    const WMap = withScriptjs(withGoogleMap((props) =>
       <GoogleMap
          defaultZoom={ 14 }
          defaultCenter={{ lat: 51.656489, lng: -0.39032 }}>

          {places.map((place, i) =>
             <Marker
                key={i}
                position={{lat: place.location.lat, lng: place.location.lng}}
                id={place.id}
                name={place.name}
                onClick={() => {this.props.handleInfoWindow(i)}}
                animation={animatePlace === i ? window.google.maps.Animation.DROP: null}>

                {animatePlace === i && (<InfoWindow onCloseClick={props.onToggleOpen}>
                    <div className="infoWindow" tabIndex={0} aria-label="Infowindow" >
                      <h2>{place.name}</h2>
                      <hr/>

                      <p><strong>Address: </strong>{place.location.formattedAddress[0]}</p>
                      <p>{place.location.formattedAddress[1]}</p>
                      <p>{place.location.formattedAddress[2]}</p>
                      <p>{place.location.formattedAddress[3]}</p>
                      <p>{place.location.formattedAddress[4]}</p>

                    </div>
                  </InfoWindow>
                )}

                </Marker>
          )}
        </GoogleMap>
    ));

    return (
      <div className="map">
         <div className="wmap" role="application">
            <WMap
               googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFk8F7SikfJihxgfeWargVEIsb31hwlwA&v=3.exp"
               loadingElement={<div style={style} />}
               containerElement={<div style={styleMap} />}
               mapElement={<div style={style} />}/>
         </div>

      </div>
    );
  }
}

export default Map;
