import React, { Component } from 'react'
import axios from "axios";
import OmdbDetail from './OmdbDetail'
export class Omdb extends Component{

    state = {
        imdbID:"",
        title: "",
        rating:"",
        poster: "",
        search: "",
        isLoading: false,
        eightMovieArray: ['batman', 'superman', 'terminator', 'lord of the rings', 'star wars', 'pokemon', 'harry potter', 'avengers' ],
        resultsArray: [],
        
    }

    checkForDuplicates = (resultsArray) => {
      let idCheckArray = resultsArray.map(function(item){return item.data.imdbID})
      let isDuplicate = idCheckArray.some(function(item, idx){
        return idCheckArray.indexOf(item) != idx
      });
      let filteredResults  

      if(!isDuplicate){
        return resultsArray
      }

      if (isDuplicate){
         filteredResults = resultsArray.reduce((unique, o) => {
          if(!unique.some(obj => obj.data.imdbID === o.data.imdbID)){
            unique.push(o)
          }
          return unique;
        }, []);
        console.log(filteredResults)
        console.log(idCheckArray)
        console.log(resultsArray)



        // this.setState({
        //   resultsArray: filteredResults
        // })
      }
      return filteredResults
     

    }

    componentDidMount = async () => {
      let randomMovie = this.state.eightMovieArray[Math.floor(Math.random() * this.state.eightMovieArray.length)];
      try {
        let payload = await axios.get(
          `http://omdbapi.com/?apikey=205a8ca&s&s=${randomMovie}`
        );
  
        console.log(payload.data.Search);
  
        let movieIdArray = payload.data.Search.map((item) => item.imdbID);
  
        let promiseMovieArray = movieIdArray.map(async (item) => {
          return await axios.get(`http://omdbapi.com/?apikey=205a8ca&s&i=${item}`);
        });
  
        console.log(promiseMovieArray);
  
        Promise.all(promiseMovieArray)
          .then((result) => {
            console.log(result);

            let newFilteredResults = this.checkForDuplicates(result)
            console.log(this.checkForDuplicates(result))
 
             console.log(newFilteredResults)

            this.setState({
              resultsArray: newFilteredResults
            })

          })
          .catch((e) => {
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    };

   

   
fetchOmdbApi = async (search) => {

    this.setState({
        isLoading: true,
    })

    try {
        let result = await axios.get(
          `http://www.omdbapi.com/?s=${search}&apikey=205a8ca&s`
        );
        let movieIdArray = result.data.Search.map((item) => item.imdbID);

        let promiseMovieArray = movieIdArray.map(async (item) => {
          return await axios.get(`http://omdbapi.com/?apikey=205a8ca&s&i=${item}`);
        });

         
        console.log(promiseMovieArray);
  
        Promise.all(promiseMovieArray)
          .then((result) => {
            console.log(result);

           let newFilteredResults = this.checkForDuplicates(result)
           console.log(this.checkForDuplicates(result))

            console.log(newFilteredResults)

            this.setState({
              resultsArray: newFilteredResults
            } , () => {
          console.log(movieIdArray)
          console.log(this.state.resultsArray)
          

            })

          })
          .catch((e) => {
            console.log(e);
          });

       
      } catch (e) {
        console.log(e.response);
              }
        }


handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      isLoading: false,
    });
  };

  handleOnClick = async () => {
      this.fetchOmdbApi(this.state.search);
      console.log(this.state.search)
       this.setState({
        isLoading: true,
      })
  }

render() {
    return (
        <>

        <div>
<input 
name="search"
value={this.state.search}
onChange={this.handleOnChange}
/>
<button onClick={this.handleOnClick}>SEARCH</button>
        </div>

       <hr />
    
    <div>

<OmdbDetail
resultsArray={this.state.resultsArray}
/>

    </div>
      

        </>
    )
}

}


export default Omdb