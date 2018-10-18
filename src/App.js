import React, { Component } from "react";
import Header from "./views/Header";

import Map from "./components/Map";
import Sidebar from "./views/Sidebar";
import Footer from "./views/Footer";
import "./App.scss";

class App extends Component {
  state = {
    venues: [],
    venueList: [],
    venueDetails: [],
    venueId: "",
    errorMessage: "",
    marker: {},
    map: undefined
  };
  componentDidMount() {
    this.getVenues();
  }
  // Get african restaurant places

  getVenues = () => {
    // Foursquare api does not work properly with ``, it only does with '' or ""
    const url =
      "https://api.foursquare.com/v2/venues/search?categoryId=4bf58dd8d48988d1c8941735&intent=browse&near=Silver+Spring&limit=15&client_id=XQSXUGIR140AWUVFJJ120S31IPIXQYIO2QJ2ZN2U0ZPLLG4P&client_secret=A0N5P5VI4NG5UQK2GV2M0WU1FYY3KZ0EUYV0YMYZSX5IHHSU&v=20180806";

    // Use fetch API to get data from the server
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          // Capture the same data for the venue list and markers identification
          venueId: data.response.venues,
          venues: data.response.venues,
          venueList: data.response.venues
        });

        console.log(this.state.venues);
      })
      .catch(error => {
        console.log("There was an error while fetching the data", error);
        this.setState({
          errorMessage: (
            <div className="error-message">
              <em>There was an error while fetching the data</em>
            </div>
          )
        });
      });
  };

  venueListFilter = venueList => {
    this.setState({ venueList });
  };

  handleClickedMarker = clickedMarker => {
    this.setState({
      marker: clickedMarker
    });
    console.log(this.state.marker);
  };

  render() {
    return (
      <div role="application" aria-label="neighborhood map" className="app">
        <Header />
        <div id="map" className="main-container">
          <Sidebar
            errormessage={this.state.errorMessage}
            venuesAll={this.state.venues}
            handleClickedMarker={this.handleClickedMarker}
            clickedMarker={this.state.marker}
            venueListFilter={this.venueListFilter}
          />
          <Map
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
