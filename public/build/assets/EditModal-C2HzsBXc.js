import { jsx, jsxs } from "react/jsx-runtime";
import { C as CloseIcon } from "./CloseIcon-mZkGzQxN.js";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
const EditModal = ({ isOpen, onClose, title, content }) => {
  return /* @__PURE__ */ jsx(Transition, { appear: true, show: isOpen, as: Fragment, children: /* @__PURE__ */ jsxs(Dialog, { onClose, children: [
    /* @__PURE__ */ jsx(Dialog.Overlay, { className: "fixed inset-0 bg-black opacity-30 z-10" }),
    /* @__PURE__ */ jsxs("div", { className: "w-auto min-w-[35%] max-w-[50%] z-20 fixed bg-white p-6 border rounded-l-xl top-0 right-0 h-full", children: [
      /* @__PURE__ */ jsx("p", { className: "text-2xl p-2 border-b border-b-black mb-2", children: title }),
      content,
      /* @__PURE__ */ jsx("span", { onClick: onClose, className: "cursor-pointer", children: /* @__PURE__ */ jsx(
        CloseIcon,
        {
          height: "2rem",
          width: "2rem",
          className: "absolute top-8 right-6 fill-rose-800 cursor-pointer hover:scale-125"
        }
      ) })
    ] })
  ] }) });
};
export {
  EditModal as E
};
