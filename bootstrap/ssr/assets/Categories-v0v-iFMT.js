import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useForm, usePage, Head, router } from "@inertiajs/react";
import { A as AdminAuthenticated } from "./AdminAuthenticated-FcFnLeJs.js";
import { Transition, Dialog } from "@headlessui/react";
import { useState, useEffect, Fragment as Fragment$1 } from "react";
import { A as AdminSearch } from "./AdminSearch-cd8UPB5J.js";
import { E as EditModal } from "./EditModal-C2HzsBXc.js";
import { I as InputLabel } from "./InputLabel-OxGAYuNE.js";
import { P as PrimaryButton } from "./PrimaryButton-tCuq_nFx.js";
import { I as InputError } from "./InputError-NzwfGsTp.js";
import { T as TextInput } from "./TextInput-hH_3HmZo.js";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "./ApplicationLogo-jQ3kBiYq.js";
import "./CloseIcon-mZkGzQxN.js";
const FlashMessage = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5e3);
    return () => clearTimeout(timeout);
  }, [onClose]);
  return /* @__PURE__ */ jsx(Fragment, { children: isVisible && /* @__PURE__ */ jsx(
    "div",
    {
      className: `fixed bottom-4 right-4 p-4 rounded-md ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`,
      children: message
    }
  ) });
};
const AddCategoryForm = ({ auth, categories, state }) => {
  const { data, setData, put, post, processing, errors, reset } = useForm({
    name: "",
    description: ""
  });
  useState(categories);
  useState([]);
  const [flashMessage, setFlashMessage] = useState(null);
  const handleSuccess = (message) => {
    setFlashMessage({ message, type: "success" });
  };
  const handleError = (message) => {
    setFlashMessage({ message, type: "error" });
  };
  const handleCloseFlashMessage = () => {
    setFlashMessage(null);
  };
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.title);
    formData.append("description", data.description);
    const routeName = state ? "admin.categories.update" : "admin.categories.create";
    const routeParams = state ? { id: state.id } : {};
    post(route(routeName, routeParams), {
      data: formData,
      onSuccess: (d) => {
        state ? handleSuccess("Category Update successfully.") : handleSuccess("Category created successfully.");
      },
      onError: (error) => {
        console.log(error);
        state ? handleError("Error Updateing Category.") : handleError("Error creating Category.");
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        className: "w-full h-[88%] no-scrollbar overflow-y-auto mx-auto",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { value: "Category Name", className: "text-xl" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "text",
                id: "name",
                name: "name",
                value: data.name,
                onChange: handleChange,
                className: "w-full border p-2 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.name,
                className: "text-red-500 mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { value: "Description", className: "text-xl" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "description",
                name: "description",
                value: data.description,
                onChange: handleChange,
                className: "w-full border p-2 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.description,
                className: "text-red-500 mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            PrimaryButton,
            {
              type: "submit",
              disabled: processing,
              className: "w-full p-10 h-10 text-center",
              children: processing ? "Creating..." : "Create Category"
            }
          )
        ]
      }
    ),
    flashMessage && /* @__PURE__ */ jsx(
      FlashMessage,
      {
        message: flashMessage.message,
        type: flashMessage.type,
        onClose: handleCloseFlashMessage
      }
    )
  ] });
};
function Categories({ canLogin, categories, phpVersion }) {
  const { auth } = usePage().props;
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteCategories, setDeleteCategories] = useState(null);
  const [deleteCategoriesId, setDeleteCategoriesId] = useState(null);
  const [deleteCategoriesImg, setDeleteCategoriesImg] = useState(null);
  const [isAddCategoriesVisible, setIsAddCategoriesVisible] = useState(false);
  useForm({
    name: "",
    description: ""
  });
  const [flashMessage, setFlashMessage] = useState(null);
  const handleSuccess = (message) => {
    setFlashMessage({ message, type: "success" });
  };
  const handleError = (message) => {
    setFlashMessage({ message, type: "error" });
  };
  const handleCloseFlashMessage = () => {
    setFlashMessage(null);
  };
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingCategories, setEditingCategories] = useState(null);
  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditingCategories(null);
  };
  const closeAddCategoriesEditModal = () => {
    setIsAddCategoriesVisible(false);
    setEditingCategories(null);
  };
  const handleDeleteClick = (categories2) => {
    setDeleteCategories(categories2);
    setDeleteCategoriesId(categories2.id);
    setDeleteCategoriesImg(categories2.name);
  };
  const handleDeleteConfirm = async () => {
    try {
      const response = await delete router.delete(
        route("admin.categories.destroy", { id: deleteCategories.id }),
        {
          onStart: (d) => {
            console.log(d);
          },
          onProgress: (d) => {
            console.log(d);
          },
          onSuccess: (d) => {
            handleSuccess("Category Delete successfully.");
          },
          onError: (d) => {
            handleError("Error Deleteing Category.");
          },
          onFinish: (d) => {
            console.log(d);
          }
        }
      );
      setDeleteCategoriesId(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  const truncateString = (str, maxLen) => {
    if (str.length <= maxLen)
      return str;
    return str.substr(0, maxLen) + "...";
  };
  const filteredProducts = categories.data ? categories.data.filter(
    (category) => category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];
  const handleAddProductClick = () => {
    setIsAddCategoriesVisible(!isAddCategoriesVisible);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(AdminAuthenticated, { user: auth.user, children: [
      /* @__PURE__ */ jsx(Head, { title: "Category" }),
      /* @__PURE__ */ jsxs("div", { className: "px-8 py-4 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between items-end", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleAddProductClick,
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
                children: "N/S"
              }
            ),
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
          /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredProducts.map((category) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: /* @__PURE__ */ jsx("span", { title: category.name, children: category.id }) }) }),
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
                  onClick: () => setIsEditModalVisible(
                    category
                  ),
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDeleteClick(category),
                  className: "ml-2 text-red-500 hover:underline",
                  children: "Delete"
                }
              )
            ] }) })
          ] }, category.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Transition,
        {
          appear: true,
          show: deleteCategoriesId !== null,
          as: Fragment$1,
          children: /* @__PURE__ */ jsxs(
            Dialog,
            {
              as: "div",
              className: "fixed inset-0 z-10 overflow-y-auto flex items-center justify-center",
              onClose: () => setDeleteCategoriesId(null),
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
                        /* @__PURE__ */ jsx("h3", { className: "text-lg", children: deleteCategoriesImg }),
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
                            onClick: () => setDeleteCategoriesId(null),
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
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      EditModal,
      {
        isOpen: isEditModalVisible,
        onClose: closeEditModal,
        title: "Edit Product",
        content: /* @__PURE__ */ jsx(AddCategoryForm, { categories, auth })
      }
    ),
    /* @__PURE__ */ jsx(
      EditModal,
      {
        isOpen: isAddCategoriesVisible,
        onClose: closeAddCategoriesEditModal,
        title: "Add Product",
        content: /* @__PURE__ */ jsx(AddCategoryForm, { categories, auth })
      }
    ),
    flashMessage && /* @__PURE__ */ jsx(
      FlashMessage,
      {
        message: flashMessage.message,
        type: flashMessage.type,
        onClose: handleCloseFlashMessage
      }
    )
  ] });
}
export {
  Categories as default
};
