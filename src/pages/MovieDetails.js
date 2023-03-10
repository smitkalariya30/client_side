import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Header from "../component/Layout.js/Header";
import Footer from "../component/Layout.js/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setHeader } from "./Utils";
import { message } from "antd";
import { color, padding } from "@mui/system";
import moment from "moment/moment";

const MovieDetails = () => {
  const currentdate = new Date().toISOString();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [moviedata, setMovieData] = useState(null);
  var { title } = useParams();
  useEffect(() => {
    getMovieRecord();

    // if (!localStorage.getItem("title")) {
    //   navigate("/");
    // }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const getMovieRecord = async () => {
    const movieDetails = await (
      await axios.get(`/movie?title=${title}`)
    ).data.successMessage[0];
    console.log(movieDetails);
    setMovieData(movieDetails);
  };
  const onDeleteButton = async () => {
    setHeader(localStorage.getItem("token"));
    try {
      await axios.delete(`/movie/${moviedata.title}`);

      navigate(-1);
    } catch (error) {
      console.log(error);
      if (error.response.status === 501) {
        message.error(error.response.data.errorMessage);
      }
      //localStorage.clear();
      else {
        localStorage.removeItem("title");
        navigate("/");
      }
    }
  };

  const onEditButton = async () => {
    navigate(`/edit/${moviedata.title}`);
  };

  const onBack = async () => {
    localStorage.removeItem("title");
    navigate("/");
  };

  const onBookShow = async () => {
    console.log(moviedata._id);
    navigate(`/bookshow/${moviedata.title}/${currentdate}`);
  };
  const onAddShow = async () => {
    navigate(`/addshow/${moviedata.title}`);
  };

  return (
    moviedata && (
      <>
        <Header />
        <body>
          <div id="layout" className="container mt-5">
            <div className="mb-3">
              <button
                className="btn btn-primary pointer-link"
                onClick={() => onBack()}
              >
                &#60;- Back
              </button>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div>
                  <img
                    id="image"
                    src={moviedata.poster_api}
                    alt="image not avaliable"
                  />
                </div>
              </div>
              <div className="col-md-9">
                <h4>{moviedata.title}</h4>
                <span>
                  <span style={{ fontSize: "22px", fontWeight: "18px" }}>
                    <bold>About the Movie :</bold>{" "}
                  </span>
                  <span style={{ fontSize: "18px" }}>
                    {moviedata.description}
                  </span>
                </span>

                <div className="mt-4 mb-1">
                  <span
                    className="p-2 mr-2"
                    style={{
                      fontSize: "16px",
                      backgroundColor: "lightgray",
                      borderRadius: "3px",
                    }}
                  >
                    {moviedata.format + " "}
                  </span>{" "}
                  <span
                    className="p-2"
                    style={{
                      fontSize: "16px",
                      backgroundColor: "lightgray",
                      borderRadius: "3px",
                    }}
                  >
                    {moviedata.language + " "}
                  </span>
                </div>

                <div className="mt-3 mb-2">
                  <span className="mr-1" style={{ fontSize: "16px" }}>
                    {moviedata.hour}h {moviedata.minute}m{" "}
                  </span>
                  <span
                    className="mr-1"
                    style={{ paddingBottom: "1px", fontSize: "20px" }}
                  >
                    ???
                  </span>{" "}
                  <span style={{ fontSize: "16px" }} className="mr-1">
                    {moviedata.movie_type}
                  </span>
                  <span
                    className="mr-1"
                    style={{ paddingBottom: "1px", fontSize: "20px" }}
                  >
                    ???
                  </span>{" "}
                  <span style={{ fontSize: "16px" }}>
                    {moment(moviedata.date).format("ll")}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary mr-2"
                  onClick={() => onBookShow()}
                >
                  Book Show
                </button>
                {role === "admin" && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onAddShow()}
                  >
                    Add Show
                  </button>
                )}
              </div>
            </div>
            {role === "admin" && (
              <div className="row mt-3">
                <div className="col-md-1">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onEditButton()}
                  >
                    Edit
                  </button>
                </div>
                <div className="col-md-3">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you Really want to delete this movie?"
                      );
                      if (confirmBox === true) {
                        onDeleteButton();
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </body>
        <Footer />
      </>
    )
  );
};

export default MovieDetails;
