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
    marker: {}
  };
  componentDidMount() {
    this.getVenues();
  }
  // Get restaurant places
  getVenues = () => {
    const url = `https://api.foursquare.com/v2/venues/explore?
    query=food
    &intent=browse
    &near=Abidjan
    &client_id=XWAAQ5HAKM102UYQVVXYDJQBOW0SOKKJGHCN0OYCYH2C5HMN
    &client_secret=K3LRW0CPBGE2WPKXMIDVJAATMYPZSRFL3LZ2UQICLDGUESRF
    &v=20181014`;
    // Use fetch to get data from the server
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState(
          {
            // Capture the same data for the venue list and markers identification
            venues: data.response.groups[0].items,
            venueList: data.response.groups[0].items
          }
          // this.renderMap()
        ); // Call the callback function which is the second argument
        console.log(this.state.venueList);
      })
      .catch(error => {
        console.log("There was an error while fetching the data", error);
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
      <div role="application" aria-label="map" className="app">
        <Header />
        {/* Spread all children of the state of the app to the map component */}
        <Map

          venues={this.state.venueList}
          handleClickedMarker={this.handleClickedMarker}
          clickedMarker={this.state.marker}
        />
        <Sidebar

          venuesAll={this.state.venues}
          handleClickedMarker={this.handleClickedMarker}
          clickedMarker={this.state.marker}
          venueListFilter={this.venueListFilter}

        />
        <Footer />
      </div>
    );
  }
}

export default App;
