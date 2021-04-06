/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";
import DataAreaContext from "../utils/DataAreaContext";

const Area = () => {
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

      const sortEmployees = heading => {
            let currentOrder = state.headings
                  .filter(elem => elem.name === heading)
                  .map(elem => elem.order)
                  .toString();

            if (currentOrder === "descend") {
                  currentOrder = "ascend";
            } else {
                  currentOrder = "descend";
            }

            const compareOrderFunction = (a, b) => {
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
            }
            const orderedUsers = state.filteredUsersArray.sort(compareOrderFunction)
            console.log(orderedUsers)
            const updatedHeadings = state.headings.map((elem) => {
                  elem.order = elem.name === heading ? currentOrder : elem.order
                  return elem
            })
            setState({
                  ...state,
                  filteredUsersArray: orderedUsers,
                  headings: updatedHeadings
            })
      }

      const search = (event) => {
            const filter = event.target.value

            // eslint-disable-next-line array-callback-return
            const filteredTable = state.users.filter((item) => {
                  let values = item.name.first.toLowerCase() + " " + item.name.last.toLowerCase()
                  if (values.indexOf(filter.toLowerCase()) !== -1) {
                        return item
                  }
            })

            setState({ ...state, filteredUsersArray: filteredTable })
      }

      useEffect(() => {
            API.getUsers().then((results) => {
                  setState({
                        ...state,
                        users: results.data.results,
                        filteredUsersArray: results.data.results
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

export default Area