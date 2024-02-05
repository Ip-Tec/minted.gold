// component/NewProduct.js

// import { useRouter } from "router";
import ProductsGrid from "@/Components/Product/ProductsGrid";
// import Pagination from "@/Components/Pagination"; // Import Pagination component

const NewProducts = ({ products }) => {
//   const router = useRouter();
//   const currentPage = parseInt(router.query.page) || 1;

  return (
    <div>
      <h2 className="text-2xl my-6 mx-auto font-normal text-center text-gray-800 w-full">
        New Arrivals
      </h2>
      <div className="w-full h-auto flex flex-row justify-end items-center flex-wrap">
        <ProductsGrid products={products} />
        {/* <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(products.length / 20)} // Items per page 20
        /> */}
      </div>
    </div>
  );
};

export default NewProducts;
