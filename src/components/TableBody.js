import React, { useContext } from "react";
import "../styles/TableBody.css";
import DataAreaContext from "../utils/TableDataContext";

const DataBody = () => {
      const tableContext = useContext(DataAreaContext);

      function formatDate(date) {
            const dateArray = date.split("-");
            const year = dateArray[0];
            const month = dateArray[1];
            const dayArray = dateArray[2].split("T");
            const day = dayArray[0];
            const formattedDate = [month, day, year].join("/");
            return formattedDate;
      }

      return (
            <tbody>
                  {tableContext.state.filteredUsersArray[0] !== undefined && tableContext.state.filteredUsersArray[0].name !== undefined ? (
                        tableContext.state.filteredUsersArray.map(({ login, name, picture, phone, email, dob }) => {
                              return (
                                    <tr key={login.uuid}>
                                          <td data-th="Image" className="align-middle">
                                                <img
                                                      src={picture.medium}
                                                      alt={name.first + " " + name.last + "profile pic"}
                                                      className="img-responsive"
                                                />
                                          </td>
                                          <td data-th="Name" className="name-cell align-middle">
                                                {name.first} {name.last}
                                          </td>
                                          <td data-th="Phone Number" className="align-middle">
                                                {phone}
                                          </td>
                                          <td data-th="Email" className="align-middle">
                                                <a href={"mailto:" + email} target="__blank">
                                                      {email}
                                                </a>
                                          </td>
                                          <td data-th="Date of Birth" className="align-middle">
                                                {formatDate(dob.date)}
                                          </td>
                                    </tr>
                              );
                        })
                  ) : (
                              <></>
                        )}
            </tbody>
      );
}

export default DataBody;