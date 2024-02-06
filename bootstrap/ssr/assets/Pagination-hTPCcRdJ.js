import { jsxs, jsx } from "react/jsx-runtime";
import { usePage, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
function Pagination({ products }) {
  const { url } = usePage();
  const { setPage } = usePage();
  const [loading, setLoading] = useState(false);
  const loadMore = async () => {
    if (loading)
      return;
    setLoading(true);
    const nextPage = products.links.find(
      (link) => link.active && link.url !== null
    );
    if (nextPage) {
      await setPage(nextPage.url, { replace: true });
    }
    setLoading(false);
  };
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        loadMore();
      }
    }, 200);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [url, setPage]);
  return /* @__PURE__ */ jsxs("div", { children: [
    loading && /* @__PURE__ */ jsx("p", { className: "text-gray-600", children: "Loading..." }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap p-2 justify-center items-center m-2 mt-4", children: products.links.map((link, index) => /* @__PURE__ */ jsx(
      Link,
      {
        href: link.url,
        className: `px-4 py-2 mx-1 m-2 bg-gray-300 rounded ${link.active ? "bg-gray-500 text-white" : "text-gray-700 hover:bg-gray-400"}`,
        dangerouslySetInnerHTML: { __html: link.label }
      },
      index
    )) })
  ] });
}
export {
  Pagination as P
};
