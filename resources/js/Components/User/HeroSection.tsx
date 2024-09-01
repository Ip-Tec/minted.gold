import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
    {
        id: 1,
        title: "Welcome to Oraimo",
        description: "Discover our latest products and amazing offers!",
        image: "/image/Screenshot.png",
        link: "#products",
        buttonText: "Shop Now",
    },
    {
        id: 2,
        title: "Innovative Smart Accessories",
        description: "Experience the best in technology with Oraimo.",
        image: "/image/Screenshot.png",
        link: "#products",
        buttonText: "Explore Now",
    },
    {
        id: 3,
        title: "Unmatched Quality",
        description: "High-quality accessories at unbeatable prices.",
        image: "/image/Screenshot.png",
        link: "#products",
        buttonText: "Discover More",
    },
    {
        id: 4,
        title: "Unmatched Quality",
        description: "High-quality accessories at unbeatable prices.",
        image: "/image/Screenshot.png",
        link: "#products",
        buttonText: "Discover More",
    },
];

const HeroSection: React.FC = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <Slider {...settings}>
                {slides.map((slide) => (
                    <div key={slide.id}>
                        <div
                            className="relative h-screen flex items-center justify-center text-center text-white"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                            <div className="relative z-10 p-6 md:p-12">
                                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-2xl mb-6">
                                    {slide.description}
                                </p>
                                <a
                                    href={slide.link}
                                    className="bg-orange-600 hover:bg-orange-500 text-white py-3 px-6 rounded-full text-lg"
                                >
                                    {slide.buttonText}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default HeroSection;
