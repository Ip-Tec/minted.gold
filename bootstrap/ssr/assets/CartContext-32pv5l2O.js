import { jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect } from "react";
const CartContext = createContext({});
function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if ((cartProducts == null ? void 0 : cartProducts.length) > 0) {
      ls == null ? void 0 : ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, [ls]);
  function addProduct(product) {
    const existingProductIndex = cartProducts.findIndex(
      (p) => p.slug === product.slug
    );
    if (existingProductIndex !== -1) {
      setCartProducts((prev) => {
        const updatedProducts = [...prev];
        updatedProducts[existingProductIndex].quantity += 1;
        return updatedProducts;
      });
    } else {
      setCartProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  }
  function removeProduct(productId) {
    const existingProductIndex = cartProducts.findIndex(
      (p) => p.slug === productId
    );
    if (existingProductIndex !== -1) {
      setCartProducts((prev) => {
        const updatedProducts = [...prev];
        updatedProducts.splice(existingProductIndex, 1);
        return updatedProducts;
      });
    }
  }
  useEffect(() => {
    setCartProducts(
      (prev) => prev.filter((product) => product.quantity > 0)
    );
  }, []);
  function clearCart() {
    setCartProducts([]);
  }
  function moreOfThisProduct(id) {
    const productToUpdate = cartProducts.find((p) => p.slug === id);
    if (productToUpdate) {
      addProduct({
        ...productToUpdate,
        quantity: productToUpdate.quantity + 1
      });
    }
  }
  function lessOfThisProduct(id) {
    const productToUpdate = cartProducts.find((p) => p.slug === id);
    if (productToUpdate && productToUpdate.quantity > 1) {
      removeProduct({
        ...productToUpdate,
        quantity: productToUpdate.quantity - 1
      });
    }
  }
  return /* @__PURE__ */ jsx(
    CartContext.Provider,
    {
      value: {
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        moreOfThisProduct,
        lessOfThisProduct,
        clearCart
      },
      children
    }
  );
}
export {
  CartContext as C,
  CartContextProvider as a
};
