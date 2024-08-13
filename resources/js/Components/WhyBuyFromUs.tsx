import React from "react";

const categories = [
    {
        id: 1,
        name: "Smart Accessories",
        image: "/image/Screenshot.png",
        col: 2,
        row: 1,
    },
    {
        id: 2,
        name: "Power Solutions",
        image: "/image/Screenshot.png",
        col: 2,
        row: 1,
    },
    {
        id: 3,
        name: "Personal Care",
        image: "/image/Screenshot.png",
        col: 1,
        row: 2,
    },
    {
        id: 4,
        name: "Home Appliances",
        image: "/image/Screenshot.png",
        col: 2,
        row: 1,
    },
    // Add more categories as needed
];

const WhyBuyFromUs: React.FC = () => {
    return (
        <div className="p-4 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">
            WHY BUY FROM US
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className={`relative rounded-lg overflow-hidden bg-cover bg-center h-52 col-span-1 row-span-1 sm:col-span-${category.col} sm:row-span-${category.row}`}
                        style={{ backgroundImage: `url(${category.image})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                            <a
                                href="#"
                                className="text-white text-xl font-bold bg-black bg-opacity-50 py-3 px-6 rounded-full hover:bg-opacity-70"
                            >
                                {category.name}
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyBuyFromUs;
