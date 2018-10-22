import React, { Component } from "react";
import Header from "./views/Header";
import Map from "./components/Map";
import * as utilities from "./utils/utilities";
import Sidebar from "./views/Sidebar";
import Footer from "./views/Footer";
import "./App.scss";

class App extends Component {
  state = {
    venues: [],
    venueList: [],
    errorMessage: "",
    marker: {}
  };
  componentDidMount() {
    // Get app data from the utilities
    let getvData = utilities.getVenuesData();
    Promise.all([getvData])
      .then(data => {
        this.setState({
          venues: data[0].sort((a, b) => a.name > b.name ),
          venueList: data[0].sort((a, b) => a.name > b.name )
        });
      })
      .catch(error => {
        console.log("There was an error while fetching the data", error);
        if (this.state.venues.length === 0) {
          this.setState({
            errorMessage: (
              <div className="error-message">
                <em>There was an error while fetching the data</em>
              </div>
            )
          });
        }
      });
      window.gm_authFailure = () => {
     alert('An error occured');
      }
  }
  venueListFilter = venueList => {
    this.setState({ venueList });
  };

  handleClickedMarker = clickedMarker => {
    this.setState({
      marker: clickedMarker
    });
  };

  render() {
    return (
      <div className="app">
        <Header />
        <div
          id="map"
          role="application"
          aria-hidden="true"
          aria-label="neighborhood map"
          className="main-container"
        >
          <Sidebar
            errormessage={this.state.errorMessage}
            venuesAll={this.state.venues}
            handleClickedMarker={this.handleClickedMarker}
            clickedMarker={this.state.marker}
            venueListFilter={this.venueListFilter}
          />
          <Map
            center={{ lat: 38.996154, lng: -77.028142 }}
            tabIndex={-1}
            venues={this.state.venueList}
            handleClickedMarker={this.handleClickedMarker}
            clickedMarker={this.state.marker}
          />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
