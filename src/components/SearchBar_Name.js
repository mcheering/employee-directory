import React, { useContext } from "react";
import "../styles/SearchBar_Name.css";
import DataAreaContext from "../utils/TableDataContext";

const SearchName = () => {
      const tableContext = useContext(DataAreaContext);

      return (
            <div className="searchUsers">
                  <div className="input-group">
                        <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                    Search
            </span>
                        </div>
                        <input
                              className="form-control mr-sm-2"
                              type="search"
                              placeholder="name"
                              aria-label="Search"
                              onChange={(e) => tableContext.search(e)}
                        />
                  </div>
            </div>
      );
}
export default SearchName;