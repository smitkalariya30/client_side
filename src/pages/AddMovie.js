import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { clearStorage, setHeader } from "./Utils";

function AddMovie() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useForm({
    defaultValues: {
      checkbox: false,
    },
  });
  const onAddMovieDetailSubmit = async (values) => {
    try {
      console.log(values);
      setHeader(localStorage.getItem("token"));
      await axios.post("http://localhost:8080/movie", values);
      navigate("/");
    } catch (error) {
      console.log(error);
      clearStorage();
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!(localStorage.getItem("role") === "admin")) {
      navigate("/");
    }
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  const onBack = async () => {
    navigate("/");
  };

  return (
    <>
      <form className="App1" onSubmit={handleSubmit(onAddMovieDetailSubmit)}>
        <h3 className="title">Add Movies</h3>
        <label htmlFor="title">Movie Title : &nbsp;</label>
        <input
          type="text"
          {...register("title", {
            required: true,
            minLength: 3,
            maxLength: 100,
          })}
        />
        <p>
          {errors.title && (
            <span style={{ color: "red" }}>
              title is mandatory, must be length between 3-100{" "}
            </span>
          )}
        </p>

        <label htmlFor="description">Description : &nbsp;</label>
        <textarea
          type="text"
          {...register("description", {
            required: true,
            minLength: 3,
            maxLength: 5000,
          })}
        />
        <p>
          {errors.description && (
            <span style={{ color: "red" }}>
              description is mandatory, must be length between 3-5000{" "}
            </span>
          )}
        </p>

        <label htmlFor="poster_api">Poster_API : &nbsp;</label>
        <input
          type="text"
          {...register("poster_api", {
            required: true,
          })}
        />
        <p>
          {errors.poster_api && (
            <span style={{ color: "red" }}>poster_api is mandatory</span>
          )}
        </p>

        <label htmlFor="movie_type">Movie Type : &nbsp;</label>
        <input
          type="text"
          {...register("movie_type", {
            required: true,
            minLength: 4,
            maxLength: 50,
          })}
        />
        <p>
          {errors.movie_type && (
            <span style={{ color: "red" }}>
              Movie type is mandatory must be length between 4-50{" "}
            </span>
          )}
        </p>
        <div>
          <label htmlFor="is_released">Is_Released ? &nbsp;</label>
          <input type="checkbox" {...register("is_released")}></input>
        </div>
        <input type="submit" className="btn btn-primary" value="Add" />
        <div className="mt-2">
          <a className="pointer-link" onClick={() => onBack()}>
            &#60;- Back
          </a>
        </div>
      </form>
    </>
  );
}
export default AddMovie;
