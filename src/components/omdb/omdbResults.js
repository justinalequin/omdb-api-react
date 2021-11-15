import axios from "axios";
import React, { Component } from "react";
import showSearchResult from "./showResults";
export class omdbResults extends Component {
  state = {
    title: "",
    poster: "",
    isLoading: false,
    imdbRating: "",
    imdbID: "",
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    console.log(this.props);
    try {
      let payload = await axios.get(
        `http://www.omdbapi.com/?i=${search}&apikey=205a8ca&s`
      );

      this.setState({
        title: payload.data.Title,
        poseter: payload.data.Poster,
        imdbRating: payload.data.imdbRating,
        imdbID: payload.data.imdbID,
        isError: false,
        errorMessage: "",
        isLoading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        {this.state.isLoading ? (
          <div>...loading</div>
        ) : (
          <showSearchResult
            Title={this.state.title}
            Poster={this.state.poster}
            imdbRating={this.state.imdbRating}
          />
        )}
      </div>
    );
  }
}

export default MainPokemonDetail;
