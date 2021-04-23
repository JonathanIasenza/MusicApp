/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../css/Login.css";
import Image from "../images/music-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import { Button, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Url from "../config/Url";
import { Animated } from "react-animated-css";

const cookies = new Cookies();
var nameLogin = "";
var lastNameLogin = "";

class Login extends React.Component {
  state = {
    form: {
      username: "",
      password: "",
    },
  };

  constructor() {
    super();
    this.state = {
      showmodal: false,
      showalert: false,
    };
  }

  handleModalSuccess() {
    this.setState({ showmodal: !this.state.showmodal });
  }

  handleChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  notFound = () => {
    this.setState({ showalert: !this.state.showalert });
  };

  notFound2 = () => {
    this.setState({ showalert: !this.state.showalert });
  };

  logIn = async () => {
    await axios
      .get(Url, {
        params: {
          username: this.state.form.username,
          password: md5(this.state.form.password),
        },
      })

      .then((response) => {
        return response.data;
      })

      .then((response) => {
        if (response.length > 0) {
          var answer = response[0];
          cookies.set("id", answer.id, { path: "/" });
          cookies.set("last_name", answer.last_name, { path: "/" });
          cookies.set("name", answer.name, { path: "/" });
          cookies.set("username", answer.username, { path: "/" });
          nameLogin = answer.name;
          lastNameLogin = answer.last_name;

          this.handleModalSuccess();
          document.getElementById("username-input").style.backgroundColor =
            "#66FF66";
          document.getElementById("username-input").style.color = "#000";
          document.getElementById("password-input").style.backgroundColor =
            "#66FF66";
          document.getElementById("password-input").style.color = "#000";
          document.getElementById("failed").style.display = "none";
        } else {
          document.getElementById("username-input").style.backgroundColor =
            "#FF3333";
          document.getElementById("username-input").style.color = "#FFF";
          document.getElementById("password-input").style.backgroundColor =
            "#FF3333";
          document.getElementById("password-input").style.color = "#FFF";
          document.getElementById("failed").style.display = "block";
        }
      })

      .catch((error) => {
        return error;
      });
  };

  componentDidMount() {
    if (cookies.get("username")) {
      window.location.href = "./menu";
    }
  }

  render() {
    return (
      <div className="container">
        <div className="alert-container">
          <Alert show={this.state.showalert} variant="danger">
            <p>
              I'd love to be able to help you with the registration, but it's
              just a JSON 😞
              <button
                id="btn-notfound"
                onClick={this.notFound2}
                variant="outline-danger"
              >
                X
              </button>
            </p>
          </Alert>
        </div>
        <Modal show={this.state.showmodal}>
          <Modal.Header>
            Welcome {nameLogin} {lastNameLogin} !
          </Modal.Header>
          <Modal.Body>Please click on the button to continue.</Modal.Body>
          <Modal.Footer />
          <Button className="btn btn-success" style={{ borderRadius: "0%" }}>
            <Link className="link" to="/menu">
              Continue
            </Link>
          </Button>
        </Modal>

        <Animated
          animationIn="fadeIn"
          animationInDuration={1000}
          animationOut="fadeOut"
          isVisible={true}
        >
          {" "}
          <img
            className="rock-app-op"
            src="https://seeklogo.com/images/R/ROCK-logo-D0BA9F5980-seeklogo.com.png"
          />
          <div className="image-logo">
            <img id="music-logo" src={Image}></img>
          </div>{" "}
          <div className="principal">
            <div className="secondary">
              <div className="form-group">
                <label>Username: </label>
                <input
                  name="username"
                  id="username-input"
                  required="required"
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                />

                <br />

                <label>Password: </label>
                <input
                  name="password"
                  id="password-input"
                  required="required"
                  onChange={this.handleChange}
                  type="password"
                  className="form-control"
                />

                <br />

                <p id="failed" style={{ display: "none" }}>
                  Username or password are invalids.
                </p>

                <Button
                  onClick={() => this.logIn()}
                  className="btn btn-light login-button"
                >
                  {" "}
                  Login ✔
                </Button>

                <Button
                  onClick={() => this.notFound()}
                  className="btn btn-danger"
                >
                  {" "}
                  Register
                </Button>
              </div>
            </div>
          </div>
        </Animated>
      </div>
    );
  }
}

export default Login;
