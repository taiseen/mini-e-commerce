import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ProductDetails = () => {

  const { id } = useParams();

  return (
    <section className='container mx-auto py-4'>
      <h1>ProductDetails : {id}</h1>

      <Link to='/'>Back Home</Link>
    </section>
  )
}

export default ProductDetails