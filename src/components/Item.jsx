import { Link } from 'react-router-dom';


const Item = ({ data, addToCart }) => {

    const { image, id, title, price } = data;

    return (
        <section className='relative bg-white p-4 rounded-md shadow-md w-80 h-[480px] flex items-center flex-col duration-200'>

            <div className='w-72 h-[320px] px-4'>
                <img src={image} alt="" className='w-full h-full' />
            </div>


            <Link
                to={`/product/${id}`}
                className='text-blue-500 my-4 text-center hover:underline underline-offset-2'
            >
                {title}
            </Link>


            <div className='absolute bottom-3 flex gap-4 items-center justify-between  w-[95%] px-4'>
                <span className='text-xl font-bold'>${price}</span>
                <div className='w-10 h-10 bg-gray-200 rounded-lg p-2 border hover:border-blue-500 duration-200 cursor-pointer'
                    onClick={() => addToCart(data)}>
                    <img src="/cart.svg" alt="" />
                </div>
            </div>

        </section>
    )
}

export default Item