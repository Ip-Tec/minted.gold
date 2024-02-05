import { Link, usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

function Pagination({ products }) {
    // console.log(usePage().props);
    const { url } = usePage();
    const { setPage } = usePage();
    const [loading, setLoading] = useState(false);
    const loadMore = async () => {
        if (loading) return;
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
            const { scrollTop, clientHeight, scrollHeight } =
                document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 10) {
                loadMore();
            }
        }, 200); // Adjust the debounce delay as needed

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [url, setPage]); // Include setPage in the dependency array

    return (
        <div>
            {/* Display loading indicator */}
            {loading && <p className="text-gray-600">Loading...</p>}

            {/* Display pagination links */}
            <div className="flex flex-wrap p-2 justify-center items-center m-2 mt-4">
                {products.links.map((link, index) => (
                    <Link
                        // preserveScroll={true}
                        key={index}
                        href={link.url}
                        className={`px-4 py-2 mx-1 m-2 bg-gray-300 rounded ${
                            link.active
                                ? "bg-gray-500 text-white"
                                : "text-gray-700 hover:bg-gray-400"
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}

export default Pagination;
