import { jsxs, jsx } from "react/jsx-runtime";
import { useContext, useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { C as CartContext } from "./CartContext-32pv5l2O.js";
import { R as ReviewStar } from "./ReviewStar-dkQQfmtA.js";
import { A as AddToCart } from "./MyGuestLayout-PKOOFDcb.js";
const ProductBox = ({ slug, title, description, price, image }) => {
  useContext(CartContext);
  const url = "/product/" + slug;
  if (Array.isArray(image))
    ;
  else {
    JSON.parse(image);
  }
  return /* @__PURE__ */ jsxs("div", { className: "mb-6 m-4 text-black rounded-md shadow-md hover:shadow-lg w-[15rem] bg-gray-50 z-10", children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("product.show", `${slug}`),
        className: "bg-white h-32 flex items-center justify-center rounded relative",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            alt: title,
            width: 300,
            height: 400,
            className: "max-w-full max-h-40 mb-3 rounded-2xl",
            src: `${image[0]}` || "/logo.png"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col", children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("product.show", `${slug}`),
          className: "font-normal text-base text-black mt-2 mx-1 divide-solid border-b border-b-gray-500",
          children: [
            title,
            /* @__PURE__ */ jsx("p", { children: slug })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("product.show", url),
          className: "font-normal text-base text-black mt-2 mx-1 divide-solid border-b border-b-gray-500 flex",
          children: [
            /* @__PURE__ */ jsx(
              ReviewStar,
              {
                product: { slug, title, description, price, image }
              }
            ),
            " ",
            "(",
            (price / 8 * 2 + 1).toFixed(2),
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          href: route("product.show", `${slug}`),
          className: "font-normal flex justify-between text-base text-black my-2 mx-1 px-2 divide-solid border-b border-b-gray-500",
          children: [
            /* @__PURE__ */ jsxs("span", { className: "text-base", children: [
              "₦",
              price
            ] }),
            /* @__PURE__ */ jsxs("del", { className: "opacity-90 text-gray-400", children: [
              "₦",
              (price || 0 + 20).toFixed(2)
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "sm:block flex justify-center mb-1 flex-col items-center w-[98%] text-xs mx-1 my-1", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("product.show", `${slug}`),
            className: " w-[95%] flex justify-evenly border-gray-500\n                        hover:bg-transparent\n                        hover:text-gray-600 border-2 p-2 rounded-md hover:shadow-md bg-gray-500 text-gray-50 ",
            children: "Learn More"
          }
        ),
        /* @__PURE__ */ jsx(AddToCart, { product: { slug, title, description, price, image } })
      ] })
    ] })
  ] });
};
function ProductDisplay({ products, HeadingName }) {
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
      return new Promise((resolve, reject) => {
        if (typeof product2.image === "string") {
          product2.image = JSON.parse(product2.image);
        }
        product2.image = useEffect(() => {
          const imagePromises2 = products.map((product3, index2) => {
            return new Promise((resolve2, reject2) => {
              if (typeof product3.image === "string") {
                product3.image = [product3.image];
              }
              const img2 = new window.Image();
              img2.src = product3.image[0];
              img2.onload = () => {
                setImageLoaded((prev) => {
                  const newLoaded = [...prev];
                  newLoaded[index2] = true;
                  return newLoaded;
                });
                resolve2();
              };
              img2.onerror = reject2;
            });
          });
          Promise.all(imagePromises2);
        }, [products]);
        const img = new window.Image();
        img.src = product2.image[0];
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
    width: `414%`,
    transform: `translateX(${-currentIndex * (50 / products.length)}%)`,
    transition: "transform 1.5s ease-in-out"
    // Add smooth transition effect
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex-col relative overflow-x-hidden h-auto w-auto", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl my-6 mx-auto font-normal text-center text-gray-800 w-full", children: HeadingName ? HeadingName : "Product Display" }),
    /* @__PURE__ */ jsx("div", { className: "flex overflow-x-hidden", style: slideStyle, children: (products == null ? void 0 : products.length) > 0 && products.map((product2) => /* @__PURE__ */ jsx(ProductBox, { ...product2 }, product2.id)) }),
    /* @__PURE__ */ jsx("div", { className: "text-center my-1 flex justify-center items-center m-auto w-full px-2", children: /* @__PURE__ */ jsx("div", { className: "bg-gray-700 bg-opacity-60 p-2 rounded-full pt-3", children: products.map((_, index) => /* @__PURE__ */ jsx(
      "span",
      {
        className: `dot hover:cursor-pointer ${index === currentIndex ? "active" : ""}`,
        onClick: () => setCurrentIndex(index)
      },
      index
    )) }) })
  ] });
}
const ProductsGrid = ({ products }) => {
  return /* @__PURE__ */ jsx("div", { className: "w-full flex flex-wrap justify-center items-center m-2 z-10", children: (products == null ? void 0 : products.length) > 0 && products.map(
    (product) => /* @__PURE__ */ jsx(ProductBox, { ...product }, product.id || product.title)
  ) });
};
export {
  ProductsGrid as P,
  ProductDisplay as a
};
