import React, { Component } from "react";

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
    console.log(filteredVenues);
    console.log(this.filterVenueList(filteredVenues, searchedValue))

    const venueListing = filteredVenues && this.filterVenueList(filteredVenues, searchedValue).map((venue, i) => {
      return (
        <li key={venue.venue.id} aria-label={venue.venue.name} tabIndex={0} onClick={() => {this.props.handleClickedMarker(i)}} onKeyPress={() => {this.props.handleClickedMarker(i)}}>
          {venue.venue.name}
        </li>
      )
    })
    return (
      <aside>
      <div className="sidebar-venue-list">
        <div className="venue-list">
          <input
            type="text"
            placeholder="Search for a venue"
            aria-label="Type to look up a venue"
            value={this.state.queryV}
            onChange={e => this.SearchVenueList(e.target.value)}
          />
          <ul aria-labelledby="Venue listing">
          {venueListing}
          </ul>
        </div>
      </div>
    </aside>
    );
  }
}

export default Sidebar;
