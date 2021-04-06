import React, { useContext } from "react";
import DataBody from "./DataBody";
import "../styles/DataTable.css";
import DataAreaContext from "../utils/DataAreaContext";

const DataTable = () => {
      const context = useContext(DataAreaContext);

      return (

            <div className="datatable mt-5">
                  <table
                        id="table"
                        className="table table-borderless  table-hover  table-dark"
                  >
                        <thead>
                              <tr>
                                    {context.state.headings.map(({ name, width }) => {
                                          return (
                                                <th
                                                      className="col"
                                                      key={name}
                                                      style={{ width }}
                                                      onClick={() => {
                                                            context.sortEmployees(name);
                                                      }}
                                                >
                                                      {name}
                                                      <span className="pointer"></span>
                                                </th>
                                          );
                                    })}
                              </tr>
                        </thead>

                        <DataBody />
                  </table>
            </div>
      );
}

export default DataTable;