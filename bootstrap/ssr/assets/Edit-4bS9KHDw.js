import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-aF8_DYm9.js";
import DeleteUserForm from "./DeleteUserForm-fTZdUn0W.js";
import UpdatePasswordForm from "./UpdatePasswordForm-DgSdjMVk.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-34gur4TL.js";
import { Head } from "@inertiajs/react";
import "./TextInput-hH_3HmZo.js";
import "react";
import "./CartContext-32pv5l2O.js";
import "./ResponsiveNavLink-IE7aM1lH.js";
import "@headlessui/react";
import "./Cart-S77kG9By.js";
import "./PrimaryButton-tCuq_nFx.js";
import "./CloseIcon-mZkGzQxN.js";
import "./ApplicationLogo-jQ3kBiYq.js";
import "./SecondaryButton-nzLfp8VC.js";
import "./InputError-NzwfGsTp.js";
import "./InputLabel-OxGAYuNE.js";
function Edit({ auth, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
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
  Edit as default
};
