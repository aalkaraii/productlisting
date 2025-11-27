import React, { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
const Card = () => {
  const [products, setProducts] = useState([]);
  const observerTarget = useRef(null);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);

  const Product = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
      );
      const data = response.data.products;
      setProducts((prev) => [...prev, ...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    Product();
  }, [skip]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setSkip((prev) => prev + limit);
        }
      },
      { threshold: 1.0 }
    );
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loading]);

  return (
    <div className="">
      {/* card code */}

      <div className=" cursor-pointer  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
      <div ref={observerTarget}>Loading more...</div>
    </div>
  );
};
export default Card;
