import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, Head, Link } from "@inertiajs/react";
import { S as Search, a as Cart } from "./Cart-S77kG9By.js";
function NavBar() {
  const { auth } = usePage().props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Navigation" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full fixed top-0 right-0 p-3 bg-yellow-600 flex justify-between items-center h-20 z-50", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-auto", children: [
        /* @__PURE__ */ jsx(Link, { href: "/", children: /* @__PURE__ */ jsx("img", { src: "../logo.jpg", className: "w-12" }) }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-md text-white font-bold mx-1 sm:mx-2 sm:flex", children: [
          /* @__PURE__ */ jsxs("span", { className: "hidde sm:flex", children: [
            "Current Gold Price",
            " "
          ] }),
          /* @__PURE__ */ jsx("span", { children: " $1200" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center w-auto", children: [
        auth ? (
          // Render content for authenticated user
          /* @__PURE__ */ jsx(
            Link,
            {
              href: "/dashboard",
              className: "font-semibold text-gray-200 hover:scale-110 focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
              children: auth.name
            }
          )
        ) : (
          // Render login and register links for non-authenticated user
          /* @__PURE__ */ jsxs("div", { className: "flex w-auto md:w-1/2 justify-center items-center", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: "/login",
                className: "text-center ms-4 p-2 font-semibold text-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline focus:outline-2 rounded-lg focus:outline-gray-200",
                children: "Login"
              }
            ),
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("register"),
                className: "text-center ms-4 p-2 font-semibold text-gray-100 hover:text-gray-900 hover:bg-gray-100 focus:outline focus:outline-2 rounded-lg focus:outline-gray-200",
                children: "Register"
              }
            )
          ] })
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between align-middle items-center", children: [
          /* @__PURE__ */ jsx(Search, {}),
          /* @__PURE__ */ jsx(Cart, {})
        ] })
      ] })
    ] })
  ] });
}
export {
  NavBar as N
};
