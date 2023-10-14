import { useState, useEffect, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'

function App() {

  const searchInput = useRef(null)
  const IMAGES_PER_PAGE = 20
  const API_URL = "https://api.unsplash.com/search/photos"

  const [images, setImages] = useState([])
  const [pages, setPages] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {

    fetchImages()

  }, [pages])

  const fetchImages = async () => {

    try {

      const { data } = await axios.get
        (`${API_URL}?query=${searchInput.current.value}&page=${pages}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`)

      setImages(data.results)
      setTotalPages(data.total_pages)
    }

    catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(searchInput.current.value)
    fetchImages()
    setPages(1)
  }

  const handleSelection = (selection) => {
    searchInput.current.value = selection
    fetchImages()
    setPages(1)
  }

  return (
    <div className='container'>

      <h1 className='title'>Image Search</h1>

      <div className='search-section'>

        <form onSubmit={handleSubmit}>
          <Form.Control
            className='search-input'
            required
            type="search"
            placeholder="Type somenthing to search..."
            ref={searchInput}
          />
        </form>

      </div>

      <div className='filters'>

        <div onClick={() => handleSelection('nature')} > Nature </div>
        <div onClick={() => handleSelection('birds')} >Birds</div>
        <div onClick={() => handleSelection('cats')} > Cats</div>
        <div onClick={() => handleSelection('shoes')} >Shoes</div>

      </div>

      <div className='images'>

        {images.map((img) => {
          return (
            <img className='image'
              key={img.id}
              src={img.urls.small}
              alt={img.alt_description}>

            </img>
          )
        })

        }

      </div>

      <div className='buttons'>

        {pages > 1 && (<Button onClick={() => setPages(pages - 1)}>Previous</Button>)}
        {pages < totalPages && (<Button onClick={() => setPages(pages + 1)}>Next</Button>)}

      </div>

    </div>
  )
}

export default App
