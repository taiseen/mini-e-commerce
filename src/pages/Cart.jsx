import { useProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom'


const Cart = () => {

  const shippingCharge = 25;

  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useProductContext();

  const cartTotal = () => cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const round = (value, decimal) => Number(Math.round(value + 'e' + decimal) + 'e-' + decimal);


  if (cart.length > 0) <div>Your cart is empty</div>

  return (
    <section className='container mx-auto py-8 flex justify-center flex-wrap gap-4 min-h-screen'>
      {
        cart.length >= 1
          ? (
            <>
              <div className='bg-white p-2 md:p-6 rounded-lg shadow-md w-[750px] mx-4 self-start'>

                <h2 className='text-2xl'>Order Summary</h2>

                <div className='space-y-4 '>
                  {
                    cart?.map(item =>
                      <div className='flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-300' key={item.product.id}>

                        <Link to={`/product/${item.product.id}`} className='flex gap-8 justify-between flex-col md:flex-row'>

                          <img src={item.product.image} alt="" className='w-[120px] h-[120px]' />

                          <div className='self-start '>
                            <h2 className='text-xl text-blue-600 hover:underline'>
                              {
                                item.product.title.length > 20
                                  ? item.product.title.substring(0, 20) + '...'
                                  : item.product.title
                             
                              }
                            </h2>
                            <p className='text-xl font-bold pt-2 text-gray-600'>${round(item.product.price * item.quantity, 2)}</p>
                          </div>
                        </Link>


                        <div className='space-y-2 text-center select-none'>

                          <div className='flex items-center justify-between px-1'>
                            <button
                              onClick={() => decreaseQuantity(item.product.id)}
                              disabled={item.quantity === 1}
                              className='quantityBtn'
                            >
                              -
                            </button>
                            <span className='px-2 text-xl'>{item.quantity}</span>
                            <button
                              onClick={() => increaseQuantity(item.product.id)}
                              className='quantityBtn'
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className='bg-blue-700 px-6 py-2 rounded-md text-gray-200 hover:shadow-2xl duration-100'
                          >
                            Remove
                          </button>

                        </div>

                      </div>
                    )
                  }
                </div>

              </div>


              <div className='bg-white rounded-lg shadow-md w-96 mx-4 p-6 self-start'>
                <h2 className='text-2xl'>Payment Summary</h2>

                <div className='mt-4 border-t border-gray-300 py-4 space-y-5 text-xl'>

                  <div className='flex items-center justify-between'>
                    <p>Subtotal</p>
                    <p className='text-blue-600 font-bold'>${round(cartTotal(), 2)}</p>
                  </div>

                  <div className='flex items-center justify-between'>
                    <p>Shipping Fee</p>
                    <p className='text-blue-600 font-bold'>${shippingCharge}</p>
                  </div>

                  <div className='flex items-center justify-between'>
                    <p>Total</p>
                    <p className='text-blue-600 font-bold'>${round(cartTotal() + shippingCharge, 2)}</p>
                  </div>

                </div>
              </div>
            </>
          )
          : (
            <p className='text-2xl font-bold'>&#9432; Cart is empty...</p>
          )
      }
    </section>
  )
}

export default Cart