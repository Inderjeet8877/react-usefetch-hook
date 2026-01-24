import { useState } from "react";
import useFetch from "../hooks/useFetch";

const ProductGrid = () => {
  // Fetch product data from API using custom hook
  const { data, loading, error } = useFetch(
    "https://api.escuelajs.co/api/v1/products"
  );

  // State to store the image that user clicks on
  // If this has a value, modal will be shown
  const [selectedImage, setSelectedImage] = useState(null);

  // Show loading message while API call is in progress
  if (loading) {
    return <h2 className="status">Loading...</h2>;
  }

  // Show error message if API call fails
  if (error) {
    return <h2 className="status error">{error}</h2>;
  }

  return (
    <>
      {/* Product grid */}
      <div className="grid">
        {data &&
          data.slice(0, 12).map((product) => (
            <div className="card" key={product.id}>
              
              {/* Clicking the image opens it in full view */}
              <img
                src={product.images[0]}
                alt={product.title}
                onClick={() => setSelectedImage(product.images[0])}
                className="clickable"
              />

              <h4>{product.title}</h4>
              <p>₹ {product.price}</p>
            </div>
          ))}
      </div>

      {/* Full screen image modal */}
      {/* Clicking anywhere on modal closes it */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full View" />
        </div>
      )}
    </>
  );
};

export default ProductGrid;