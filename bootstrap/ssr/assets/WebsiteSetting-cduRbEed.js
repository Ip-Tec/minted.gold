import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useForm, usePage, Head } from "@inertiajs/react";
import { A as AdminAuthenticated } from "./AdminAuthenticated-FcFnLeJs.js";
import { useState, useEffect } from "react";
import "./CartContext-32pv5l2O.js";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "@headlessui/react";
import "./ApplicationLogo-jQ3kBiYq.js";
function WebsiteSettingFeatured({ products }) {
  var _a, _b;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(
    Array(products.length).fill(false)
  );
  const { data, setData, post, processing, errors, reset } = useForm({
    title: ((_a = products[currentIndex]) == null ? void 0 : _a.title) || "",
    description: ((_b = products[currentIndex]) == null ? void 0 : _b.description) || "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  useEffect(() => {
    const imagePromises = products.map((product, index) => {
      if (!Array.isArray(product.image)) {
        var image = JSON.parse(product.image);
        product.image = image;
      }
      return new Promise((resolve, reject) => {
        var _a2;
        const img = new window.Image();
        img.src = `${(_a2 = product == null ? void 0 : product.image) == null ? void 0 : _a2[0]}`;
        img.onload = () => {
          setImageLoaded((prev) => {
            const newLoaded = [...prev];
            newLoaded[index] = true;
            return newLoaded;
          });
          resolve();
        };
        img.onerror = reject;
      });
    });
    Promise.all(imagePromises).then(() => {
      console.log("All images loaded");
    });
  }, [products, currentIndex]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };
  const handleNextProduct = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      reset();
    }
  };
  const handlePrevProduct = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      reset();
    }
  };
  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImagePreview((prev) => {
          const newPreview = [...prev];
          newPreview[currentIndex] = imageDataUrl;
          return newPreview;
        });
        setData("image", file);
      };
      reader.readAsDataURL(file);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image);
    post(
      route("admin.websiteSetting.updateWebsiteSettingFeatured", {
        product: products[currentIndex].id
      }),
      formData,
      {
        onSuccess: () => {
          console.log("Product updated successfully");
        },
        onError: (errors2) => {
          console.error("Error updating product:", errors2);
        }
      }
    );
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `text-gray-900 bg-gray-100 p-px max-h-max relative featured-slide z-40`,
      children: /* @__PURE__ */ jsxs("form", { className: "relative h-auto", onSubmit: submit, children: [
        /* @__PURE__ */ jsx("div", { className: "relative flex h-auto w-full z-10", children: products.map((product, index) => {
          var _a2;
          return /* @__PURE__ */ jsx(
            "div",
            {
              className: `flex items-center justify-center relative w-full ${index === currentIndex ? "" : "hidden"}`,
              children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center items-center h-auto", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-auto relative", children: [
                /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center h-full w-full items-center absolute p-2 transform z-20", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-900 text-gray-300 bg-opacity-70 flex rounded-md p-6 justify-center items-center relative h-[80%] w-[80%] z-30", children: [
                  /* @__PURE__ */ jsx("span", { className: "absolute top-0.5 px-3 rounded-full bg-white text-black left-1 text-2xl", children: product.id }),
                  /* @__PURE__ */ jsxs("div", { className: "w-[77%] h-[80%] z-30", children: [
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        name: "title",
                        value: data.title || product.title,
                        onChange: handleInputChange,
                        className: "m-0 bg-transparent text-xl focus:outline-none mb-3"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        rows: "4",
                        name: "description",
                        value: data.description || product.description,
                        onChange: handleInputChange,
                        className: "text-md bg-transparent md:w-3/4 focus:outline-none mt-3 resize-none"
                      }
                    )
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: imagePreview || `${(_a2 = product == null ? void 0 : product.image) == null ? void 0 : _a2[0]}`,
                    alt: "",
                    width: 1200,
                    height: 800,
                    style: {
                      height: "32rem",
                      width: "100%"
                    },
                    onClick: handleImageClick
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    id: "imageInput",
                    className: "w-fu top-0 bg-opacity-40 z-40 absolte bg-slate-500 cursor-pointer",
                    onChange: handleImageChange
                  }
                )
              ] }) })
            },
            product.slug
          );
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between mt-4", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handlePrevProduct,
              className: "bg-blue-600 text-white rounded-lg px-10 py-3 hover:bg-blue-400",
              children: "Previous"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleNextProduct,
              className: "bg-blue-600 text-white rounded-lg px-10 py-3 hover:bg-blue-400",
              children: "Next"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("button", { className: "px-10 py-3 mt-4 text-gray-300 rounded-lg bg-blue-600 hover:bg-blue-400 hover:text-white", children: "Save" })
      ] })
    }
  );
}
function AdsForm({ adData }) {
  const [imagePreview, setImagePreview] = useState(adData.image);
  const { data, setData, post, reset } = useForm({
    // Assuming other form fields here
    image: null
  });
  console.log({ adData });
  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        setImagePreview(imageDataUrl);
        setData("image", file);
      };
      reader.readAsDataURL(file);
    }
  };
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", data.image);
    post(
      // Assuming you have a proper Inertia route for updating the ad
      route("admin.ads.update", { adId: adData.id }),
      formData,
      {
        onSuccess: () => {
          console.log("Ad updated successfully");
          reset();
          setImagePreview(adData.image);
        },
        onError: (errors) => {
          console.error("Error updating ad:", errors);
        }
      }
    );
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl py-3", children: "Ads 1" }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imagePreview,
          className: "w-full h-[18rem] cursor-pointer",
          onClick: handleImageClick
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "file",
          id: "imageInput",
          className: "hidden",
          onChange: handleImageChange
        }
      )
    ] }),
    /* @__PURE__ */ jsx("button", { type: "submit", className: "px-4 py-2 bg-blue-600 text-white", children: "Save" })
  ] });
}
function WebsiteSetting({
  product,
  featured,
  productDisplay,
  ComponentAdsOne
}) {
  const { auth } = usePage().props;
  console.log(auth);
  console.log();
  console.log({ ComponentAdsOne });
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(AdminAuthenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Website Setting" }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl p-3", children: "Website Setting" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsx(WebsiteSettingFeatured, { products: featured }),
      /* @__PURE__ */ jsx(AdsForm, { adData: ComponentAdsOne[0] }),
      /* @__PURE__ */ jsx(AdsForm, { adData: ComponentAdsOne[1] })
    ] })
  ] }) });
}
export {
  WebsiteSetting as default
};
