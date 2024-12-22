import { useState, useMemo,useContext,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { ToastContainer,toast} from 'react-toastify';
import ProductCard from '../components/ProductCard';
import { userContext } from '../App';
export function Products() {
  const [loading, setloading] = useState(false);
  const [products, setproducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const fetchData=async ()=>{
    try {
      setloading(true);
      const response = await fetch('https://jlt-xi.vercel.app/api/products/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setproducts(data);
      setfilteredProducts(data);
    } catch (err) {
      // setError(err.message);
      console.log(err);
    }
    finally{
      setloading(false)
    }
  }
    useEffect(() => {
      fetchData();
    }, [])
    
  const token=localStorage.getItem("tok");
 console.log(loading);
 
  const {cart,setcart}=useContext(userContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const handleChange = (e) => {
    const element = products.filter(
      (i) =>
       i.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        i.category.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setfilteredProducts(element);
  }
  if(loading) return <Loader/>
 { return (
    <> 
     <ToastContainer
    position="top-right"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick={true}
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"/>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600">
            Discover our collection of premium products
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex mx-aut  justify-evenly p-4 bg-gray-100 rounded-md">
          <button value={''} onClick={handleChange} className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600">All</button>
            <button value={'tablets'} onClick={handleChange} className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600">Tablets</button>
            <button value={'Laptops'} onClick={handleChange} className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600">Laptops</button>
            <button value={'Mobiles'} onClick={handleChange} className="px-4 py-2 bg-slate-500 text-white rounded-md hover:bg-slate-600">Mobiles</button>
          </div>
        </div>
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) =>
           (
          <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
    </>
  )}
}
