import { useSearchParams } from 'react-router-dom'
import { Item, Spinner } from './../components';
import { useEffect, useState } from 'react'
import FakeStoreApi from './../api/fakeStoreApi';
import { useProductContext } from '../context/ProductContext';


const Products = () => {

  // const [query, setQuery] = useSearchParams();
  // const [loading, setLoading] = useState(true);
  // const [allProducts, setAllProducts] = useState([]);
  // const searchQuery = query.get('search');


  // useEffect(() => {

  //   const fetchProducts = async () => {
  //     setLoading(true);

  //     const allLocalStorageProduct = JSON.parse(localStorage.getItem('allProducts'));

  //     if (allLocalStorageProduct) {
  //       setAllProducts(allLocalStorageProduct);
  //     } else {
  //       const products = searchQuery
  //         ? await FakeStoreApi.fetchProductBySearch(searchQuery)
  //         : await FakeStoreApi.fetchAllProduct()

  //       setAllProducts(products);
  //       localStorage.setItem('allProducts', JSON.stringify(products))
  //     }

  //     setLoading(false);
  //   }

  //   fetchProducts().catch(console.error);
  // }, [searchQuery]);

  
  const { loading, searchQuery, allProducts } = useProductContext();


  // If no search 🔎 result found...
  if (!loading && searchQuery && !allProducts.length) {
    return (
      <div className=''>
        <p className='mt-12 p-3 bg-white rounded-md shadow-xl text-red-500 w-fit mx-auto'>
          No Product found by matching your query</p>
      </div>
    )
  }


  if (loading) return <Spinner />


  return (
    <section className='p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center'>
      {
        allProducts?.map(data =>
          <Item
            data={data}
            key={data.id}
            addToCart={() => { }}
          />
        )
      }
    </section>
  )
}

export default Products