import React, { Component } from "react";
import SearchBar from "../components/searchbar";

class Sidebar extends Component {
  state = {
    queryV: ""
  };

  SearchVenueList = queryV =>{

    this.setState({queryV});
    this.props.venueListFilter(this.filterVenueList(this.props.venuesAll, queryV));
  }
  filterVenueList = (venues, query) =>
  venues.filter(venue => venue.venue.name.toLowerCase().includes(query.toLowerCase()));
  // render the component
  render() {
    const filteredVenues = this.props.venuesAll;
    const searchedValue = this.state.queryV;
    // console.log(filteredVenues);
    // console.log(this.filterVenueList(filteredVenues, searchedValue))

    const venueListing = filteredVenues && this.filterVenueList(filteredVenues, searchedValue).map((venue, i) => {
      return (
        <li className="venue-list-item" key={venue.venue.id} aria-label={venue.venue.name} tabIndex={0} onClick={() => {this.props.handleClickedMarker(i)}} onKeyPress={() => {this.props.handleClickedMarker(i)}}>
          {venue.venue.name}
        </li>
      )
    })
    return (
      <div className="sidebar-wrapper">
        <div className="search-bar">
          <input className="search-field"
            type="search"
            placeholder="Search for a venue"
            aria-label="Type to look up a venue"
            value={this.state.queryV}
            onChange={e => this.SearchVenueList(e.target.value)}
          />
        </div>
      <div className="sidebar-venue-list">
        <div className="venue-list">
          <ul id="venuelist" className="venue-listing" aria-labelledby="venuelist">
          {venueListing}
          </ul>
        </div>
      </div>
    </div>
    );
  }
}

export default Sidebar;
