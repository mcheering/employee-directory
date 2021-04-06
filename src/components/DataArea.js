import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";
import DataAreaContext from "../utils/DataAreaContext";

const DataArea = () => {
      const [devState, setDevState] = useState({
            users: [],
            order: "descend",
            filteredUsers: [],
            headings: [
                  { name: "Image", width: "10%", order: "descend" },
                  { name: "name", width: "10%", order: "descend" },
                  { name: "phone", width: "20%", order: "descend" },
                  { name: "email", width: "20%", order: "descend" },
                  { name: "dob", width: "10%", order: "descend" }
            ]
      });

      const handleSort = heading => {
            let currentOrder = devState.headings
                  .filter(elem => elem.name === heading)
                  .map(elem => elem.order)
                  .toString();

            if (currentOrder === "descend") {
                  currentOrder = "ascend";
            } else {
                  currentOrder = "descend";
            }

            const compareFunction = (a, b) => {
                  if (currentOrder === "ascend") {
                        if (a[heading] === undefined) {
                              return 1;
                        } else if (b[heading] === undefined) {
                              return -1;
                        }
                        else if (heading === "name") {
                              return a[heading].first.localeCompare(b[heading].first);
                        } else if (heading === "dob") {
                              return a[heading].age - b[heading].age;
                        } else {
                              return a[heading].localeCompare(b[heading]);
                        }
                  } else {
                        if (a[heading] === undefined) {
                              return 1;
                        } else if (b[heading] === undefined) {
                              return -1;
                        }
                        else if (heading === "name") {
                              return b[heading].first.localeCompare(a[heading].first);
                        } else if (heading === "dob") {
                              return b[heading].age - a[heading].age;
                        } else {
                              return b[heading].localeCompare(a[heading]);
                        }
                  }
            };
            const sortedUsers = devState.filteredUsers.sort(compareFunction);
            const updatedHeadings = devState.headings.map(elem => {
                  elem.order = elem.name === heading ? currentOrder : elem.order;
                  return elem;
            });

            setDevState({
                  ...devState,
                  filteredUsers: sortedUsers,
                  headings: updatedHeadings
            });
      };

      const handleSearchChange = event => {
            const filter = event.target.value;
            // eslint-disable-next-line array-callback-return
            const filteredList = devState.users.filter((item) => {
                  let values = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase();
                  console.log(filter, values)
                  if (values.indexOf(filter.toLowerCase()) !== -1) {
                        return item
                  };
            });

            setDevState({ ...devState, filteredUsers: filteredList });
      };
      useEffect(() => {
            API.getUsers().then(results => {
                  console.log(results.data.results);
                  setDevState({
                        ...devState,
                        users: results.data.results,
                        filteredUsers: results.data.results
                  });
            });
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      return (
            <DataAreaContext.Provider
                  value={{ devState, handleSearchChange, handleSort }}
            >
                  <Nav />
                  <div className="data-area">
                        {devState.filteredUsers.length > 0 ? <DataTable /> : <div></div>}
                  </div>
            </DataAreaContext.Provider>
      );
};

export default DataArea;