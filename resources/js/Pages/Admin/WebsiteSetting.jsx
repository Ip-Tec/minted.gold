import { Link, Head, usePage, router } from "@inertiajs/react";
import AdminAuthenticated from "@/Admin/Layout/AdminAuthenticated";
import WebsiteSettingFeatured from "@/Admin/AdminComponents/WebsiteSettingFeatured";
import ProductDisplay from "@/Components/Product/ProductDisplay";
import React, { useState } from "react"; // Add this line
import { useForm } from "@inertiajs/react";

function AdsForm({ adData }) {
    const [imagePreview, setImagePreview] = useState(adData.image);
    const { data, setData, post, reset } = useForm({
        // Assuming other form fields here
        image: null,
    });

    console.log({adData});

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
        // Append other form fields if needed
        formData.append("image", data.image);

        post(
            // Assuming you have a proper Inertia route for updating the ad
            route("admin.ads.update", { adId: adData.id }),
            formData,
            {
                onSuccess: () => {
                    console.log("Ad updated successfully");
                    // Reset the form and image preview after successful submission
                    reset();
                    setImagePreview(adData.image);
                },
                onError: (errors) => {
                    console.error("Error updating ad:", errors);
                },
            }
        );
    };

    return (
        <form onSubmit={submit}>
            <div className="w-full">
                <h1 className="text-2xl py-3">Ads 1</h1>
                <img
                    src={imagePreview}
                    className="w-full h-[18rem] cursor-pointer"
                    onClick={handleImageClick}
                />
                <input
                    type="file"
                    id="imageInput"
                    className="hidden"
                    onChange={handleImageChange}
                />
            </div>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white">
                Save
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
    console.log(auth);
    console.log();
    // console.log({featured, productDisplay, ComponentAdsOne});
    console.log({ComponentAdsOne});

    const jsonlizy = (data) => {
        return JSON.parse(data);
    };
    
    const submit = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <AdminAuthenticated user={auth.user}>
                <Head title="Website Setting" />
                <h1 className="text-2xl p-3">Website Setting</h1>
                <div className="w-full">
                    <WebsiteSettingFeatured products={featured} />
                    <AdsForm adData={ComponentAdsOne[0]} />
                    <AdsForm adData={ComponentAdsOne[1]} />
                </div>
            </AdminAuthenticated>
        </>
    );
}
