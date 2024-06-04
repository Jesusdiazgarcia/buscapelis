import { useRef } from 'react'
import { useState, useMemo} from 'react'
import { searchMovies } from '../services/movies.js'



export function useMovies({search, sort}) {
    const [movies, setMovies] = useState ([])
    const [loading, setLoading] = useState (false)
    const [error,setError] = useState(null)
    const previousSearch = useRef(search)

    const getMovies = useMemo(() =>{
      return async({ search }) =>{

     
      if(search == previousSearch.current) return
      
      try {
       setLoading(true)
       setError(null)
       previousSearch.current = search
       const newMovies = await searchMovies({ search })
       setMovies(newMovies)
      } catch(e){
        setError(e.message)
      } finally{
        setLoading(false)
      }
    }
  }, [])
    // const getSortedMovies = () => {
   
    // console.log('getSortedMovies')
    // const sortedMovies = sort
    // ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    // : movies;
    //   return sortedMovies
    // }
  
    const sortedMovies = useMemo(() =>{
    
      return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies;
    },[sort, movies])

    return  { movies: sortedMovies, getMovies, loading}
  }
  