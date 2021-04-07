/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
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
                  .filter((element) => element.name === tableHeading)
                  .map((element) => element.order)
                  .toString();

            if (Order === "descend") {
                  Order = "ascend";
            } else {
                  Order = "descend";
            }

            const compareOrder = (comaprisonValueA, comaprisonValueB) => {
                  switch (true) {
                        case (Order === "ascend"):
                              switch (true) {
                                    case (comaprisonValueA[tableHeading] === undefined):
                                          return 1
                                    case (comaprisonValueB[tableHeading] === undefined):
                                          return -1
                                    case (tableHeading === "name"):
                                          return comaprisonValueA[tableHeading].first.localeCompare(comaprisonValueB[tableHeading].first)
                                    case (tableHeading === "dob"):
                                          return comaprisonValueA[tableHeading].age - comaprisonValueB[tableHeading].age;
                                    default:
                                          return comaprisonValueA[tableHeading].localeCompare(comaprisonValueB[tableHeading])
                              }
                        default:
                              switch (true) {
                                    case (comaprisonValueA[tableHeading] === undefined):
                                          return 1
                                    case (comaprisonValueB[tableHeading] === undefined):
                                          return -1
                                    case (tableHeading === "name"):
                                          return comaprisonValueB[tableHeading].first.localeCompare(comaprisonValueA[tableHeading].first)
                                    case (tableHeading === "dob"):
                                          return comaprisonValueB[tableHeading].age - comaprisonValueA[tableHeading].age
                                    default:
                                          return comaprisonValueB[tableHeading].localeCompare(comaprisonValueA[tableHeading])

                              }



                  }
            }
            const orderedUsers = state.filteredUsersArray.sort(compareOrder)
            console.log(orderedUsers)
            const updatedTableHeadings = state.headings.map((element) => {
                  element.order = element.name === tableHeading ? Order : element.order
                  return element
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