import { jsxs, jsx } from "react/jsx-runtime";
import { A as AdminAuthenticated } from "./AdminAuthenticated-FcFnLeJs.js";
import DeleteUserForm from "./DeleteUserForm-6AjsnjoK.js";
import UpdatePasswordForm from "./UpdatePasswordForm-xAuNmJ8g.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-YS9d3gAK.js";
import { Head } from "@inertiajs/react";
import "react";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "@headlessui/react";
import "./ApplicationLogo-jQ3kBiYq.js";
import "./SecondaryButton-nzLfp8VC.js";
import "./InputError-NzwfGsTp.js";
import "./InputLabel-OxGAYuNE.js";
import "./TextInput-hH_3HmZo.js";
import "./PrimaryButton-tCuq_nFx.js";
function AdminEdit({ auth, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    AdminAuthenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl text-gray-800 leading-tight", children: "Profile" }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
export {
  AdminEdit as default
};
