import './App.css'
import { useMovies } from './hooks/useMovies.js';
import {Movies} from './components/Movies.jsx'

import { useState, useEffect ,useRef, useCallback} from 'react';
import debounce from 'just-debounce-it';

function useSearch() {
  const [search, updateSearch ] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)



  useEffect(()=>{
    if (isFirstInput.current) {
      isFirstInput.current= search === ''
      return
      
    }
    if(search === '') {
    setError('ingrese mas datos')
    return
   }
    if(search.match(/\d+$/)){
     setError('no se puede buscar con numero')
     return
   }
    if (search.length < 3) {
      setError('faltan caracteres')
      return
    }
    setError(null)
   },[search])
   return { search, updateSearch, error}
}


function App() {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error} = useSearch()
  const {movies,loading, getMovies } = useMovies({search, sort})
  
  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 300)
    , [getMovies]
  )
  const shiftSubmmit= (event) => {
     event.preventDefault()
      getMovies({search})
  }
  const handleSort = () => {
    setSort(!sort)
  }
   const shiftChange = (event)=> {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }


 


  return (
    <div className='page' >

      <header className='header-peli'>
        <h1 className='header-h1'>Buscador de peliculas</h1>
        <form className='form' onSubmit={shiftSubmmit} >
          <input onChange={shiftChange} value={search} name='query'  placeholder='Avengers, Star Wars' type="text" />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit' className='boton-submit'>Buscar</button>
        </form>
        {error && <p className='error'>{error}</p>}
      </header>

       <main>
        {
          loading ? <div className="loader"></div> :<Movies movies={movies}/>
        }
        
       </main>
    </div>
  )
}

export default App
