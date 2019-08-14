import React, { useState, useEffect } from 'react';
import axios from 'axios'


export default function App() {
  const [result, setResults] = useState([])

  useEffect(() => {
    getResult()
    
    
  }, [])

  const getResult = async () => {
    const res = await axios.get('http://hn.algolia.com/api/v1/search?query=reacthooks')
    setResults(res.data.hits)
  }

  return (
    <>
    <ul>
      {result.map(result => (
        <li key={result.objectID}>
        <a href={result.url}>{result.title}</a>
      </li>
      ))}
    </ul>
    
    </>
  )
}