//import liraries
import React from 'react';

// create a component
const Header = () => {
    return (
        <div aria-label="Application title" tabIndex={-1} className="header-container">
        <h1 aria-label="African grocery store in Silver Spring, MD" className="header-item">
        African Restaurants in Silver Spring, MD
        </h1>
        </div>
    );
};

//make this component available to the app
export default Header;
