// FlashMessage.js
import React, { useState, useEffect } from "react";

const FlashMessage = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 5000); // Adjust the timeout as needed (e.g., 5000ms = 5 seconds)

        return () => clearTimeout(timeout);
    }, [onClose]);

    return (
        <>
            {isVisible && (
                <div
                    className={`fixed bottom-4 right-4 p-4 rounded-md ${
                        type === "success" ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                >
                    {message}
                </div>
            )}
        </>
    );
};

export default FlashMessage;
