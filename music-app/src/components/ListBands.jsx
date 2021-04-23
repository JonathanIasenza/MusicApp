import React from "react";
import TableBands from "./TableBands";
import Loading from "./Loading";
import "bootstrap/dist/css/bootstrap.min.css";
import { Animated } from "react-animated-css";

class ListBands extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      allData: true,
      direction: {
        id: "asc",
        year: "asc",
        name: "asc",
      },
    };

    this.sortBy = this.sortBy.bind(this);
  }

  sortBy(key) {
    this.setState({
      data: this.state.data.sort((a, b) =>
        this.state.direction[key] === "asc"
          ? parseInt(a[key]) - parseInt(b[key])
          : parseInt(b[key]) - parseInt(a[key])
      ),
      direction: {
        [key]: this.state.direction[key] === "asc" ? "desc" : "asc",
      },
    });
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchData = async () => {
    let res = await fetch(
      "https://my-json-server.typicode.com/improvein/dev-challenge/bands"
    );
    let data = await res.json();
    this.setState({
      data,
    });

    this.setState({
      allData: false,
    });
  };

  render() {
    return (
      <div className="container-list">
        <div id="bands-title">
          <Animated animationIn="bounceInRight">
            <p>
              Total Bands:{" "}
              <b style={{ color: "#f91" }}>{this.state.data.length}</b>
            </p>
          </Animated>
        </div>

      
          {this.state.allData ? (
            <Loading />
          ) : (
            <Animated animationIn="fadeInUp">  <div className="list-bands">
            <TableBands data={this.state.data} sortBy={this.sortBy} />
            </div>
            <br/>
            </Animated>
          )}
      </div>
    );
  }
}

export default ListBands;
