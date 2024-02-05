// /component/review/ReviewStar.js

import Star from "@/Components/icons/Star";
import StarFill from "@/Components/icons/StarFill";
import StarHalf from "@/Components/icons/StarHalf";

function ReviewStar({ rating }) {
    // Assuming rating is a number between 0 and 5
    const averageRating = rating || 1;

    // Calculate the number of full stars, half stars, and empty stars
    const fullStars = Math.floor(averageRating);
    const hasHalfStar = averageRating % 1 !== 0;

    const renderStars = () => {
        const stars = [];

        // Full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <StarFill
                    key={i}
                    fill="rgb(253, 224, 71)"
                    width="1.3rem"
                    height="1.3rem"
                />
            );
        }

        // Half star
        if (hasHalfStar) {
            stars.push(
                <StarHalf
                    key="half"
                    fill="rgb(253, 224, 71)"
                    width="1rem"
                    height="1rem"
                />
            );
        }

        // Empty stars
        const remainingStars = 5 - Math.ceil(averageRating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <Star
                    key={`empty-${i}`}
                    fill="rgb(253, 224, 71)"
                    width="1rem"
                    height="1rem"
                />
            );
        }

        return stars;
    };

    return (
        <span className="flex justify-start items-center">{renderStars()}</span>
    );
}

export default ReviewStar;
