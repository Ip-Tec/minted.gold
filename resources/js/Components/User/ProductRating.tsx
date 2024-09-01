import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar as faStarSolid,
    faStarHalfAlt as faStarHalfAltSolid,
} from "@fortawesome/free-solid-svg-icons";

interface ProductRatingProps {
    rating: number;
}

const ProductRating: React.FC<ProductRatingProps> = ({ rating }) => {
    const renderRatingStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <>
                {Array.from({ length: fullStars }, (_, i) => (
                    <FontAwesomeIcon
                        key={`full-${i}`}
                        icon={faStarSolid}
                        className="text-yellow-500"
                    />
                ))}
                {hasHalfStar && (
                    <FontAwesomeIcon
                        key="half"
                        icon={faStarHalfAltSolid}
                        className="text-yellow-500"
                    />
                )}
                {Array.from({ length: emptyStars }, (_, i) => (
                    <FontAwesomeIcon
                        key={`empty-${i}`}
                        icon={faStarSolid}
                        className="text-gray-300"
                    />
                ))}
            </>
        );
    };

    return <>{renderRatingStars(rating)}</>;
};

export default ProductRating;
