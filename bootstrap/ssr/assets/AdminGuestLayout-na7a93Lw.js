import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
import { A as ApplicationLogo } from "./ApplicationLogo-jQ3kBiYq.js";
function AdminGuestLayout({ children, link }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 p-0", children: [
    /* @__PURE__ */ jsxs("nav", { className: "w-10/12 flex justify-evenly items-center text-white bg-yellow-600 px-4 py-3 absolute top-0", children: [
      /* @__PURE__ */ jsx(Link, { href: route("admin.login"), children: "Login" }),
      /* @__PURE__ */ jsx(Link, { href: route("admin.register"), children: "Register" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-24", children: /* @__PURE__ */ jsx(Link, { href: link || "/", children: /* @__PURE__ */ jsx(ApplicationLogo, { className: "w-24 h-24 fill-current text-gray-500" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg", children })
  ] });
}
export {
  AdminGuestLayout as A
};
