import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { usePage, Head } from "@inertiajs/react";
import { A as AdminAuthenticated } from "./AdminAuthenticated-FcFnLeJs.js";
import { Transition, Dialog } from "@headlessui/react";
import { useState, Fragment as Fragment$1 } from "react";
import { A as AdminSearch } from "./AdminSearch-cd8UPB5J.js";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "./ApplicationLogo-jQ3kBiYq.js";
import "./InputLabel-OxGAYuNE.js";
import "./TextInput-hH_3HmZo.js";
import "./PrimaryButton-tCuq_nFx.js";
import "./InputError-NzwfGsTp.js";
function Orders({ orders }) {
  const { auth } = usePage().props;
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteOrderId, setDeleteOrderId] = useState(null);
  const [deleteOrderImg, setDeleteOrderImg] = useState("../logo.jpg");
  const [isAddOrderVisible, setIsAddOrderVisible] = useState(false);
  if (!auth.user) {
    auth.user = {
      name: "Peter Innocent",
      email: "Peter@Innocent@peter.com"
    };
  }
  console.log(categories);
  const handleDeleteClick = (productId, productImg) => {
    setDeleteOrderId(productId);
    setDeleteOrderImg(productImg);
  };
  const handleDeleteConfirm = () => {
    console.log(`Deleting product with ID: ${deleteOrderId}`);
    setDeleteOrderId(null);
  };
  const truncateString = (str, maxLen) => {
    if (str.length <= maxLen)
      return str;
    return str.substr(0, maxLen) + "...";
  };
  const filteredOrders = categories.data ? categories.data.filter(
    (category) => category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  const handleAddOrderClick = () => {
    setIsAddOrderVisible(!isAddOrderVisible);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(AdminAuthenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Category" }),
    /* @__PURE__ */ jsxs("div", { className: "px-8 py-4 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between items-end", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: handleAddOrderClick,
            className: "p-3 text-center bg-blue-400 rounded w-48 hover:border-blue-400 hover:text-blue-600 hover:bg-transparent border justify-end items-start ",
            children: "Add Categories"
          }
        ),
        /* @__PURE__ */ jsx(AdminSearch, { setSearchTerm })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold mb-4", children: "Categories List" }),
      /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Name"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "description"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "created at"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "updated at"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
              children: "Actions"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredOrders.map((category) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: /* @__PURE__ */ jsx("span", { title: category.name, children: truncateString(
            category.name,
            15
          ) }) }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: /* @__PURE__ */ jsx("span", { title: category.description, children: truncateString(
            category.description,
            20
          ) }) }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: /* @__PURE__ */ jsx("span", { title: category.created_at, children: category.created_at }) }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: /* @__PURE__ */ jsx("span", { title: category.updated_at, children: category.updated_at }) }) }),
          /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "text-blue-500 hover:underline",
                onClick: () => console.log(
                  `Edit product with ID: ${category.id}`
                ),
                children: "Edit"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => handleDeleteClick(
                  category.id,
                  category.name
                ),
                className: "ml-2 text-red-500 hover:underline",
                children: "Delete"
              }
            )
          ] }) })
        ] }, category.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Transition, { appear: true, show: deleteOrderId !== null, as: Fragment$1, children: /* @__PURE__ */ jsxs(
      Dialog,
      {
        as: "div",
        className: "fixed inset-0 z-10 overflow-y-auto flex items-center justify-center",
        onClose: () => setDeleteOrderId(null),
        children: [
          /* @__PURE__ */ jsx(Dialog.Overlay, { className: "fixed inset-0 bg-black opacity-30 z-10" }),
          /* @__PURE__ */ jsx("div", { className: "min-h-screen z-20  px-4 text-center flex items-center justify-center h-40 p-8 ml-32 flex-col", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-700 rounded-lg", children: [
            /* @__PURE__ */ jsx(
              Transition.Child,
              {
                as: Fragment$1,
                enter: "ease-out duration-300",
                enterFrom: "opacity-0 scale-95",
                enterTo: "opacity-100 scale-100",
                leave: "ease-in duration-200",
                leaveFrom: "opacity-100 scale-100",
                leaveTo: "opacity-0 scale-95",
                children: /* @__PURE__ */ jsx(Dialog.Title, { className: "text-lg font-medium text-white text-left border-b mt-4 bg-slate-700 p-3", children: "Confirm Deletion" })
              }
            ),
            /* @__PURE__ */ jsx(
              Transition.Child,
              {
                as: Fragment$1,
                enter: "ease-out duration-300",
                enterFrom: "opacity-0 scale-95",
                enterTo: "opacity-100 scale-100",
                leave: "ease-in duration-200",
                leaveFrom: "opacity-100 scale-100",
                leaveTo: "opacity-0 scale-95",
                children: /* @__PURE__ */ jsxs(Dialog.Description, { className: "text-white mt-2 bg-slate-700 p-3 flex flex-col justify-center items-center", children: [
                  /* @__PURE__ */ jsx("h3", { className: "text-lg", children: deleteOrderImg }),
                  /* @__PURE__ */ jsx("p", { children: "Are you sure you want to delete this Category?" })
                ] })
              }
            ),
            /* @__PURE__ */ jsx(
              Transition.Child,
              {
                as: Fragment$1,
                enter: "ease-out duration-300",
                enterFrom: "opacity-0 scale-95",
                enterTo: "opacity-100 scale-100",
                leave: "ease-in duration-200",
                leaveFrom: "opacity-100 scale-100",
                leaveTo: "opacity-0 scale-95",
                children: /* @__PURE__ */ jsxs("div", { className: "mt-4 p-4", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: handleDeleteConfirm,
                      className: "bg-red-500 text-white px-4 py-2 rounded-md mr-2",
                      children: "Delete"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => setDeleteOrderId(null),
                      className: "bg-gray-500 text-white px-4 py-2 rounded-md",
                      children: "Cancel"
                    }
                  )
                ] })
              }
            )
          ] }) })
        ]
      }
    ) })
  ] }) });
}
export {
  Orders as default
};
