import { Cart, NotFound, ProductDetails, Products } from './pages';
import { Routes, Route, useNavigate, createSearchParams } from 'react-router-dom';
import { Footer, Header } from './components';
import { useProductContext } from './context/ProductContext';

const App = () => {

  const navigate = useNavigate();
  const { cartItemCount } = useProductContext();

  // Only URL Update by search term
  const onSearch = (searchQuery) => navigate(`/?${createSearchParams({ search: searchQuery })}`);


  return (
    <main>
      <Header onSearch={onSearch} cartItemCount={cartItemCount()} />

      {/* <div className='min-h-screen'> */}
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      {/* </div> */}

      <Footer />
    </main>
  )
}

export default App;