import React, { useState } from "react";

interface ProductImage {
    id: number;
    src: string;
}

interface ProductGalleryProps {
    images: ProductImage[];
    mainImage: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({
    images,
    mainImage,
}) => {
    // Create a combined array starting with the mainImage followed by the additional images
    const combinedImages = [
        { id: images.length + 1, src: mainImage },
        ...images,
    ];
    console.log({ combinedImages });
    // Set the initial selected image to the mainImage
    const [selectedImage, setSelectedImage] = useState(mainImage);

    return (
        <div className="flex mt-4">
            <div className="w-1/4">
                <div className="flex flex-col space-y-2 h-96 overflow-y-auto scrollbar-hide">
                    {combinedImages.map((image) => (
                        <img
                            key={image.id}
                            src={image.src}
                            alt="Thumbnail"
                            className="cursor-pointer border rounded-lg h-24"
                            onClick={() => setSelectedImage(image.src)}
                        />
                    ))}
                </div>
            </div>
            <div className="w-3/4">
                <img
                    src={selectedImage}
                    alt="Main Product"
                    className="w-full h-auto rounded-lg"
                />
            </div>
        </div>
    );
};

export default ProductGallery;
