import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { All_AUTHORS, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const result = useQuery(All_AUTHORS, {
    pollInterval: 1000
  })
  const books = useQuery(ALL_BOOKS, {
    pollInterval: 1000
  })

  console.log('books:', books)

  if(result.loading && books.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={result.data.allAuthors}/>

      <Books show={page === 'books'} books={books.data.allBooks}/>

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App