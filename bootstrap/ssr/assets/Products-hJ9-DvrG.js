import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect, Fragment as Fragment$1 } from "react";
import { A as AdminAuthenticated } from "./AdminAuthenticated-FcFnLeJs.js";
import { useForm, Head, router } from "@inertiajs/react";
import { Transition, Dialog } from "@headlessui/react";
import { A as AdminSearch } from "./AdminSearch-cd8UPB5J.js";
import { P as Pagination } from "./Pagination-hTPCcRdJ.js";
import "./CartContext-32pv5l2O.js";
import { I as InputLabel } from "./InputLabel-OxGAYuNE.js";
import { P as PrimaryButton } from "./PrimaryButton-tCuq_nFx.js";
import { I as InputError } from "./InputError-NzwfGsTp.js";
import { T as TextInput } from "./TextInput-hH_3HmZo.js";
import { E as EditModal } from "./EditModal-C2HzsBXc.js";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "./ApplicationLogo-jQ3kBiYq.js";
import "./CloseIcon-mZkGzQxN.js";
const AddProductForm = ({ auth, categories, product }) => {
  const { data, setData, put, post, processing, errors, reset } = useForm({
    title: "",
    stock: "",
    price: "",
    category: "",
    description: "",
    images: [],
    adminName: auth.user.email
  });
  const [categoriesData, setCategoriesData] = useState(categories);
  const [imagePreviews, setImagePreviews] = useState([]);
  useEffect(() => {
    if (product) {
      setData(product);
    }
  }, [product]);
  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };
  const handleImageChange = (e) => {
    setData("images", e.target.files);
    const previews = Array.from(e.target.files).map(
      (file) => URL.createObjectURL(file)
    );
    setImagePreviews(previews);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("stock", data.stock);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("description", data.description);
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images[]", data.images[i]);
    }
    formData.append("adminName", data.adminName);
    const routeName = product ? "admin.product.update" : "admin.product.create";
    const routeParams = product ? { id: product.id } : {};
    post(route(routeName, routeParams), {
      data: formData,
      onSuccess: () => {
        console.log("Product created/update successfully");
      },
      onError: (error) => {
        console.log(error);
      }
    });
  };
  return /* @__PURE__ */ jsxs(
    "form",
    {
      onSubmit: handleSubmit,
      className: "w-full h-[88%] no-scrollbar overflow-y-auto mx-auto",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx(InputLabel, { value: "Product Name", className: "text-xl" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "text",
              id: "title",
              name: "title",
              value: data.title,
              onChange: handleChange,
              className: "w-full border p-2 rounded"
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.title,
              className: "text-red-500 mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 mr-4", children: [
            /* @__PURE__ */ jsx(InputLabel, { value: "Stock", className: "text-xl" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "number",
                id: "stock",
                name: "stock",
                value: data.stock,
                onChange: handleChange,
                className: "w-full border p-2 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.stock,
                className: "text-red-500 mt-2"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsx(InputLabel, { value: "Product Price", className: "text-xl" }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "text",
                id: "price",
                name: "price",
                value: data.price,
                onChange: handleChange,
                className: "w-full border p-2 rounded"
              }
            ),
            /* @__PURE__ */ jsx(
              InputError,
              {
                message: errors.price,
                className: "text-red-500 mt-2"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx(InputLabel, { value: "Category", className: "text-xl" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "category",
              name: "category",
              value: data.category,
              onChange: handleChange,
              className: "w-full border p-2 rounded",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select Category" }),
                categoriesData.map((category) => /* @__PURE__ */ jsx("option", { value: category.name, children: category.name }, category.id))
              ]
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
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx(InputLabel, { value: "Images", className: "text-xl" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              type: "file",
              id: "images",
              name: "images",
              onChange: handleImageChange,
              className: "w-full border p-2 rounded",
              multiple: true
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.images,
              className: "text-red-500 mt-2"
            }
          ),
          imagePreviews.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap", children: imagePreviews.map((preview, index) => /* @__PURE__ */ jsx(
            "img",
            {
              src: preview,
              alt: `Product Image ${index + 1}`,
              width: "2rem",
              className: "w-24 h-24 object-cover rounded-full mr-2"
            },
            index
          )) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx(InputLabel, { value: "Admin Email", className: "text-xl" }),
          /* @__PURE__ */ jsx(
            "p",
            {
              type: "text",
              id: "adminName",
              name: "adminName",
              value: data.adminName,
              className: "border p-2 rounded",
              readOnly: true,
              children: data.adminName
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.adminName,
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
            children: processing ? "Creating..." : "Create Product"
          }
        )
      ]
    }
  );
};
function Products({ products, auth, categories }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [deleteProductImg, setDeleteProductImg] = useState("../logo.jpg");
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);
  const {
    data: formData,
    // Rename 'data' to 'formData' to avoid conflicts
    setData,
    delete: destroy,
    processing,
    errors,
    progress,
    reset
  } = useForm();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const handleEditClick = (product) => {
    setEditingProduct(product);
    setIsEditModalVisible(true);
  };
  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setEditingProduct(null);
  };
  const closeAddProductEditModal = () => {
    setIsAddProductVisible(false);
    setEditingProduct(null);
  };
  console.log(products);
  const handleDeleteClick = (productId, productImg) => {
    setDeleteProductId(productId);
    setDeleteProductImg(productImg);
  };
  const handleDeleteConfirm = () => {
    router.delete(route("admin.product.destroy", { id: deleteProductId }), {
      onSuccess: (data) => {
        console.log({ data });
        console.log({
          processing,
          errors,
          progress
        });
      },
      onError: (errors2) => {
        console.log("{ errors }");
        console.log({ errors: errors2 });
        console.log({
          processing,
          errors: errors2,
          progress
        });
      }
    });
    console.log(`Deleting product with ID: ${deleteProductId}`);
    setDeleteProductId(null);
  };
  const truncateString = (str, maxLen) => {
    if (str.length <= maxLen)
      return str;
    return str.substr(0, maxLen) + "...";
  };
  const filteredProducts = products.data.filter(
    (product) => product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleAddProductClick = () => {
    setIsAddProductVisible(!isAddProductVisible);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(AdminAuthenticated, { user: auth.user, children: [
      /* @__PURE__ */ jsx(Head, { title: "Product" }),
      /* @__PURE__ */ jsxs("div", { className: "px-8 py-4 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-between items-end", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleAddProductClick,
              className: "p-3 text-center bg-blue-400 rounded w-48 hover:border-blue-400 hover:text-blue-600 hover:bg-transparent border justify-end items-start ",
              children: "Add Product"
            }
          ),
          /* @__PURE__ */ jsx(AdminSearch, { setSearchTerm })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold mb-4", children: "Product List" }),
        /* @__PURE__ */ jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [
          /* @__PURE__ */ jsx("thead", { className: "bg-gray-50", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx(
              "th",
              {
                scope: "col",
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "S/N"
              }
            ),
            /* @__PURE__ */ jsx(
              "th",
              {
                scope: "col",
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Image"
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
                children: "Price"
              }
            ),
            /* @__PURE__ */ jsx(
              "th",
              {
                scope: "col",
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Stock"
              }
            ),
            /* @__PURE__ */ jsx(
              "th",
              {
                scope: "col",
                className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                children: "Admin Email"
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
          /* @__PURE__ */ jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: filteredProducts.map((product) => /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "px-4 py-2 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { children: product.id }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: product.image[0],
                alt: product.title,
                className: "w-16 h-16 object-cover"
              }
            ) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-gray-900", children: /* @__PURE__ */ jsx("span", { title: product.title, children: truncateString(
              product.title,
              20
            ) }) }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
              "$",
              product.price
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: product.stock }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-500", children: product.adminName }) }),
            /* @__PURE__ */ jsx("td", { className: "px-6 py-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "text-blue-500 hover:underline",
                  onClick: () => handleEditClick(product),
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleDeleteClick(
                    product.id,
                    product.image[0]
                  ),
                  className: "ml-2 text-red-500 hover:underline",
                  children: "Delete"
                }
              )
            ] }) })
          ] }, product.id)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Pagination, { products }),
      /* @__PURE__ */ jsx(
        Transition,
        {
          appear: true,
          show: deleteProductId !== null,
          as: Fragment$1,
          children: /* @__PURE__ */ jsxs(
            Dialog,
            {
              as: "div",
              className: "fixed inset-0 z-10 overflow-y-auto flex items-center justify-center",
              onClose: () => setDeleteProductId(null),
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
                      children: /* @__PURE__ */ jsxs(Dialog.Description, { className: "text-white mt-2 bg-slate-700 p-3 flex flex-wrap justify-center items-center", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: deleteProductImg,
                            className: "w-40 rounded-full p-3"
                          }
                        ),
                        /* @__PURE__ */ jsx("p", { children: "Are you sure you want to delete this product?" })
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
                            onClick: () => setDeleteProductId(null),
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
        content: /* @__PURE__ */ jsx(
          AddProductForm,
          {
            categories,
            product: editingProduct,
            auth
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      EditModal,
      {
        isOpen: isAddProductVisible,
        onClose: closeAddProductEditModal,
        title: "Add Product",
        content: /* @__PURE__ */ jsx(AddProductForm, { categories, auth })
      }
    )
  ] });
}
export {
  Products as default
};
