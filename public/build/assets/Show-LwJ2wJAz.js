import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { F as Footer } from "./Footer-QQ-OOdNp.js";
import { N as NavBar } from "./NavBar-41hf8afP.js";
import { M as MyGuestLayout, A as AddToCart } from "./MyGuestLayout-PKOOFDcb.js";
import { R as ReviewStar } from "./ReviewStar-dkQQfmtA.js";
import "./Cart-S77kG9By.js";
import "./TextInput-hH_3HmZo.js";
import "@headlessui/react";
import "./PrimaryButton-tCuq_nFx.js";
import "./CloseIcon-mZkGzQxN.js";
import "./CartContext-32pv5l2O.js";
function Show({ product }) {
  const [activeImage, setActiveImage] = useState(product.image[0]);
  const handleImageClick = (image) => {
    setActiveImage(image);
  };
  return /* @__PURE__ */ jsxs(MyGuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Product - ${product.title}` }),
    /* @__PURE__ */ jsx(NavBar, {}),
    /* @__PURE__ */ jsx("div", { className: "mt-20 container mx-auto my-8 p-8 bg-white rounded-md", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: activeImage,
            alt: product.title,
            className: "w-full h-auto rounded-md"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: product.image.map((image, index) => /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: product.title,
            className: "w-20 h-auto rounded-md cursor-pointer",
            onClick: () => handleImageClick(image)
          },
          index
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-semibold mb-4", children: product.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: product.description }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full justify-center sm:justify-between items-center flex-wrap", children: [
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between w-1/2", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xl font-semibold", children: [
              "₦",
              product.price
            ] }),
            /* @__PURE__ */ jsxs("del", { className: "ml-2 text-gray-500", children: [
              "₦",
              (product.price + 20).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            AddToCart,
            {
              product,
              className: "w-[12rem]"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 w-full sm:w-2/4 px-2 py-3", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold mb-4", children: "Reviews From Users" }),
      product.reviews.map((review) => /* @__PURE__ */ jsxs("div", { className: "mb-4 border-b bo", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-gray-900 flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            " by: ",
            "Anonymous"
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-slate-400 text-sm", children: review.created_at })
        ] }),
        /* @__PURE__ */ jsx(ReviewStar, { rating: review.rating }, review.id),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 mb-2", children: review.comment })
      ] }, review.id))
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  Show as default
};
