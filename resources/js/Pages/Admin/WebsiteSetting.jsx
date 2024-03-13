import { Link, Head, usePage, router } from "@inertiajs/react";
import AdminAuthenticated from "@/Admin/Layout/AdminAuthenticated";
import WebsiteSettingFeatured from "@/Admin/AdminComponents/WebsiteSettingFeatured";
import ProductDisplay from "@/Components/Product/ProductDisplay";
import React, { useState } from "react"; // Add this line
import { useForm } from "@inertiajs/react";
import Footer from "@/Admin/AdminComponents/Footer";

function AdsForm({ adData, adsNumber }) {
    const [imagePreview, setImagePreview] = useState(adData?.image || null);
    const { data, setData, post, reset, progress } = useForm({
        image: null,
    });

    console.log({ adData });

    const handleImageClick = () => {
        const imageInput = document.getElementById(`imageInput${adsNumber}`);
        if (imageInput) {
            imageInput.click();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("id", adsNumber);

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
        formData.append("id", adsNumber);
        console.log({ data });
        console.log(...formData);

        post(route("admin.ads.update", { formData }), formData, {
            onSuccess: () => {
                console.log("Ad updated successfully");
                reset();
                setImagePreview(adData?.image || null);
            },
            onError: (errors) => {
                console.error("Error updating ad:", errors);
            },
        });
    };

    return (
        <form onSubmit={submit}>
            <div className="w-full">
                <h1 className="text-2xl py-3">Ads {adsNumber}</h1>

                {imagePreview ? (
                    <div className="relative">
                        <p className="text-gray-500 m-1 text-sm hover:text-lg bg-black bg-opacity-70 p-1 absolute top-0 sm:text-white z-50">
                            Click on image to change it
                        </p>
                        <img
                            src={imagePreview}
                            className="w-full h-[18rem] cursor-pointer"
                            onClick={() => {
                                handleImageClick();
                                setData("id", adsNumber);
                            }}
                        />
                        <input
                            type="file"
                            id={`imageInput${adsNumber}`}
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                ) : (
                    <div className="relative">
                        <p className="text-gray-500 m-1 text-sm hover:text-lg bg-black bg-opacity-70 p-1 absolute top-0 sm:text-white z-50">
                            Click on image to change it
                        </p>
                        <img
                            src="/logo.jpg"
                            className="w-full h-[20rem] cursor-pointer"
                            onClick={() => {
                                handleImageClick();
                                setData("id", adsNumber);
                            }}
                        />
                        <input
                            type="file"
                            id={`imageInput${adsNumber}`}
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="mt-2 px-10 py-2 rounded-full bg-blue-600 text-white"
                disabled={!!data.image}
            >
                {progress ? "Loading" : "Save Change"}
            </button>
        </form>
    );
}

export default function WebsiteSetting({
    product,
    featured,
    productDisplay,
    ComponentAdsOne,
}) {
    const { auth } = usePage().props;
    // Check if any of the variables are empty
    const isEmpty = !ComponentAdsOne || ComponentAdsOne.length === 0;

    if (ComponentAdsOne.length < 2) {
        ComponentAdsOne = [...ComponentAdsOne, {}];
    }
    return (
        <>
            <AdminAuthenticated user={auth.user}>
                <Head title="Website Setting" />
                <h1 className="text-2xl p-3">Website Setting</h1>
                <div className="w-full">
                    {/* Render WebsiteSettingFeatured only if 'featured' is not empty */}

                    <WebsiteSettingFeatured products={featured} />

                    <>
                        {isEmpty ? (
                            <>
                                <AdsForm
                                    adData={ComponentAdsOne[0]}
                                    adsNumber={1}
                                />
                                <AdsForm
                                    adData={ComponentAdsOne[1]}
                                    adsNumber={2}
                                />
                            </>
                        ) : (
                            ComponentAdsOne.map((ad, index) => (
                                <AdsForm
                                    key={index}
                                    adData={ad}
                                    adsNumber={index + 1}
                                />
                            ))
                        )}
                    </>
                    <Footer />
                </div>
            </AdminAuthenticated>
        </>
    );
}
