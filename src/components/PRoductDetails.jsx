import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { items } from "../ProductData";
import Product from "./Product";
function PRoductDetails() {
  const { id } = useParams();
  const [product, setproduct] = useState('');
  const [relatedProducts, setrelatedProducts] = useState([])
  useEffect(() => {
    const filterProduct = items.filter((i) => i.id == id);
    console.log(filterProduct);
    setproduct(filterProduct[0]);

    const relProducts=items.filter((i)=>i.category===product.category)
    setrelatedProducts([...relProducts])
    console.log(relatedProducts);
  }, [id,product.category]);
  return (
    <>
      <div className="container d-flex justify-content-center align-itmes-center ">
        <div className="img">
          <img src={product.imgSrc} alt="" className="" />
        </div>
      </div>
      <div className="text-center ">
        <h1 className="card-title">{product.title}</h1>
        <p className="card-text">{product.description}</p>
        <button className="btn btn-primary mx-3">{product.price} ₹</button>
        <button className="btn btn-warning">Add To Cart</button>
      </div>
      <div>
        <h1>Related Products</h1>
       <Product items={relatedProducts}/>
      </div>
    </>
  );
}

export default PRoductDetails;
