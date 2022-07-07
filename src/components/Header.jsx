import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onSearch, cartItemCount = 0 }) => {

  const [searchQuery, setSearchQuery] = useState('');


  //  live search for each key stock by user typing...
  useEffect(() => {
    if (searchQuery.trim().length) {
      onSearch(searchQuery.trim());
      console.log(searchQuery);
    } else {
      setSearchQuery('');
    }

  }, [searchQuery, onSearch])


  // const handleSearch = () => {
  //   if (searchQuery.trim().length) {
  //     onSearch(searchQuery.trim());
  //   } else {
  //     setSearchQuery('');
  //   }
  // }



  return (
    <header className='p-5 md:px-14 lg:px-24 bg-blue-400 flex flex-col gap-5 sm:flex-row flex-wrap justify-between items-center'>


      <Link to='/' className='text-xl hover:text-gray-600 duration-200'>Mini E-com</Link>


      <div className='relative w-full md:w-2/4 order-2 md:order-1'>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder='Search Your Product...'
          className='w-full px-3 py-2 rounded-lg outline-none'
        />
        {/* <button
          onClick={handleSearch}
          className='absolute top-1 right-1 bg-gray-200 p-1 px-3 rounded-md '>
          Search
        </button> */}
      </div>


      <Link to='/cart' className='relative order-1 md:order-2'>
        {
          cartItemCount > 0 && (
            <p className={`absolute top-[-20px] ${cartItemCount <= 9 ? 'right-[8px]' : 'right-[2px]'} text-white text-lg`}>
              {cartItemCount <= 9 ? cartItemCount : '9+'}
            </p>
          )
        }
        <img src="/cart.svg" className='w-8 h-8 text-gray-400' alt="" />
      </Link>

    </header>
  )
}

export default Header