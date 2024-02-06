import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { usePage, Head } from "@inertiajs/react";
import { A as AdminAuthenticated } from "./AdminAuthenticated-FcFnLeJs.js";
import "react";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "@headlessui/react";
import "./ApplicationLogo-jQ3kBiYq.js";
function Settings({ canLogin, laravelVersion, phpVersion }) {
  const { auth } = usePage().props;
  console.log(auth);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(AdminAuthenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Settings" }),
    /* @__PURE__ */ jsx("p", { className: "mt-20 p-2", children: laravelVersion }),
    /* @__PURE__ */ jsx("h1", { children: "Settings" })
  ] }) });
}
export {
  Settings as default
};
