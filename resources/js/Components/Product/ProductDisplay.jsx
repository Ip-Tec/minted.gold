
import ProductBox from "@/Components/Product/ProductBox";
// import { CartContext } from "@/components/CartContext";
import { useContext, useState, useEffect } from "react";

export default function ProductDisplay({ products, HeadingName }) {
//   const { addProduct } = useContext(CartContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(
    Array(products.length).fill(false)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex, products.length]);

  useEffect(() => {
    // Preload all images
    const imagePromises = products.map((product, index) => {
      return new Promise((resolve, reject) => {
        if (typeof product.image === 'string') {
          // Convert the image to an array
          product.image = JSON.parse(product.image);
        }
          product.image = useEffect(() => {
            // Preload all images
            const imagePromises = products.map((product, index) => {
              return new Promise((resolve, reject) => {
                if (typeof product.image === 'string') {
                  // Convert the image to an array
                  product.image = [product.image];
                }
                const img = new window.Image();
                img.src = product.image[0]; // Assuming the first item in the array is the image URL
                img.onload = () => {
                  setImageLoaded((prev) => {
                    const newLoaded = [...prev];
                    newLoaded[index] = true;
                    return newLoaded;
                  });
                  resolve();
                };
                img.onerror = reject;
              });
            });
          
            // Wait for all images to be loaded
            Promise.all(imagePromises);
          }, [products]);
          
    
        const img = new window.Image();
        img.src = product.image[0]; // Assuming the first item in the array is the image URL
        img.onload = () => {
          setImageLoaded((prev) => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
          });
          resolve();
        };
        img.onerror = reject;
      });
    });
  
    // Wait for all images to be loaded
    Promise.all(imagePromises);
  }, [products]);
  

  const product = products[currentIndex];
  const slideStyle = {
    display: "flex",
    width: `414%`,
    transform: `translateX(${-currentIndex * (50 / products.length)}%)`,
    transition: "transform 1.5s ease-in-out", // Add smooth transition effect
  };
  return (
    <div className="flex-col relative overflow-x-hidden h-auto w-auto">
      <h2 className="text-2xl my-6 mx-auto font-normal text-center text-gray-800 w-full">
        { HeadingName ? HeadingName : "Product Display"}
      </h2>
      <div className="flex overflow-x-hidden" style={slideStyle}>
        {products?.length > 0 &&
          products.map((product) => (
            <ProductBox key={product.id} {...product} />
          ))}
      </div>
      <div className="text-center my-1 flex justify-center items-center m-auto w-full px-2">
        <div className="bg-gray-700 bg-opacity-60 p-2 rounded-full pt-3">
          {products.map((_, index) => (
            <span
              key={index}
              className={`dot hover:cursor-pointer ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
