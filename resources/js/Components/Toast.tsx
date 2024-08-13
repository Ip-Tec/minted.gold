// components/Toast.tsx

import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface ToastProps {
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 12000); // Delay to match the animation duration
        }, 10000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`z-[900] fixed top-4 right-4 bg-orange-600 text-white p-4 ml-2 rounded shadow-lg transition-transform transform ${
                isVisible ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="flex items-center justify-between mr-2">
                <span>{message}</span>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(onClose, 12000); // Delay to match the animation duration
                    }}
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default Toast;
