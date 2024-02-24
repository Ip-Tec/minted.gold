import React, { useEffect, useRef, useState } from "react";

function Toast() {
    const toastRef = useRef(null); // Optional for animations

    const initialState = {
        active: false,
        message: "",
        type: "success", // Can be 'error', 'warning', or custom types
        autoClose: true, // Optionally set a default auto-close delay
    };

    const [toastState, setToastState] = useState(initialState);

    // Auto-close functionality, adjust delay as needed
    useEffect(() => {
        if (toastState.autoClose && toastState.active) {
            const timeout = setTimeout(() => {
                setToastState({ ...initialState });
            }, 5000);
            return () => clearTimeout(timeout);
        }
    }, [toastState]);

    const handleClose = () => {
        setToastState({ ...initialState });
    };

    const showSuccess = (message = "") => {
        setToastState({
            ...initialState,
            type: "success",
            message,
            active: true,
        });
    };

    const showError = (message = "") => {
        setToastState({
            ...initialState,
            type: "error",
            message,
            active: true,
        });
    };

    const showWarning = (message = "") => {
        setToastState({
            ...initialState,
            type: "warning",
            message,
            active: true,
        });
    };

    // Add other types as needed

    if (!toastState.active) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 z-50 py-4 px-6 rounded-md shadow-md text-white ${
                toastState.type === "success"
                    ? "bg-green-500"
                    : toastState.type === "error"
                    ? "bg-red-500"
                    : toastState.type === "warning"
                    ? "bg-amber-500"
                    : ""
            }`}
        >
            <div className="flex items-center justify-between">
                <p className="font-medium">{toastState.message}</p>
                <button
                    onClick={handleClose}
                    className="ml-3 text-sm font-medium"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default Toast;
