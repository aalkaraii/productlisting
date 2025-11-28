import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { ProductContext } from "../context/ProductContext";

const Card = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const observerTarget = useRef(null);
  const limit = 10;

  const { searchQuery, priceState, selectedCategory } =
    useContext(ProductContext);

  const fetchProducts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const url =
        !selectedCategory || selectedCategory === "defaultCategory"
          ? `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
          : `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${skip}`;

      console.log("Fetching:", url);

      const response = await axios.get(url);
      const newProducts = response.data.products;

      if (newProducts.length < limit) {
        setHasMore(false);
      }

      setProducts((prev) => [...prev, ...newProducts]);
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [skip, selectedCategory, loading, limit]);

  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);

    const fetchInitial = async () => {
      setLoading(true);
      try {
        const url =
          !selectedCategory || selectedCategory === "defaultCategory"
            ? `https://dummyjson.com/products?limit=${limit}&skip=0`
            : `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=0`;

        console.log("Initial fetch:", url);

        const response = await axios.get(url);
        const newProducts = response.data.products;

        if (newProducts.length < limit) {
          setHasMore(false);
        }

        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, [selectedCategory, limit]);

  useEffect(() => {
    if (skip > 0) {
      fetchProducts();
    }
  }, [skip, fetchProducts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setSkip((prev) => prev + limit);
        }
      },
      { threshold: 0.5 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loading, hasMore, limit]);

  const processedProducts = React.useMemo(() => {
    let result = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query) ||
          item.brand?.toLowerCase().includes(query)
      );
    }

    if (priceState === "low-to-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (priceState === "high-to-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, searchQuery, priceState]);

  return (
    <div>
      {searchQuery && processedProducts.length === 0 && !loading && (
        <div className="text-center py-10 text-gray-500">
          No products found for "{searchQuery}"
        </div>
      )}

      <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
        {processedProducts.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>

      {!searchQuery && (
        <div ref={observerTarget} className="text-center py-4 text-gray-600">
          {loading && "Loading more..."}
          {!loading && hasMore && products.length > 0 && "Scroll for more"}
          {!loading && !hasMore && products.length > 0 && "No more products"}
        </div>
      )}
    </div>
  );
};

export default Card;
