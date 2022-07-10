import { useProductContext } from '../context/ProductContext';
import { Item, Spinner } from './../components';


const Products = () => {


  const { loading, searchQuery, allProducts, addToCart } = useProductContext();


  // If no search 🔎 result found...
  if (!loading && searchQuery && !allProducts.length) {
    return (
      <div className=''>
        <p className='mt-12 p-3 bg-white rounded-md shadow-xl text-red-500 w-fit mx-auto'>
          No Product found by matching your query</p>
      </div>
    )
  }



  if (loading) return  <div className='min-h-screen'> <Spinner /> </div> 


  
  return (
    <section className='p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center'>
      {
        allProducts?.map(data =>
          <Item
            data={data}
            key={data.id}
            addToCart={addToCart}
          />
        )
      }
    </section>
  )
}

export default Products