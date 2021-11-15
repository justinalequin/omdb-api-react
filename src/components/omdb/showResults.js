import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

export class ShowClickedResult extends Component {
  state = {
    title: "",
    picture: "",
    year: "",
    rated: "",
    runtime: "",
    director: "",
    actors: "",
    plot: "",
    poster: "",
  };

  async componentDidMount() {
    try {
      let result = await axios.get(
        `http://www.omdbapi.com/?i=${this.props.match.params.imdbID}&type=movie&apikey=205a8ca&s`
      );

      console.log(result.data);

      this.setState({
        title: result.data.Title,
        year: result.data.Year,
        rated: result.data.Rated,
        runtime: result.data.Runtime,
        director: result.data.Director,
        actors: result.data.Actors,
        plot: result.data.Plot,
        poster: result.data.Poster,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1>Movies App</h1>
        <br></br>
        <hr></hr>
        <h2>{this.state.title}</h2>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Year: {this.state.year}</p>
          <p>Rated: {this.state.rated}</p>
          <p>Runtime: {this.state.runtime}</p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Director: {this.state.director}</p>
          <p>Actors: {this.state.actors}</p>
        </div>
        <img
          style={{ height: "50%", width: "50%", alignSelf: "center" }}
          src={this.state.poster}
        ></img>

        <div>
          <p>Plot: {this.state.plot}</p>
        </div>
      </div>
    );
  }
}

export default ShowClickedResult;
