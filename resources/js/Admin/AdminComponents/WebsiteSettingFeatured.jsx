import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";

function WebsiteSettingFeatured({ products }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(
        Array(products.length).fill(false)
    );
    const isEmpty = products.length === 0;

    // Define default title and description for Featured
    const defaultTitle = "Featured";
    const defaultDescription = "Add your featured products here.";

    const { data, setData, post, processing, errors, reset } = useForm({
        title: products[currentIndex]?.title || "",
        description: products[currentIndex]?.description || "",
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const imagePromises = products.map((product, index) => {
            if (!Array.isArray(product.image)) {
                var image = JSON.parse(product.image);
                product.image = image;
            }

            return new Promise((resolve, reject) => {
                const img = new window.Image();
                img.src = `${product?.image?.[0]}`;
                img.onload = () => {
                    setImageLoaded((prev) => {
                        const newLoaded = [...prev];
                        newLoaded[index] = true;
                        return newLoaded;
                    });
                    resolve();
                };
                img.onerror = reject;
            });
        });

        Promise.all(imagePromises).then(() => {
            console.log("All images loaded");
        });
    }, [products, currentIndex]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleNextProduct = () => {
        if (currentIndex < products.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
            reset();
        }
    };

    const handlePrevProduct = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
            reset();
        }
    };

    const handleImageClick = () => {
        document.getElementById("imageInput").click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageDataUrl = reader.result;
                // Set the image preview URL based on the current index
                setImagePreview((prev) => {
                    const newPreview = [prev];
                    newPreview[currentIndex] = imageDataUrl;
                    return newPreview;
                });
                setData("image", file);
            };

            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("image", data.image);

        post(
            route("admin.websiteSetting.updateWebsiteSettingFeatured", {
                product: products[currentIndex].id,
            }),
            formData,
            {
                onSuccess: () => {
                    console.log("Product updated successfully");
                },
                onError: (errors) => {
                    console.error("Error updating product:", errors);
                },
            }
        );
    };

    return (
        <div
            className={`text-gray-900 bg-gray-100 p-px max-h-max relative featured-slide z-40`}
        >
            {isEmpty ? (
                <div className="text-center p-4">
                    <h2 className="text-xl font-semibold">{defaultTitle}</h2>
                    <p>{defaultDescription}</p>
                    <button
                        className="px-10 py-3 mt-4 text-gray-300 rounded-lg bg-blue-600 hover:bg-blue-400 hover:text-white"
                        onClick={() => setCurrentIndex(0)}
                    >
                        Add Product
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <div className="slider-container">
                        {products.map((product, index) => (
                            <div
                                key={product.slug}
                                className={`slide ${
                                    index === currentIndex ? "active" : ""
                                }`}
                                onClick={() => setCurrentIndex(index)}
                            >
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    onClick={handleImageClick}
                                />
                                <div className="product-info">
                                    <h3>{product.title}</h3>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="slider-controls">
                        <button
                            onClick={handlePrevProduct}
                            disabled={currentIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            onClick={handleNextProduct}
                            disabled={currentIndex === products.length - 1}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
            <form className="image-upload-form" onSubmit={submit}>
                <input
                    type="file"
                    id="imageInput"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
                <button className="upload-button px-10 py-3 m-4 text-gray-300 rounded-lg bg-blue-600 hover:bg-blue-400 hover:text-white" onClick={handleImageClick}>
                    Upload Image
                </button>
                <button className="save-button px-10 py-3 m-4 text-gray-300 rounded-lg bg-blue-600 hover:bg-blue-400 hover:text-white" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}

export default WebsiteSettingFeatured;
