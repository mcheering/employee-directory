import React, { useContext } from "react";
import DataBody from "./TableBody";
import "../styles/Table.css";
import DataAreaContext from "../utils/TableDataContext";

const DataTable = () => {
      const tableContext = useContext(DataAreaContext);

      return (

            <div className="datatable mt-5">
                  <table
                        id="table"
                        className="table table-borderless  table-hover  table-dark"
                  >
                        <thead>
                              <tr>
                                    {tableContext.state.headings.map(({ name, width }) => {
                                          return (
                                                <th
                                                      className="col"
                                                      key={name}
                                                      style={{ width }}
                                                      onClick={() => {
                                                            tableContext.sortEmployees(name);
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