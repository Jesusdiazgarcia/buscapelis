export function ListOfMovies({movies}) {
    return(
      <ul className="movies">
     {
              movies.map(movie => (
                <li className="movie" key={movie.id}>
                    <img src={movie.poster} alt={movie.title} />
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                  
                </li>
                ))

        }
     </ul>
      )
  }
 export function NoResults() {
    return(
      <p>no se encontraron peliculas</p>
      )
  }
  export function Movies({movies}) {
    
    const hasMovies =movies?.length > 0
    return(
        hasMovies
            ?<ListOfMovies movies={movies}/>
            :<NoResults/>
          
        )
  }