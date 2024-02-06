import { jsx } from "react/jsx-runtime";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Minted Gold";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/AdminDashboard.jsx": () => import("./assets/AdminDashboard-rM99fcoV.js"), "./Pages/Admin/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-m51wuOaW.js"), "./Pages/Admin/Auth/Footer.jsx": () => import("./assets/Footer-4Jxomgnh.js"), "./Pages/Admin/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-E_oH7ika.js"), "./Pages/Admin/Auth/Login.jsx": () => import("./assets/Login-MpFgF4Bd.js"), "./Pages/Admin/Auth/Register.jsx": () => import("./assets/Register-3cCzv-sn.js"), "./Pages/Admin/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-Bwc7ce9-.js"), "./Pages/Admin/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-v9u2lDg3.js"), "./Pages/Admin/Categories.jsx": () => import("./assets/Categories-v0v-iFMT.js"), "./Pages/Admin/Orders.jsx": () => import("./assets/Orders-rAGhJmZs.js"), "./Pages/Admin/Products.jsx": () => import("./assets/Products-hJ9-DvrG.js"), "./Pages/Admin/Profile/AdminEdit.jsx": () => import("./assets/AdminEdit-nmv5Dpid.js"), "./Pages/Admin/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-6AjsnjoK.js"), "./Pages/Admin/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-xAuNmJ8g.js"), "./Pages/Admin/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-YS9d3gAK.js"), "./Pages/Admin/Settings.jsx": () => import("./assets/Settings-Gag3mOdb.js"), "./Pages/Admin/WebsiteSetting.jsx": () => import("./assets/WebsiteSetting-cduRbEed.js"), "./Pages/Admin/Welcome.jsx": () => import("./assets/Welcome-EIex8Pce.js"), "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-_XXWDQLE.js"), "./Pages/Auth/Footer.jsx": () => import("./assets/Footer-Rl7mMt6e.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-WDCSjFPE.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-iE9aKvhp.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-AdCvOQ8r.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-hvLF4Kvi.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-TXTXeBQq.js"), "./Pages/Cart/Cart.jsx": () => import("./assets/Cart-0eOmAlo8.js"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-3eiNusfl.js"), "./Pages/Product/Index.jsx": () => import("./assets/Index-FH0aU9EG.js"), "./Pages/Product/Search/[search].jsx": () => import("./assets/_search_-IqV7204g.js"), "./Pages/Product/Show.jsx": () => import("./assets/Show-LwJ2wJAz.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-4bS9KHDw.js"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-fTZdUn0W.js"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-DgSdjMVk.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-34gur4TL.js"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-yN0Xran4.js") })),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(/* @__PURE__ */ jsx(App, { ...props }));
  },
  progress: {
    color: "yellow",
    showSpinner: true
  }
});
