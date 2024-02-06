import { jsx, jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { C as CartIcon } from "./Cart-S77kG9By.js";
import { usePage } from "@inertiajs/react";
import { C as CartContext, a as CartContextProvider } from "./CartContext-32pv5l2O.js";
const Button = ({ children, block, white, outline, black, primary, size, ...rest }) => {
  const buttonClasses = [
    "border-0",
    "px-5",
    "py-2",
    "rounded",
    "cursor-pointer",
    "inline-flex",
    "items-center",
    "text-decoration-none",
    "font-poppins",
    "font-semibold",
    "focus:outline-none"
  ];
  if (block) {
    buttonClasses.push("block", "w-full");
  }
  if (white && !outline) {
    buttonClasses.push("bg-white", "text-black");
  }
  if (white && outline) {
    buttonClasses.push("bg-transparent", "text-white", "border", "border-white");
  }
  if (black && !outline) {
    buttonClasses.push("bg-black", "text-white");
  }
  if (black && outline) {
    buttonClasses.push("bg-transparent", "text-black", "border", "border-black");
  }
  if (primary && !outline) {
    buttonClasses.push(`bg-${primary}`, `border-${primary}`, "text-white");
  }
  if (primary && outline) {
    buttonClasses.push("bg-transparent", `border-${primary}`, `text-${primary}`);
  }
  if (size === "l") {
    buttonClasses.push("text-lg", "px-8", "py-4");
  }
  return /* @__PURE__ */ jsx("button", { className: buttonClasses.join(" "), ...rest, children });
};
function AddToCart({ product, className }) {
  const { addProduct, setCartProducts } = useContext(CartContext);
  usePage().props;
  const handleAddToCart = () => {
    addProduct(product);
  };
  return (
    // <CartContextProvider>
    /* @__PURE__ */ jsxs(
      Button,
      {
        onClick: handleAddToCart,
        className: `flex w-[95%] justify-center items-center m-auto border-gray-500 border-2 p-1 rounded-md shadow-md hover:bg-gray-500  hover:text-gray-50 px-2 py-2 mt-2 mb-1 ${className}`,
        children: [
          /* @__PURE__ */ jsx(CartIcon, { className: "mx-1 w-4 ch " }),
          " Add to Cart"
        ]
      }
    )
  );
}
function MyGuestLayout({ children }) {
  useContext(CartContext);
  return /* @__PURE__ */ jsx(CartContextProvider, { children: /* @__PURE__ */ jsx("div", { className: "max-w-screen-xl m-auto", children }) });
}
export {
  AddToCart as A,
  MyGuestLayout as M
};
