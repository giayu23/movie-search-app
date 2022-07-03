import React, {useState} from "react"
import MovieCard from "./MovieCard"

function SearchMovie() {

  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])

  const searchMovies = async (e) => {
    e.preventDefault();


    const url = `https://api.themoviedb.org/3/search/movie?api_key=6953f94bc09ae1adbd47e25142d8f1e2&language=en-US&query=${query}&page=1&include_adult=false`

    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        setMovies(data.results)
    } catch(err) {
      console.log(err)
    }
  }



  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query"></label>
        <input 
          className="input" 
          type="text" 
          name="query" 
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">Search</button>
      </form>
      <div className="card--list">
        {movies.filter(movie => movie.poster_path).map(movie => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </>
  )
}

export default SearchMovie