import { jsxs, jsx } from "react/jsx-runtime";
import { A as ApplicationLogo } from "./ApplicationLogo-jQ3kBiYq.js";
import { Link } from "@inertiajs/react";
function Guest({ children, link }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100", children: [
    /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(Link, { href: link || "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-24 h-24 fill-current text-gray-500" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg", children })
  ] });
}
export {
  Guest as G
};
