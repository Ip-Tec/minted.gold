import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { usePage, router, Head } from "@inertiajs/react";
import { A as AdminAuthenticated } from "./AdminAuthenticated-FcFnLeJs.js";
import "react";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "@headlessui/react";
import "./ApplicationLogo-jQ3kBiYq.js";
function Welcome({
  canLogin,
  canRegister,
  laravelVersion,
  phpVersion
}) {
  const { auth } = usePage().props;
  console.log(auth);
  router.get("Admin/AdminDashboard");
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(AdminAuthenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Welcome" }),
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxs("h1", { className: "w-full text-2xl mt-0 top-0 bsolute py-2", children: [
        "Welcome",
        " "
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-evenly items-center w-full", children: [
        /* @__PURE__ */ jsxs("p", { className: "mt20 p-2", children: [
          "laravelVersion: ",
          laravelVersion
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "p-2", children: [
          "phpVersion: ",
          phpVersion
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "p-2", children: [
          "canLogin: ",
          canLogin
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "p-2", children: [
          "canRegister: ",
          canRegister
        ] })
      ] })
    ] })
  ] }) });
}
export {
  Welcome as default
};
