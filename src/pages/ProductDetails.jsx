import { useProductContext } from '../context/ProductContext';
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Item, Spinner } from '../components';
import FakeStoreApi from '../api/fakeStoreApi';


const ProductDetails = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [productInfo, setProductInfo] = useState({});
  const { allProducts, addToCart } = useProductContext();


  useEffect(() => {

    const fetchProducts = async () => {
      setLoading(true);

      const localStorageProduct = JSON.parse(localStorage.getItem(`id-${id}`));

      if (localStorageProduct) {
        setProductInfo(localStorageProduct);
      } else {
        const product = await FakeStoreApi.fetchProductById(id);
        setProductInfo(product);
        localStorage.setItem(`id-${id}`, JSON.stringify(product));
      }

      setLoading(false);
    }

    fetchProducts().catch(console.error);
  }, [id]);





  if (!loading && !productInfo) {
    return (
      <div className='container mx-auto p-4 '>
        <p className='p-4 bg-white rounded-md w-fit mx-auto text-center mt-8'>
          Product Not Found <br />
          Please visit <Link to='/' className='font-bold text-orange-600 underline underline-offset-2'>home</Link> to see all available products.
        </p>
      </div>
    )
  }



  // if (loading) return <Spinner />
  if (loading) return  <div className='h-[90vh] pt-24'> <Spinner /> </div> 



  return (
    <section className='container mx-auto py-4'>

      <div className='mx-4 p-4 mt-4 lg:mx-auto bg-white rounded-md shadow-lg flex items-center flex-col lg:flex-row gap-4  lg:w-3/4 '>

        <img src={productInfo?.image} alt="" className='w-72 h-80 ml-4' />

        <div className='lg:pl-6 pt-4 text-gray-700 flex-auto'>
          <p className='text-xl pb-4 text-blue-700 font-bold'>{productInfo?.title}</p>

          <p className='text-lg'>{productInfo?.description}</p>

          <div className='py-4 text-lg '>
            <p>Ratting : <strong>{productInfo?.rating?.rate}</strong> </p>
            <p>Total : <strong>{productInfo?.rating?.count}</strong></p>
          </div>


          <div className='flex items-center w-full  justify-between'>
            <span className='text-blue-700 text-xl font-bold'>${productInfo?.price}</span>

            <img src="/cart.svg" alt="cart" 
            className='w-10 h-10 bg-gray-200 rounded-lg p-2 border hover:border-blue-500 duration-200 cursor-pointer' 
            onClick={() => addToCart(productInfo)}
            />
          </div>


        </div>
      </div>


      <h2 className='bg-red-300 text-gray-800 p-4 mx-auto mt-12 w-[220px] text-center text-2xl rounded-md shadow-lg'>Same Category</h2>


      <div className='mx-auto my-12 w-3/4 flex items-center justify-center flex-wrap gap-4'>

        {
          allProducts.filter(item => item.category === productInfo.category).map(product =>
            product.id !== productInfo.id &&
            <Item
              data={product}
              key={product.id}
              addToCart={addToCart} />
          )
        }

      </div>
    </section>
  )
}

export default ProductDetails