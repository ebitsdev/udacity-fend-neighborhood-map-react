import React, { Component } from "react";
import Header from "./views/Header";

import Map from "./components/Map";
import Places from './components/Places';
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
  /**
   *   lat: 39.077773,
            lng: -77.071404
   */
  getVenues = () => {
    const searchUrl = `https://api.foursquare.com/v2/venues/search?ll=39.077773,-77.071404&intent=browse&radius=10000&query=cafe&client_id=XQSXUGIR140AWUVFJJ120S31IPIXQYIO2QJ2ZN2U0ZPLLG4P&client_secret=A0N5P5VI4NG5UQK2GV2M0WU1FYY3KZ0EUYV0YMYZSX5IHHSU&v=20180806'`;
    const url = `https://api.foursquare.com/v2/venues/explore?
    query=food
    &intent=browse
    &limit=25
    &near="Silver Spring, MD"
    &client_id=XWAAQ5HAKM102UYQVVXYDJQBOW0SOKKJGHCN0OYCYH2C5HMN
    &client_secret=K3LRW0CPBGE2WPKXMIDVJAATMYPZSRFL3LZ2UQICLDGUESRF
    &v=20181014`;
    // Use fetch to get data from the server
    fetch(searchUrl)
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

      <div role="application" aria-label="neighborhood map" className="app">
        <Header />
        <div className="main-container">
        <Sidebar

          venuesAll={this.state.venues}
          handleClickedMarker={this.handleClickedMarker}
          clickedMarker={this.state.marker}
          venueListFilter={this.venueListFilter}

        />
        {/* <Places /> */}
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
