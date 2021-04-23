import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleDown } from "react-icons/fa";
import "../css/ListBands.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

function TableBands(props) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="search-container">
        <Form id="search">
          <Form.Group>
            <Form.Control
              type="search"
              placeholder="Search by band..🔍"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
            <br />
          </Form.Group>
        </Form>
      </div>

      <Table id="table-data" striped bordered hover variant="dark">
        <thead>
          <tr id="first-tr">
            <th id="th-second">
              ID
              <button id="btn-circle" onClick={() => props.sortBy("id")}>
                <FaArrowCircleDown id="icon-circle" color="#fff" />
              </button>
            </th>
            <th>Name</th>
            <th id="th-second">
              Year
              <button id="btn-circle" onClick={() => props.sortBy("year")}>
                <FaArrowCircleDown id="icon-circle" color="#fff" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          
          {props.data
            .filter((item) => {
              if (searchTerm === "") {
                return item;
              } else if (
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return item;
              } else {
                return null;
              }
            })
            .map((item) => (
              <tr>
                <td>{item.id}</td>
                <td>
                  {item.name}
                  <Link to={`/menu/${item.id}`}>
                    <button className="btn-show">
                      <FaArrowCircleRight size="1em" />
                    </button>
                  </Link>
                </td>
                <td>{item.year}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default TableBands;
