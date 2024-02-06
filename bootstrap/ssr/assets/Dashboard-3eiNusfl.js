import { jsxs, jsx } from "react/jsx-runtime";
import { F as Footer } from "./Footer-QQ-OOdNp.js";
import { Head } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-aF8_DYm9.js";
import "react";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "@headlessui/react";
import "./Cart-S77kG9By.js";
import "./TextInput-hH_3HmZo.js";
import "./PrimaryButton-tCuq_nFx.js";
import "./CloseIcon-mZkGzQxN.js";
import "./CartContext-32pv5l2O.js";
import "./ApplicationLogo-jQ3kBiYq.js";
function Dashboard({ auth }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-lg text-gray-800 leading-tight", children: "Gold Price: $1200" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsx("div", { className: "p-6 text-gray-900", children: "You're logged in!" }) }) }) }),
        /* @__PURE__ */ jsx(Footer, {})
      ]
    }
  );
}
export {
  Dashboard as default
};
