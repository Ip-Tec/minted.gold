import { jsxs, jsx } from "react/jsx-runtime";
import { F as Footer } from "./Footer-QQ-OOdNp.js";
import { N as NavBar } from "./NavBar-41hf8afP.js";
import { P as Pagination } from "./Pagination-hTPCcRdJ.js";
import { P as ProductsGrid, a as ProductDisplay } from "./ProductsGrid-G2ms64AA.js";
import { M as MyGuestLayout } from "./MyGuestLayout-PKOOFDcb.js";
import { Head } from "@inertiajs/react";
import "react";
import "./Cart-S77kG9By.js";
import "./TextInput-hH_3HmZo.js";
import "@headlessui/react";
import "./PrimaryButton-tCuq_nFx.js";
import "./CloseIcon-mZkGzQxN.js";
import "./CartContext-32pv5l2O.js";
import "./ReviewStar-dkQQfmtA.js";
function search({ products, newProducts, searchTerm }) {
  console.log({ products });
  console.log({ newProducts });
  console.log({ searchTerm });
  return /* @__PURE__ */ jsxs(MyGuestLayout, { children: [
    /* @__PURE__ */ jsx(Head, { title: `Search` }),
    /* @__PURE__ */ jsx(NavBar, {}),
    /* @__PURE__ */ jsx("wbr", {}),
    /* @__PURE__ */ jsxs("span", { className: "mt-20 block", children: [
      "Found ",
      products.total,
      " item for ",
      searchTerm
    ] }),
    /* @__PURE__ */ jsx(ProductsGrid, { products: products.data }),
    /* @__PURE__ */ jsx(Pagination, { products }),
    /* @__PURE__ */ jsx(
      ProductDisplay,
      {
        HeadingName: "Newly Add Products",
        products: newProducts.data
      }
    ),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
}
export {
  search as default
};
