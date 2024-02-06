import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { F as Footer } from "./Footer-QQ-OOdNp.js";
import { N as NavBar } from "./NavBar-41hf8afP.js";
import "react";
import "./CartContext-32pv5l2O.js";
import { G as Guest } from "./GuestLayout-dk3v9UEZ.js";
import "./Cart-S77kG9By.js";
import "./TextInput-hH_3HmZo.js";
import "@headlessui/react";
import "./PrimaryButton-tCuq_nFx.js";
import "./CloseIcon-mZkGzQxN.js";
import "./ApplicationLogo-jQ3kBiYq.js";
function Welcome({
  auth,
  laravelVersion,
  phpVersion,
  Featureds,
  newProducts
}) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsx(NavBar, {}),
    /* @__PURE__ */ jsx("p", { className: "mt-20 p-2", children: laravelVersion }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
}
export {
  Welcome as default
};
