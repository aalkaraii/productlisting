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
  const isFetchingRef = useRef(false);
  const limit = 10;

  const { searchQuery, priceState, selectedCategory } =
    useContext(ProductContext);

  const fetchProducts = useCallback(
    async (currentSkip, isInitial = false) => {
      // Prevent multiple simultaneous fetches
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      setLoading(true);

      try {
        const url =
          !selectedCategory || selectedCategory === "defaultCategory"
            ? `https://dummyjson.com/products?limit=${limit}&skip=${currentSkip}`
            : `https://dummyjson.com/products/category/${selectedCategory}?limit=${limit}&skip=${currentSkip}`;

        console.log("Fetching:", url);

        const response = await axios.get(url);
        const newProducts = response.data.products;

        if (newProducts.length < limit) {
          setHasMore(false);
        }

        setProducts((prev) => {
          if (isInitial) {
            // For initial fetch, replace everything
            return newProducts;
          }

          // For infinite scroll, filter duplicates and append
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNew = newProducts.filter((p) => !existingIds.has(p.id));

          // Only append if we have unique items
          if (uniqueNew.length === 0) {
            setHasMore(false);
            return prev;
          }

          return [...prev, ...uniqueNew];
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [selectedCategory, limit]
  );

  // Reset and fetch initial products when category changes
  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    isFetchingRef.current = false;

    fetchProducts(0, true);
  }, [selectedCategory, fetchProducts]);

  // Handle infinite scroll
  useEffect(() => {
    if (skip > 0 && !isFetchingRef.current) {
      fetchProducts(skip, false);
    }
  }, [skip, fetchProducts]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          hasMore &&
          !isFetchingRef.current
        ) {
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
    let result = [...products];

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
      result.sort((a, b) => a.price - b.price);
    } else if (priceState === "high-to-low") {
      result.sort((a, b) => b.price - a.price);
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
