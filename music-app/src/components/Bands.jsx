/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Bands.css";
import Loading from "./Loading";
import { Button } from "react-bootstrap";
import dataImg from "../db/dataImg.json";
import { Animated } from "react-animated-css";
import { Link } from 'react-router-dom'
import  { IoArrowBackCircle } from 'react-icons/io5'
import Footer from './Footer'

const Bands = () => {
  const { id } = useParams();
  const [infoBands, setInfoBands] = useState([]);
  const [infoAlbums, setInfoAlbums] = useState([]);
  const [infoGenres, setInfoGenres] = useState([]);
  const [membersBand, setMembersBand] = useState([]);
  const [allData, setAllData] = useState(false);
  const [showBand, setShowBand] = useState(false);

  useEffect(() => {
    /*1st fetch*/
    const obtainDatas = async () => {
      const data = await fetch(
        `https://my-json-server.typicode.com/improvein/dev-challenge/bands/${id}`
      );

      const bands = await data.json();
      setInfoBands(bands);
    };

    /*2nd fetch*/
    const obtainMembers = async () => {
      const data = await fetch(
        `https://my-json-server.typicode.com/improvein/dev-challenge/bands/${id}`
      );

      const memb = await data.json();
      setMembersBand(memb.members);
      setAllData(true);
    };

    /*3rd fetch*/
    const obtainAlbums = async () => {
      const data = await fetch(
        `https://my-json-server.typicode.com/improvein/dev-challenge/db`
      );

      const album = await data.json();
      setInfoAlbums(album.albums);
    };

    /*4th fetch*/

    const obtainGenres = async () => {
      const data = await fetch(
        `https://my-json-server.typicode.com/improvein/dev-challenge/db`
      );

      const genres = await data.json();
      setInfoGenres(genres.genre);
    };

    obtainGenres([]);
    obtainAlbums([]);
    obtainDatas([]);
    obtainMembers([]);
    setShowBand();
  }, [id]);

  const showAlbums = () => {
    setShowBand(true);
    if (showBand === true) {
      document.getElementById("show-h3").textContent = "Hide Albums ⛔";
      document.getElementById("show-album").style.display = "block";
      setShowBand(false);
    } else if (showBand === false) {
      document.getElementById("show-h3").textContent = "Show Albums 👀";
      document.getElementById("show-album").style.display = "none";
    }
  };

  return (
    <div className="container-bands">
      {!allData ? (
        <Loading />
      ) : (
        <Animated animationIn="fadeIn">
          {" "}
          <div className="container-info">

            {dataImg.map((imgId) => {
              if (imgId.id === infoBands.id) {
                return (
                  <div className="img-container">
                    <img src={imgId.img} />
                  </div>
                );
              }
            })}

            <br />

            <div className="button-container">
              <Link id="button" to="/menu"><IoArrowBackCircle id="icon-back"/>Back</Link>
            </div>

            <h1>
              <b className="info-band">Number:</b> <br />
              {infoBands.id}
            </h1>
            <h1>
              {" "}
              <b className="info-band">Name: </b> <br />
              {infoBands.name}
            </h1>
            <h1>
              <b className="info-band">Year:</b> <br />
              {infoBands.year}
            </h1>
            <h1>
              <b className="info-band"> Country: </b> <br />
              {infoBands.country}
            </h1>
            <h1>
              <b className="info-band">Genre:</b>
              {infoGenres.map((genreId) => {
                if (genreId.code === infoBands.genreCode) {
                  return <h1 id="genre-name">{genreId.name}</h1>;
                }
              })}
            </h1>
            <br />

            <h1>{infoAlbums.map}</h1>
            <br />
            <div className="members">
              <h1 id="members-title">Members:</h1>
              <br />
              {membersBand.map((member) => (
                <h2>
                  <ul>
                    <li>{member.name}</li>
                  </ul>
                </h2>
              ))}
            </div>
            <br />

            <div className="info-album">
              <h1>
                <Button className="btn btn-dark" onClick={() => showAlbums()}>
                  <h3 id="show-h3">Show Albums 👀</h3>
                </Button>
                <br />
                <br />
                <div id="show-album" style={{ display: "none" }}>
                  <b id="album-title" className="info-band">
                    Albums:
                  </b>
                  {infoAlbums.map((albumId) => {
                    if (albumId.bandId === infoBands.id) {
                      return <h1 className="album-names">{albumId.name}</h1>;
                    }
                  })}
                  <br />
                </div>
              </h1>
            </div>
          </div>        
          <Footer/>
        </Animated>
      )}
    </div>
  );
};

export default Bands;
