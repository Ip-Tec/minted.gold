import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { F as Footer } from "./Footer-QQ-OOdNp.js";
import { C as CartContext } from "./CartContext-32pv5l2O.js";
import { useContext, useState, useEffect } from "react";
const Table = (props) => {
  return /* @__PURE__ */ jsx("table", { className: "w-full", ...props });
};
const Table$1 = Table;
const Input = (props) => {
  return /* @__PURE__ */ jsx(
    "input",
    {
      className: "w-full p-2 mb-1 border border-gray-300 rounded",
      ...props
    }
  );
};
const Input$1 = Input;
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
const Button$1 = Button;
const ColumnsWrapper = ({ children }) => /* @__PURE__ */ jsx("div", { className: "w-full md:flex md:flex-col text-black my-10", children });
const Box = ({ children }) => /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg p-4 my-2 text-black md:w-3/5", children });
const FixedOrderBox = ({ children }) => /* @__PURE__ */ jsx("div", { className: "top-1/2 md:right-0 md:fixed w-full md:w-80 max-h-90vh overflow-y-auto md:transform md:-translate-y-1/2", children });
const ProductInfoCell = ({ children }) => /* @__PURE__ */ jsx("td", { className: "py-2", children });
const ButtonPP = ({ children, ...props }) => /* @__PURE__ */ jsx(
  Button$1,
  {
    className: "my-3 p-2 px-3 md:p-3 md:px-4 hover:bg-yellow-700 hover:text-white rounded-md border border-yellow-700",
    ...props,
    children
  }
);
const ProductImageBox = ({ children }) => /* @__PURE__ */ jsx("div", { className: "w-12 h-16 md:w-20 md:h-20 p-1 border border-solid border-gray-200 flex items-center justify-center rounded-lg", children });
const QuantityLabel = ({ children }) => /* @__PURE__ */ jsx("span", { className: "block md:inline-block px-4", children });
const CityHolder = ({ children }) => /* @__PURE__ */ jsx("div", { className: "flex gap-2", children });
const RemoveButton = ({ onClick }) => /* @__PURE__ */ jsx(
  Button$1,
  {
    onClick,
    className: "bg-red-500 border rounded-md p-1 text-sm text-white hover:bg-transparent hover:border-red-500 hover:text-red-500",
    children: "Remove"
  }
);
function CartPage() {
  const { user, cartProducts, addProduct, removeProduct, clearCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (user && cartProducts.length > 0) {
        const response = await axios.post("/api/cart", {
          ids: cartProducts
        });
        setProducts(response.data);
      } else {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          setProducts(JSON.parse(storedCart));
        }
      }
    };
    fetchData();
  }, [user, cartProducts]);
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);
  function moreOfThisProduct(id) {
    const productToUpdate = cartProducts.find((p) => p.id === id);
    if (productToUpdate) {
      addProduct({
        ...productToUpdate,
        quantity: productToUpdate.quantity + 1
      });
    }
  }
  function lessOfThisProduct(id) {
    const productToUpdate = cartProducts.find((p) => p.id === id);
    if (productToUpdate && productToUpdate.quantity > 1) {
      removeProduct({
        ...productToUpdate,
        quantity: productToUpdate.quantity - 1
      });
    }
  }
  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }
  const total = products.reduce((acc, product) => {
    const cartProduct = cartProducts.find((p) => p.id === product.id);
    if (cartProduct && cartProduct.quantity > 0) {
      acc += product.price * cartProduct.quantity;
    }
    return acc;
  }, 0);
  if (isSuccess) {
    return total;
  }
  if (isSuccess) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ColumnsWrapper, { children: /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsx("h1", { children: "Thanks for your order!" }),
        /* @__PURE__ */ jsx("p", { children: "We will email you when your order will be sent." })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(ColumnsWrapper, { children: [
      /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsx("h2", { children: "Cart" }),
        !(cartProducts == null ? void 0 : cartProducts.length) && /* @__PURE__ */ jsx("div", { children: "Your cart is empty" }),
        (products == null ? void 0 : products.length) > 0 && /* @__PURE__ */ jsxs(Table$1, { children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { children: "Product" }),
            /* @__PURE__ */ jsx("th", { children: "Quantity" }),
            /* @__PURE__ */ jsx("th", { children: "Price" }),
            /* @__PURE__ */ jsx("th", { children: "Action" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { children: products.map((product) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsxs(ProductInfoCell, { children: [
              /* @__PURE__ */ jsx(ProductImageBox, { children: product.image && product.image.length > 0 ? /* @__PURE__ */ jsx(
                Link,
                {
                  href: `product/${product.id}`,
                  children: /* @__PURE__ */ jsx(
                    "img",
                    {
                      width: 300,
                      height: 400,
                      src: product.image,
                      alt: product.title
                    }
                  )
                }
              ) : /* @__PURE__ */ jsx("div", { children: "No Image" }) }),
              product.title
            ] }),
            /* @__PURE__ */ jsxs("td", { children: [
              /* @__PURE__ */ jsx(
                Button$1,
                {
                  onClick: () => lessOfThisProduct(
                    product.id
                  ),
                  children: "-"
                }
              ),
              /* @__PURE__ */ jsx(QuantityLabel, { children: cartProducts.filter(
                (item) => item.id === product.id
              ).reduce(
                (acc, item) => acc + item.quantity,
                0
              ) }),
              /* @__PURE__ */ jsx(
                Button$1,
                {
                  onClick: () => moreOfThisProduct(
                    product.id
                  ),
                  children: "+"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("td", { children: [
              "$",
              product.price * cartProducts.filter(
                (item) => item.id === product.id
              ).reduce(
                (acc, item) => acc + item.quantity,
                0
              )
            ] }),
            /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(
              RemoveButton,
              {
                onClick: () => removeProduct(product)
              }
            ) })
          ] }, product.id)) }),
          /* @__PURE__ */ jsx("tfoot", { children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", {}),
            /* @__PURE__ */ jsx("td", {}),
            /* @__PURE__ */ jsx("td", { children: "Total:" }),
            /* @__PURE__ */ jsxs("td", { children: [
              "$",
              total
            ] })
          ] }) })
        ] })
      ] }),
      !!(cartProducts == null ? void 0 : cartProducts.length) && /* @__PURE__ */ jsx(FixedOrderBox, { className: "h-72 w-auto", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg p-4 text-black w-auto", children: [
        /* @__PURE__ */ jsx("h2", { children: "Order information" }),
        /* @__PURE__ */ jsx(
          Input$1,
          {
            type: "text",
            placeholder: "Name",
            value: name,
            name: "name",
            onChange: (ev) => setName(ev.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          Input$1,
          {
            type: "text",
            placeholder: "Email",
            value: email,
            name: "email",
            onChange: (ev) => setEmail(ev.target.value)
          }
        ),
        /* @__PURE__ */ jsxs(CityHolder, { children: [
          /* @__PURE__ */ jsx(
            Input$1,
            {
              type: "text",
              placeholder: "City",
              value: city,
              name: "city",
              onChange: (ev) => setCity(ev.target.value)
            }
          ),
          /* @__PURE__ */ jsx(
            Input$1,
            {
              type: "text",
              placeholder: "Postal Code",
              value: postalCode,
              name: "postalCode",
              onChange: (ev) => setPostalCode(ev.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Input$1,
          {
            type: "text",
            placeholder: "Street Address",
            value: streetAddress,
            name: "streetAddress",
            onChange: (ev) => setStreetAddress(ev.target.value)
          }
        ),
        /* @__PURE__ */ jsx(
          Input$1,
          {
            type: "text",
            placeholder: "Country",
            value: country,
            name: "country",
            onChange: (ev) => setCountry(ev.target.value)
          }
        ),
        /* @__PURE__ */ jsx(ButtonPP, { black: true, block: true, onClick: goToPayment, children: "Continue to payment" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  CartPage as default
};
