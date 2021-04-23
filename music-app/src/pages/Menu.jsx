import React from "react";
import { Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import "../css/Menu.css";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ListBands from "../components/ListBands";
import { Animated } from "react-animated-css";
import Footer from '../components/Footer'

const cookies = new Cookies();

class Menu extends React.Component {
  state = {
    loading: false,
  };

  constructor() {
    super();
    this.state = {
      showmodalexit: false,
    };
  }

  handleModalLogOut() {
    this.setState({ showmodalexit: !this.state.showmodalexit });
  }

  logOutSession = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("last_name", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("username", { path: "/" });
    this.handleModalLogOut();
  };

  componentDidMount() {
    if (!cookies.get("username")) {
      window.location.href = "./";
    }
  }

  render() {
    console.log("id" + cookies.get("id"));
    console.log("last_name" + cookies.get("last_name"));
    console.log("name" + cookies.get("id"));
    console.log("username" + cookies.get("id"));

    return (
      <div className="container-all">
        <Modal show={this.state.showmodalexit}>
          <Modal.Header>Thanks!, See you soon</Modal.Header>
          <Modal.Body>Please click on the button to continue.</Modal.Body>
          <Modal.Footer />
          <Button
            className="btn btn-success"
            style={{ borderRadius: "0%" }}
            onClick={() => {
              this.handleModalLogOut();
            }}
          >
            <Link className="link" to="/">
              Continue
            </Link>
          </Button>
        </Modal>

        <div>
          <Animated animationIn="bounceInLeft">
            <h1 className="title-menu">Rock Bands ! 🤘🏻</h1>
          </Animated>
        </div>
        <div>
          <ListBands />
        </div>
        <div>
          <Button
            onClick={() => this.logOutSession()}
            className="btn btn-danger logout-btn"
          >
            Logout ❌
          </Button>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Menu;
