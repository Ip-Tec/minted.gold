import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import "react";
import { Link } from "@inertiajs/react";
function NewsLetter() {
  return /* @__PURE__ */ jsx("div", { className: "p-3 flex justify-center items-center w-full", children: /* @__PURE__ */ jsxs("form", { className: "flex p-1", children: [
    /* @__PURE__ */ jsx(
      "input",
      {
        className: "w-2/3 px-5 py-2 mr-2 border-b-2 outline-0 outline-offset-0 border-b-yellow-600 ",
        type: "email",
        placeholder: "Subscribe email"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: "px-5 py-2 rounded-md bg-yellow-600 text-white border hover:border-yellow-600 hover:bg-transparent hover:text-black",
        children: "Subscribe"
      }
    )
  ] }) });
}
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-md p-2 w-full md:w-3/4 mx-auto mt-3", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl text-center my-2 text-black", children: "Subscribe To Our News Letter" }),
      /* @__PURE__ */ jsx(NewsLetter, {})
    ] }),
    /* @__PURE__ */ jsx("div", { className: "text-white bg-yellow-950 p-3 h-rem] flex justify-center items-center", children: /* @__PURE__ */ jsxs("div", { className: "md:flex justify-evenly items-center text-white", children: [
      /* @__PURE__ */ jsxs("ul", { className: "mx-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl", children: "Contact Us" }),
        /* @__PURE__ */ jsxs("li", { className: "px-3 py-2", children: [
          "Phone: ",
          /* @__PURE__ */ jsx("span", { children: "+234 (0) 909 1234 234" })
        ] }),
        /* @__PURE__ */ jsxs("li", { className: "px-3 py-2", children: [
          "Email: ",
          /* @__PURE__ */ jsx("span", { children: "mail@mintedgold.com.ng" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "mx-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl", children: "Useful Links" }),
        /* @__PURE__ */ jsx("li", { className: "px-3 py-2 hover:border-b hover:border-b-yellow-600 hover:bg-opacity-50", children: /* @__PURE__ */ jsx(Link, { href: "/", children: "Home" }) }),
        /* @__PURE__ */ jsx("li", { className: "px-3 py-2 hover:border-b hover:border-b-yellow-600", children: /* @__PURE__ */ jsx(Link, { href: "/#newproduct", children: "Product" }) }),
        /* @__PURE__ */ jsx("li", { className: "px-3 py-2 hover:border-b hover:border-b-yellow-600", children: /* @__PURE__ */ jsx(Link, { href: "/auth/deleteAccount", children: "Account Deletion" }) })
      ] }),
      /* @__PURE__ */ jsxs("ul", { className: "mx-3", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl", children: "Our Services" }),
        /* @__PURE__ */ jsx("li", { className: "px-3 py-2", children: "Sale of Gold" }),
        /* @__PURE__ */ jsx("li", { className: "px-3 py-2", children: "Gold Bar" }),
        /* @__PURE__ */ jsx("li", { className: "px-3 py-2" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "text-white bg-yellow-800 p-3 flex justify-center items-center", children: /* @__PURE__ */ jsxs("p", { className: "p-3 text-center", children: [
      "Copyright © ",
      currentYear,
      ". All Rights Reserved"
    ] }) })
  ] });
}
export {
  Footer as F
};
