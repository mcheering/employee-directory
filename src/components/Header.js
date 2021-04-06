import React from 'react';
import "../styles/Header.css";

function Header() {
      return (
            <div className="header">
                  <h1>Employee Directory</h1>
                  <p>Click on column headers to sort by heading or use the search box to search for a specific employee.</p>
            </div>
      )
}

export default Header;