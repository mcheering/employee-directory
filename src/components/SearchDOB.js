import React, { useContext } from "react";
import DataAreaContext from "../utils/DataAreaContext";

const SearchDOB = () => {
      const context = useContext(DataAreaContext);

      return (
            <div className="searchbox">
                  <div className="input-group">
                        <div className="input-group-prepend">
                              <span className="input-group-text" id="">
                                    Date of Birth
          </span>
                        </div>
                        <input type="date" className="form-control" onChange={(e) => context.search(e)} />
                        <input type="date" className="form-control" onChange={(e) => context.search(e)} />
                  </div>
            </div>
      );
};
export default SearchDOB;