import React, { use, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { ProductContext } from "../context/ProductContext";
const Card = () => {
  const [products, setProducts] = useState([]);
  const observerTarget = useRef(null);
  const limit = 10;
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  // search query

  const { searchQuery, priceState, setPriceState } = useContext(ProductContext);
  console.log("Price State in Card:", priceState);
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
  // filter products based on search query

  const filteredProducts = products.filter((item) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      item.title?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      item.brand?.toLowerCase().includes(query)
    );
  });
  // sort products based on priceState
  if (priceState === "low-to-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (priceState === "high-to-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  return (
    <div className="">
      {/* card code */}
      {searchQuery && filteredProducts.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No products found for "{searchQuery}"
        </div>
      )}

      {/* Card grid */}
      <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
        {filteredProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {!searchQuery && <div ref={observerTarget}>Loading more...</div>}
    </div>
  );
};
export default Card;
