import { useState } from "react";
import useFetch from "../hooks/useFetch";

const ProductGrid = () => {
  const { data, loading, error } = useFetch(
    "https://api.escuelajs.co/api/v1/products"
  );

  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return <h2 className="status">Loading...</h2>;
  }

  if (error) {
    return <h2 className="status error">{error}</h2>;
  }

  return (
    <>
      <div className="grid">
        {data &&
          data.slice(0, 12).map((product) => (
            <div className="card" key={product.id}>
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

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Full View" />
        </div>
      )}
    </>
  );
};

export default ProductGrid;