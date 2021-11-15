import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Omdb from "./Omdb";

function OmdbDetail({ resultsArray }) {
  return (
    <div>
      {resultsArray.map(
        ({ data: { Title, Poster, imdbRating, imdbID } }, index) => {
          return (
            <div
              style={{ border: "solid black 2px", paddingBottom: "20px" }}
              key={imdbID}
            >
              <h1>{Title}</h1>

              <h3>IMDB RATING: {imdbRating}</h3>
              <Link to={`/fetch-movie/${imdbID}`}>
                <img src={Poster} />
              </Link>
            </div>

            // <li key={title}>
            //     Movie {index + 1}: {title}
            // </li>
          );
        }
      )}
    </div>
  );
}

OmdbDetail.propTypes = {
  resultsArray: PropTypes.array,
};

export default OmdbDetail;
