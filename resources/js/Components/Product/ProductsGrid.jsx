// Components/Product/ProductsGrid.js

import ProductBox from "@/Components/Product/ProductBox";

const ProductsGrid = ({ products }) => {
  // console.log("ProductsGrid", products);
  return (
    <div className="w-full flex flex-wrap justify-center items-center m-2 z-10">
      {products?.length > 0 &&
        products.map((product) => 
        <ProductBox key={product.id || product.title} {...product} />
        )}
    </div>
  );
};

export default ProductsGrid;
