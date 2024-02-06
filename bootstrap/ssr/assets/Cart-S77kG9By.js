import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { T as TextInput } from "./TextInput-hH_3HmZo.js";
import { Transition } from "@headlessui/react";
import { P as PrimaryButton } from "./PrimaryButton-tCuq_nFx.js";
import React, { useState, useEffect, Fragment as Fragment$1, useContext } from "react";
import { useForm, Link, Head } from "@inertiajs/react";
import { C as CloseIcon } from "./CloseIcon-mZkGzQxN.js";
import { C as CartContext } from "./CartContext-32pv5l2O.js";
function SearchIcon({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 64 64",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      className,
      children: [
        /* @__PURE__ */ jsx("circle", { cx: "32", cy: "32", r: "24" }),
        /* @__PURE__ */ jsx("circle", { cx: "28", cy: "28", r: "8" }),
        /* @__PURE__ */ jsx("line", { x1: "44", y1: "44", x2: "33.66", y2: "33.66" })
      ]
    }
  ) });
}
function Search() {
  const cartRef = React.createRef();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data, setData, get, processing, errors, reset } = useForm({
    search: ""
  });
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const closeCart = () => {
    setIsDropdownOpen(false);
  };
  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      closeCart();
    }
  };
  const submit = (e) => {
    e.preventDefault();
    get(route("products.search"));
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "ms-3 relative mr-1", ref: cartRef, children: [
    /* @__PURE__ */ jsx("span", { onClick: toggleDropdown, children: /* @__PURE__ */ jsx(SearchIcon, { className: "cursor-pointer w-8 h-8 stroke-white stroke-[0.21rem]" }) }),
    /* @__PURE__ */ jsx(
      Transition,
      {
        as: Fragment$1,
        show: isDropdownOpen,
        enter: "transition ease-out duration-100",
        enterFrom: "transform opacity-0 scale-95",
        enterTo: "transform opacity-100 scale-100",
        leave: "transition ease-in duration-75",
        leaveFrom: "transform opacity-100 scale-100",
        leaveTo: "transform opacity-0 scale-95",
        children: (ref) => /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            className: "absolute right-0 mt-2 w-80 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg",
            children: /* @__PURE__ */ jsx("div", { className: "p-2 w-full", children: /* @__PURE__ */ jsxs(
              "form",
              {
                onSubmit: submit,
                action: "",
                method: "post",
                className: "flex justify-center items-center border rounded w-full p-0 m-0",
                children: [
                  /* @__PURE__ */ jsx(
                    TextInput,
                    {
                      id: "search",
                      type: "search",
                      name: "search",
                      value: data.search,
                      className: "mt-1 block w-full",
                      placeholder: "Search...",
                      autoComplete: "Search",
                      isFocused: true,
                      onChange: (e) => setData("search", e.target.value)
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    PrimaryButton,
                    {
                      className: "ms-1 w-24 m-auto flex justify-center items-center bg-yellow-600",
                      disabled: processing,
                      children: /* @__PURE__ */ jsx(SearchIcon, { className: "hover:scale-125 cursor-pointer w-9 h-9 stroke-slate-200 stroke-[0.21rem]" })
                    }
                  )
                ]
              }
            ) })
          }
        )
      }
    )
  ] });
}
function Delete({ width, height, className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: width || "800px",
      height: height || "800px",
      viewBox: "0 0 1024 1024",
      fill: "#000000",
      className,
      version: "1.1",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M32 241.6c-11.2 0-20-8.8-20-20s8.8-20 20-20l940 1.6c11.2 0 20 8.8 20 20s-8.8 20-20 20L32 241.6zM186.4 282.4c0-11.2 8.8-20 20-20s20 8.8 20 20v688.8l585.6-6.4V289.6c0-11.2 8.8-20 20-20s20 8.8 20 20v716.8l-666.4 7.2V282.4z",
            fill: ""
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M682.4 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM367.2 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM524.8 867.2c-11.2 0-20-8.8-20-20V372c0-11.2 8.8-20 20-20s20 8.8 20 20v475.2c0.8 11.2-8.8 20-20 20zM655.2 213.6v-48.8c0-17.6-14.4-32-32-32H418.4c-18.4 0-32 14.4-32 32.8V208h-40v-42.4c0-40 32.8-72.8 72.8-72.8H624c40 0 72.8 32.8 72.8 72.8v48.8h-41.6z",
            fill: ""
          }
        )
      ]
    }
  );
}
function CartIcon({ className = "w-6 h-6" }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 24 24",
      fill: "currentColor",
      className,
      children: /* @__PURE__ */ jsx("path", { d: "M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" })
    }
  );
}
function CartList() {
  const {
    cartProducts,
    removeProduct,
    moreOfThisProduct,
    lessOfThisProduct
  } = useContext(CartContext);
  const handleDeleteItem = (itemId) => {
    removeProduct(itemId);
  };
  const subtotal = cartProducts && cartProducts.length > 0 ? cartProducts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  ) : 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: `
                    /* Hide the scrollbar */
                    .cart-scroll-container::-webkit-scrollbar {
                        display: none;
                    }
                ` }),
    /* @__PURE__ */ jsxs("div", { className: "p-2 flex flex-col justify-center items-center", children: [
      cartProducts && cartProducts.length > 0 ? (
        // Display a scrollable container for cart items
        /* @__PURE__ */ jsx("div", { className: "cart-scroll-container h-[22rem] overflow-y-auto", children: cartProducts.map((item) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "p-2 flex flex-col justify-center align-middle max-h-screen items-start ",
            children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center text-black w-full", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.image[0] || "./logo.jpg",
                  width: "70rem",
                  height: "70rem",
                  className: "rounded-full mr-2"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col m-1 mr-2 justify-between", children: [
                /* @__PURE__ */ jsx("h4", { className: "text-gray-500 text-sm", children: item.title }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => lessOfThisProduct(item.slug),
                      className: "bg-gray-200 text-gray-700 px-2 py-1 rounded-md",
                      children: "-"
                    }
                  ),
                  /* @__PURE__ */ jsx("p", { className: "mx-2", children: item.quantity }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => moreOfThisProduct(item.slug),
                      className: "bg-gray-200 text-gray-700 px-2 py-1 rounded-md",
                      children: "+"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "bg-rose-600 hover:border-rose-600 hover:bg-transparent border p-1 rounded-full w-12 cursor-pointer",
                  onClick: () => handleDeleteItem(item.slug),
                  children: /* @__PURE__ */ jsx(
                    Delete,
                    {
                      width: "1.5rem",
                      height: "1.5rem",
                      className: "fill-slate-100 hover:fill-rose-600 stroke-2"
                    }
                  )
                }
              )
            ] })
          },
          item.title
        )) })
      ) : (
        // Render a message or fallback content when cartProducts is empty
        /* @__PURE__ */ jsx("p", { children: "Your cart is empty" })
      ),
      /* @__PURE__ */ jsxs("div", { className: "absolute flex flex-col justify-center bottom-0 w-full mt-2 p-2 align-bottom bg-white", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex opacity-90 justify-between items-start align-middle p-2", children: [
          /* @__PURE__ */ jsx("p", { children: "Subtotal: " }),
          /* @__PURE__ */ jsxs("p", { className: "text-gray-400", children: [
            "# ",
            subtotal.toFixed(2),
            " "
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "/cart",
            className: "w-full p-4 m-2 border-yellow-600 border hover:bg-yellow-600 rounded-lg hover:text-slate-100 text-center",
            children: "View Cart"
          }
        ),
        /* @__PURE__ */ jsx("button", { className: "w-full p-4 m-2 bg-yellow-600 border hover:bg-transparent rounded-lg text-white hover:text-slate-500 hover:border-yellow-600", children: "Checkout" })
      ] })
    ] })
  ] });
}
function Cart() {
  const cartRef = React.createRef();
  const { cartProducts } = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = (event) => {
    if (event.target.closest(".cart-content")) {
      event.stopPropagation();
      return;
    }
    setIsCartOpen((prev) => !prev);
  };
  const closeCart = () => {
    setIsCartOpen(false);
  };
  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      closeCart();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "ms-3 relative mr-1", ref: cartRef, children: [
    /* @__PURE__ */ jsx(Head, { title: "Cart List" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: ` ${isCartOpen ? "fixed inset-0 z-40 overlay-active" : "relative right-0"}`,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: `${isCartOpen ? "absolute inset-0 bg-gray-600 bg-opacity-75" : ""}`,
              onClick: closeCart
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: `${isCartOpen ? "absolute top-6 right-3" : "cursor-pointer right-1 mx-1"}`,
              onClick: toggleCart,
              children: [
                /* @__PURE__ */ jsx(
                  "sup",
                  {
                    className: `${!cartProducts ? "hidden" : "text-white absolute text-center flex items-center justify-end rounded-full bg-yellow-800 w-auto h-auto p-[0.6rem] -right-[0.51rem] -top-[0.51rem] mt-0"}`,
                    children: !!cartProducts && cartProducts.length
                  }
                ),
                /* @__PURE__ */ jsx(CartIcon, { className: "w-8 h-8 fill-white" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Transition,
            {
              as: Fragment$1,
              show: isCartOpen,
              enter: "transition ease-out duration-100 transform",
              enterFrom: "translate-x-full",
              enterTo: "translate-x-0",
              leave: "transition ease-in duration-75 transform",
              leaveFrom: "translate-x-0",
              leaveTo: "translate-x-full",
              children: (isCartOpen2) => /* @__PURE__ */ jsx("div", { className: "fixed inset-y-0 right-0 max-w-xs w-full bg-white overflow-y-auto transition-transform duration-300 ease-in-out cart-content", children: /* @__PURE__ */ jsxs("div", { className: "", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex bg-gray-200 justify-between items-center p-4", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-black", children: "Shopping Cart" }),
                  /* @__PURE__ */ jsx("span", { onClick: closeCart, children: /* @__PURE__ */ jsx(
                    CloseIcon,
                    {
                      width: "1.5rem",
                      height: "1.5rem",
                      className: "hover:scale-125 cursor-pointer",
                      onClick: closeCart
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx(CartList, {})
              ] }) })
            }
          )
        ]
      }
    )
  ] });
}
export {
  CartIcon as C,
  Search as S,
  Cart as a
};
