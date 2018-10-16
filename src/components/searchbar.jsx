//import liraries
import React from 'react';

// create a component
const SearchBar = () => {
    return (
<div className="search-bar">
<input
            type="search"
            placeholder="Search for a venue"
            aria-label="Type to look up a venue"
            value={this.state.queryV}
            onChange={e => this.SearchVenueList(e.target.value)}
          />
</div>
    );
};

//make this component available to the app
export default SearchBar;
