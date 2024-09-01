import React from "react";

const Newsletter: React.FC = () => {
    return (
        <div className="py-12 px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Subscribe to our Newsletter
                </h2>
                <p className="mb-8">
                    Stay updated with the latest news, offers, and exclusive
                    deals.
                </p>
                <form className="flex flex-col md:flex-row justify-center items-center">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full md:w-2/3 p-3 rounded-lg text-black focus:outline-none mb-4 md:mb-0 md:mr-4"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
