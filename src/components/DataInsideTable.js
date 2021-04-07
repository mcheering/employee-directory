/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "./Table";
import Nav from "./Navbar";
import API from "../utils/API";
import "../styles/Area.css";
import DataAreaContext from "../utils/TableDataContext";

const DataInsideTable = () => {
      const [state, setState] = useState({
            usersArray: [],
            order: "descend",
            filteredUsersArray: [],
            headings: [
                  { name: "Image", width: "10%", order: "descend" },
                  { name: "name", width: "10%", order: "descend" },
                  { name: "phone", width: "20%", order: "descend" },
                  { name: "email", width: "20%", order: "descend" },
                  { name: "dob", width: "10%", order: "descend" }
            ]
      })

      const sortEmployees = tableHeading => {
            let Order = state.headings
                  .filter(elem => elem.name === tableHeading)
                  .map(elem => elem.order)
                  .toString();

            if (Order === "descend") {
                  Order = "ascend";
            } else {
                  Order = "descend";
            }

            const compareOrderFunction = (comaprisonValueA, comaprisonValueB) => {
                  if (Order === "ascend") {
                        if (comaprisonValueA[tableHeading] === undefined) {
                              return 1;
                        } else if (comaprisonValueB[tableHeading] === undefined) {
                              return -1;
                        }
                        else if (tableHeading === "name") {
                              return comaprisonValueA[tableHeading].first.localeCompare(comaprisonValueB[tableHeading]);
                        } else if (tableHeading === "dob") {
                              return comaprisonValueA[tableHeading].age - comaprisonValueB[tableHeading].age;
                        } else {
                              return comaprisonValueA[tableHeading].localeCompare(comaprisonValueB[tableHeading]);
                        }
                  } else {
                        if (comaprisonValueA[tableHeading] === undefined) {
                              return 1;
                        } else if (comaprisonValueB[tableHeading] === undefined) {
                              return -1;
                        }
                        else if (tableHeading === "name") {
                              return comaprisonValueB[tableHeading].first.localeCompare(comaprisonValueA[tableHeading].first);
                        } else if (tableHeading === "dob") {
                              return comaprisonValueB[tableHeading].age - comaprisonValueA[tableHeading].age;
                        } else {
                              return comaprisonValueB[tableHeading].localeCompare(comaprisonValueA[tableHeading]);
                        }
                  }
            }
            const orderedUsers = state.filteredUsersArray.sort(compareOrderFunction)
            console.log(orderedUsers)
            const updatedTableHeadings = state.headings.map((elem) => {
                  elem.order = elem.name === tableHeading ? Order : elem.order
                  return elem
            })
            setState({
                  ...state,
                  filteredUsersArray: orderedUsers,
                  headings: updatedTableHeadings
            })
      }

      const search = (event) => {
            const searchFilter = event.target.value

            // eslint-disable-next-line array-callback-return
            const filteredTable = state.users.filter((item) => {
                  let userNames = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase()
                  if (userNames.indexOf(searchFilter.toLowerCase()) !== -1) {
                        return item
                  }
            })

            setState({ ...state, filteredUsersArray: filteredTable })
      }

      useEffect(() => {
            API.getAllUsers().then((employees) => {
                  setState({
                        ...state,
                        users: employees.data.results,
                        filteredUsersArray: employees.data.results
                  })
            })
      }, [])
      return (
            <DataAreaContext.Provider value={{ state, search, sortEmployees }}>
                  <Nav />
                  <div className="data-area">
                        {state.filteredUsersArray.length > 0 ? <DataTable /> : <div>
                        </div>}
                  </div>
            </DataAreaContext.Provider>
      )
}

export default DataInsideTable