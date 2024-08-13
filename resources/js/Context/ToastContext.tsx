// components/ToastContext.tsx

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
} from "react";
import Toast from "@/Components/Toast";

interface ToastContextType {
    addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [toasts, setToasts] = useState<string[]>([]);

    const addToast = useCallback((message: string) => {
        setToasts((prevToasts) => [...prevToasts, message]);
        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.slice(1));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {toasts.map((message, index) => (
                <Toast key={index} message={message} onClose={() => {}} />
            ))}
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
