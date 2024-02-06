import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { I as InputLabel } from "./InputLabel-OxGAYuNE.js";
import { T as TextInput } from "./TextInput-hH_3HmZo.js";
import { P as PrimaryButton } from "./PrimaryButton-tCuq_nFx.js";
import { I as InputError } from "./InputError-NzwfGsTp.js";
import { useForm } from "@inertiajs/react";
import "react";
function AdminSearch({ setSearchTerm }) {
  const { data, setData, get, processing, errors, reset } = useForm({
    search: ""
  });
  const SearchQuery = (e) => {
    setSearchTerm(e);
    setData("search", e);
  };
  const submit = (e) => {
    e.preventDefault();
    get(route("admin.product.search"));
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex items-center mb-4 w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "mx-2 flex flex-col items-start mb-4 w-full", children: [
      /* @__PURE__ */ jsx(
        InputLabel,
        {
          children: true,
          value: "Search Product",
          className: "mr-0 text-xl"
        }
      ),
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "search",
          type: "text",
          value: data.search,
          autoComplete: "text",
          isFocused: true,
          onChange: (e) => SearchQuery(e.target.value),
          className: "border rounded-md p-3 mt-1 block w-[75%] /4",
          placeholder: "Search products..."
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsx(
      PrimaryButton,
      {
        className: "w-[6rem] h-[3rem] text-center hover:bg-transparent hover:border-gray-800 hover:text-gray-800",
        disabled: processing,
        children: "Search"
      }
    )
  ] }) });
}
export {
  AdminSearch as A
};
