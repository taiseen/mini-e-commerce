import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='bg-green-500 w-full h-60 flex items-center justify-center gap-4 text-xl'>
      <span>4O4 | NotFound</span>

      <Link to='/' className='underline'>Back Home</Link>
    </div>
  )
}

export default NotFound