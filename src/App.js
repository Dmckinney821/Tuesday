import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'


export default function App() {
  const [result, setResults] = useState([])

  const [query, setQuery] = useState('react hooks')
  const [loading, setLoading] = useState(false)
  const searchInputRef = useRef()
  const [error, setError] = useState(null)


  useEffect(() => {
    getResult()
    
    
  }, [])

  const getResult = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`)
      setResults(res.data.hits)
    } catch (err) {
        setError(err)
    }
    
    setLoading(false)
  }

  const handleSearch = e => {
    e.preventDefault()
    getResult();
  }

  const handleClearSearch = e => {
    setQuery('')
    searchInputRef.current.focus()
  }

  return (
    <div className='conatiner max-w-md mx-auto p-4 m-2 bg-purple-lightest shadow-lg rounded'>
    <h1 className=' text-grey-darkest font-thin'>Hooks News</h1>
    <form onSubmit={handleSearch} className='mb-2'>
    <input 
    type='text' 
    value={query}
    onChange={e => setQuery(e.target.value)}
    ref={searchInputRef}
    className='border p-1 rounded'/>

    <button type='submit' className='bg-orange rounded m-1 p-1'>
      Search
    </button>
    <button type='button' onClick={handleClearSearch} className='bg-teal text-white p-1 rounded'>Clear</button>
    </form>
    { loading ? (
      <div className='font-bold text-orange-dark'>Loading results ...</div>
    ) : (
      <ul className='list-reset'>
      {result.map(result => (
        <li className='text-indigo-dark hover:texts-indigo-darkest' key={result.objectID}>
        <a href={result.url}>{result.title}</a>
      </li>
      ))}
    </ul>
    )}
    {error && <div className='text-red font-bold'>{error.message}</div>}
    </div>
  )
}