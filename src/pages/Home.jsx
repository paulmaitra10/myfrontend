import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { motion } from 'framer-motion';
import { ToastContainer,toast } from 'react-toastify';
import ScrollToTop from '../components/ScrollToTop';

const featuredProducts = [
  {
    id: 1,
    category: 'mobiles',
    title: "Apple iPhone 14",
    imgSrc: 'https://m.media-amazon.com/images/I/71xb2xkN5qL._SL1500_.jpg',
    amazonLink: 'https://amzn.to/3PuckZp',
    description: 'Apple iPhone 14 (128 GB) - Blue',
    price: '89999',
  },
  {
    id: 5,
    category: 'laptops',
    title: "Xiaomi [Smartchoice] Notebookpro",
    imgSrc: 'https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg',
    amazonLink: 'https://amzn.to/3EzeQaC',
    description: 'Xiaomi [Smartchoice] Notebookpro ',
    price: '49999',
  },
  {
    id: 7,
    category: 'tablets',
    title: "Xiaomi Pad 6",
    imgSrc: 'https://m.media-amazon.com/images/I/51b9LjzmPCL._SL1080_.jpg',
    amazonLink: 'https://amzn.to/3ZeNRdY',
    description: 'Xiaomi Pad 6| Qualcomm Snapdragon 870| ',
    price: '29999',
  },
];

const Home = () => {
  return (
    <div>
      <Hero />
      <section id="featured-products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-600">Curated selection of premium quality items</p>
              </div>
              <div className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping worldwide</p>
              </div>
              <div className="p-6">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
                <p className="text-gray-600">100% secure payment processing</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <ScrollToTop/>
    </div>
  );
};

export default Home;