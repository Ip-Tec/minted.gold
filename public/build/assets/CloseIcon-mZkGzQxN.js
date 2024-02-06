import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import "react";
function CloseIcon({ width, height, className }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
    "svg",
    {
      fill: "none",
      width: width || "800px",
      height: height || "800px",
      className,
      viewBox: "-0.5 0 25 25",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M3 21.32L21 3.32001",
            stroke: "#000000",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M3 3.32001L21 21.32",
            stroke: "#000000",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  ) });
}
export {
  CloseIcon as C
};
