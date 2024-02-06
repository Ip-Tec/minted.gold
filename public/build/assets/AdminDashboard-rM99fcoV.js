import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { A as AdminAuthenticated } from "./AdminAuthenticated-FcFnLeJs.js";
import { R as ReviewStar } from "./ReviewStar-dkQQfmtA.js";
import { Head } from "@inertiajs/react";
import "react";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "@headlessui/react";
import "./ApplicationLogo-jQ3kBiYq.js";
function AdminDashboard({
  reviews,
  auth,
  totalOrders,
  totalProducts,
  totalUsers
}) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(AdminAuthenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Orders" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start px-2 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "py-4 px-10 shadow-lg bg-green-200 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { children: "Total Product" }),
          /* @__PURE__ */ jsx("p", { children: totalProducts })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-4 px-10 shadow-lg bg-yellow-100 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { children: "Total Users" }),
          /* @__PURE__ */ jsx("p", { children: totalUsers })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "py-4 px-10 shadow-lg bg-rose-200 rounded-lg", children: [
          /* @__PURE__ */ jsx("p", { children: "Total Users" }),
          /* @__PURE__ */ jsx("p", { children: totalOrders })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold mb-4 p-4", children: "Recently Added Reviews" }),
        reviews.data.map((review) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white p-4 rounded-lg shadow-md mb-4 max-w-md",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-2", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: review.product.image[0],
                    alt: review.product.title,
                    className: "w-20 h-20 object-cover rounded-full mr-4"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-lg font-bold", children: review.product.title })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "text-gray-600", children: [
                "Rating:",
                " ",
                /* @__PURE__ */ jsx(
                  ReviewStar,
                  {
                    rating: review.rating
                  },
                  review.id
                )
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: review.comment })
            ]
          },
          review.id
        ))
      ] })
    ] })
  ] }) });
}
export {
  AdminDashboard as default
};
