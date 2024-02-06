import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Link, Head } from "@inertiajs/react";
import { N as NavBar } from "./NavBar-41hf8afP.js";
import { P as ProductsGrid, a as ProductDisplay } from "./ProductsGrid-G2ms64AA.js";
import { F as Footer } from "./Footer-QQ-OOdNp.js";
import { A as AddToCart, M as MyGuestLayout } from "./MyGuestLayout-PKOOFDcb.js";
import { P as Pagination } from "./Pagination-hTPCcRdJ.js";
import "./Cart-S77kG9By.js";
import "./TextInput-hH_3HmZo.js";
import "@headlessui/react";
import "./PrimaryButton-tCuq_nFx.js";
import "./CloseIcon-mZkGzQxN.js";
import "./CartContext-32pv5l2O.js";
import "./ReviewStar-dkQQfmtA.js";
const NewProducts = ({ products }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl my-6 mx-auto font-normal text-center text-gray-800 w-full", children: "New Arrivals" }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-auto flex flex-row justify-end items-center flex-wrap", children: /* @__PURE__ */ jsx(ProductsGrid, { products }) })
  ] });
};
function ButtonLink({ children, ...props }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: `border-0 px-5 py-2 rounded cursor-pointer inline-flex items-center text-decoration-none font-poppins font-semibold text-base transition-all duration-300 focus:outline-none focus:border-none hover:bg-transparent focus:ring focus:ring-primary`,
      children
    }
  );
}
function Featured({ products }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(
    Array(products.length).fill(false)
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 8e3);
    return () => clearInterval(interval);
  }, [currentIndex, products.length]);
  useEffect(() => {
    const imagePromises = products.map((product2, index) => {
      if (!Array.isArray(product2.image)) {
        var image = JSON.parse(product2.image);
        product2.image = image;
      }
      return new Promise((resolve, reject) => {
        var _a;
        const img = new window.Image();
        img.src = `${(_a = product2 == null ? void 0 : product2.image) == null ? void 0 : _a[0]}`;
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
    Promise.all(imagePromises);
  }, [products]);
  products[currentIndex];
  const slideStyle = {
    display: "flex",
    width: `${products.length * 100}%`,
    transform: `translateX(${-currentIndex * (100 / products.length)}%)`,
    transition: "transform 1.5s ease-in-out"
    // Add smooth transition effect
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `text-gray-900 bg-gray-100 p-px max-h-max relative featured-slide z-10`,
      children: /* @__PURE__ */ jsxs("div", { className: "relative max-w-full overflow-x-hidden  z-10", children: [
        /* @__PURE__ */ jsx("div", { className: "relative w-full  z-10", style: slideStyle, children: products.map((product2, index) => {
          var _a;
          return /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center relative w-full z-10", children: imageLoaded[index] && /* @__PURE__ */ jsxs("div", { className: "image-overlay-container w-full z-10", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center items-center m-auto absolute z-10 w-full h-full p-2 left-0", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 text-gray-300 bg-opacity-70 w-3/4 rounded-md p-6", children: [
              /* @__PURE__ */ jsx("h1", { className: "m-0 text-3xl md:text-5xl", children: product2.title || "No Title" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm md:text-base md:w-3/4", children: product2.description || "No Description" }),
              /* @__PURE__ */ jsxs("div", { className: "bottom-0 left-0 right-0 p-10", children: [
                /* @__PURE__ */ jsx(
                  ButtonLink,
                  {
                    href: route(
                      "product.show",
                      `${product2.slug}`
                    ),
                    className: "border-2 hover:bg-transparent",
                    children: "Read more"
                  }
                ),
                /* @__PURE__ */ jsx(
                  AddToCart,
                  {
                    className: "bg-white text-black border-0 border-none hover:bg-slate-900",
                    product: product2
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: `${(_a = product2 == null ? void 0 : product2.image) == null ? void 0 : _a[0]}`,
                alt: "",
                width: 1200,
                height: 800,
                style: {
                  height: "32rem",
                  width: "100%"
                }
              }
            )
          ] }) }) }, product2.id);
        }) }),
        /* @__PURE__ */ jsx("div", { className: "text-center mt-4 absolute bottom-0 flex justify-center items-center m-auto w-full px-2 py-4", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-700 bg-opacity-60 p-2 rounded-full pt-3", children: products.map((_, index) => /* @__PURE__ */ jsx(
          "span",
          {
            className: `dot hover:cursor-pointer ${index === currentIndex ? "active" : ""}`,
            onClick: () => setCurrentIndex(index)
          },
          index
        )) }) })
      ] })
    }
  );
}
const ProductIndex = ({
  products,
  productsDisplay,
  productsFeatured,
  auth
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(MyGuestLayout, { children: [
    /* @__PURE__ */ jsx(NavBar, {}),
    /* @__PURE__ */ jsx(Head, { title: "Product" }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-screen-m mx-auto mt-20 z-10", children: [
      /* @__PURE__ */ jsx(Featured, { products: productsFeatured.data }),
      /* @__PURE__ */ jsx(ProductDisplay, { products: productsDisplay.data }),
      /* @__PURE__ */ jsx(NewProducts, { products: products.data }),
      /* @__PURE__ */ jsx(Pagination, { products })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
};
export {
  ProductIndex as default
};
