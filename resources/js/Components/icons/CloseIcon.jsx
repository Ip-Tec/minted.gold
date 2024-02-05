import React from "react";

function CloseIcon({ width, height, className }) {
    return (
        <>
            <svg
                fill="none"
                width={width || "800px"}
                height={height || "800px"}
                className={className}
                viewBox="-0.5 0 25 25"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M3 21.32L21 3.32001"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M3 3.32001L21 21.32"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );
}

export default CloseIcon;
